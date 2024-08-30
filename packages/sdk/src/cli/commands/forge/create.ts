import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { printAsciiArt, printCancel, printIntro, printOutro, printSpinner, promptSelect } from "@/cli/lib/cli-message";
import { readSettlemintConfig } from "@/cli/lib/config/read-config";
import { runCli } from "@/cli/lib/run-cli";
import { activeServerConfig } from "@/next/node/config/config";
import { Command } from "@commander-js/extra-typings";

export function forgeCreateCommand() {
  const deploy = new Command("create")
    .description("Deploy a smart contract")
    .argument("<CONTRACT>", "The contract identifier in the form `<path>:<contractname>`")
    .option("--constructor-args <ARGS...>", "The constructor arguments")
    .option("--constructor-args-path <PATH>", "The path to a file containing the constructor arguments")
    .option("--verify", "Verify contract after creation")
    .option("--timeout <TIMEOUT>", "Timeout to use for broadcasting transactions")
    .option("--names", "Print compiled contract names")
    .option("--sizes", "Print compiled contract sizes")
    .option("--no-cache", "Disable the cache")
    .option("--force", "Clear the cache and artifacts folder and recompile")
    .option("--libraries <LIBRARIES>", "Set pre-linked libraries")
    .option("--ignored-error-codes <ERROR_CODES>", "Ignore solc warnings by error code")
    .option("--deny-warnings", "Warnings will trigger a compiler error")
    .option("--no-auto-detect", "Do not auto-detect the `solc` version")
    .option("--use <SOLC_VERSION>", "Specify the solc version to build with")
    .option("--offline", "Do not access the network")
    .option("--via-ir", "Use the Yul intermediate representation compilation pipeline")
    .option("--no-metadata", "Do not append any metadata to the bytecode")
    .option("--silent", "Don't print anything on startup")
    .option("--optimize", "Activate the Solidity optimizer")
    .option("--optimizer-runs <RUNS>", "The number of optimizer runs")
    .option("-o, --out <PATH>", "The path to the contract artifacts folder")
    .option("--build-info", "Generate build info files")
    .option("--build-info-path <PATH>", "Output path to directory for build info files")
    .option("-w, --watch [<PATH>...]", "Watch for changes and rebuild")
    .option("--gas-limit <GAS_LIMIT>", "Gas limit for the transaction")
    .option("--gas-price <PRICE>", "Gas price for legacy transactions, or max fee per gas for EIP1559 transactions")
    .option("--priority-gas-price <PRICE>", "Max priority fee per gas for EIP1559 transactions")
    .option("--value <VALUE>", "Ether to send in the transaction")
    .option("--nonce <NONCE>", "Nonce for the transaction")
    .option("--legacy", "Send a legacy transaction instead of an EIP1559 transaction")
    .option("--blob", "Send a EIP-4844 blob transaction")
    .option("--blob-gas-price <BLOB_PRICE>", "Gas price for EIP-4844 blob transaction")
    .option("--auth <AUTH>", "EIP-7702 authorization list")
    .option("--unlocked", "Send via `eth_sendTransaction` using the `--from` argument or `$ETH_FROM` as sender")
    .option("-r, --rpc-url <URL>", "The RPC endpoint")
    .option("-e, --etherscan-api-key <KEY>", "The Etherscan (or equivalent) API key")
    .option("-c, --chain <CHAIN>", "The chain name or EIP-155 chain ID")
    .option("-f, --from <ADDRESS>", "The sender account")
    .option("-i, --interactive", "Open an interactive prompt to enter your private key")
    .option("--private-key <RAW_PRIVATE_KEY>", "Use the provided private key")
    .option("--mnemonic <MNEMONIC>", "Use the mnemonic phrase of mnemonic file at the specified path")
    .option("--mnemonic-passphrase <PASSPHRASE>", "Use a BIP39 passphrase for the mnemonic")
    .option("--mnemonic-derivation-path <PATH>", "The wallet derivation path")
    .option("--mnemonic-index <INDEX>", "Use the private key from the given mnemonic index")
    .option("--retries <RETRIES>", "Number of attempts for retrying verification", "5")
    .option("--delay <DELAY>", "Optional delay to apply inbetween verification attempts, in seconds", "5")
    .option("--keystore <PATH>", "Use the keystore in the given folder or file")
    .option(
      "--account <ACCOUNT_NAME>",
      "Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename",
    )
    .option("--password <PASSWORD>", "The keystore password")
    .option("--password-file <PASSWORD_FILE>", "The keystore password file path")
    .option("-l, --ledger", "Use a Ledger hardware wallet")
    .option("-t, --trezor", "Use a Trezor hardware wallet")
    .option("--aws", "Use AWS Key Management Service")
    .option("--verifier <VERIFIER>", "The contract verification provider to use", "etherscan")
    .option("--verifier-url <VERIFIER_URL>", "The verifier URL, if using a custom provider")
    .option(
      "-a, --application <id>",
      "The name of the environment to use (SETTLEMINT_APPLICATION environment variable)",
    );

  deploy.action(async (contract, options) => {
    printAsciiArt();
    printIntro("Deploying the smart contract");

    const config = readSettlemintConfig(true);
    if (!config) {
      printCancel("No .settlemintrc.json file found");
      process.exit(1);
    }
    const app = activeServerConfig(config);

    const nodeUrl = app.nodeJsonRpcDeploy;
    if (!nodeUrl) {
      printCancel("No deployment node URL found");
      process.exit(1);
    }

    if (!options.rpcUrl) {
      options.rpcUrl = `${nodeUrl}/${process.env.SETTLEMINT_PAT_TOKEN}/`;
    }

    let signer: string | undefined;

    if (!options.privateKey && !options.mnemonic && !options.from) {
      const signers = await printSpinner({
        startMessage: "Fetching enabled signers",
        task: async () => {
          const accountsOutput = await runCli({
            command: "cast",
            commandOptions: ["rpc", "eth_accounts", "--rpc-url", options.rpcUrl!],
            logFileName: "cast_accounts.log",
          });
          return JSON.parse(accountsOutput);
        },
        stopMessage: "Signers fetched successfully",
      });

      signer = await promptSelect<string>({
        message: "Select an account to use for deployment:",
        choices: signers.map((account: string, index: number) => ({
          value: account,
          label: `[${index}] ${account}`,
        })),
      });

      if (!signer) {
        printCancel("No account selected for deployment");
        process.exit(1);
      }
    }

    // Extract the contract name from the contract argument
    const contractName = contract.split(":").pop();
    if (!contractName) {
      throw new Error("Invalid contract identifier");
    }

    const notes = await printSpinner({
      startMessage: `Running forge deploy for ${contractName}`,
      task: async () => {
        if (signer) {
          options.from = signer;
          options.unlocked = true;
        }

        const argsFilePath = join(process.cwd(), "deployments", `${contractName}.args.txt`);
        if (!options.constructorArgsPath && existsSync(argsFilePath)) {
          options.constructorArgsPath = argsFilePath;
        }

        const deployOptions = [
          "create",
          contract,
          ...(options.verify ? ["--verify"] : []),
          ...(options.unlocked ? ["--unlocked"] : []),
          ...(options.timeout ? ["--timeout", options.timeout] : []),
          ...(options.names ? ["--names"] : []),
          ...(options.sizes ? ["--sizes"] : []),
          ...(!options.cache ? ["--no-cache"] : []),
          ...(options.force ? ["--force"] : []),
          ...(options.libraries ? ["--libraries", options.libraries] : []),
          ...(options.ignoredErrorCodes ? ["--ignored-error-codes", options.ignoredErrorCodes] : []),
          ...(options.denyWarnings ? ["--deny-warnings"] : []),
          ...(!options.autoDetect ? ["--no-auto-detect"] : []),
          ...(options.use ? ["--use", options.use] : []),
          ...(options.offline ? ["--offline"] : []),
          ...(options.viaIr ? ["--via-ir"] : []),
          ...(!options.metadata ? ["--no-metadata"] : []),
          ...(options.silent ? ["--silent"] : []),
          ...(options.optimize ? ["--optimize"] : []),
          ...(options.optimizerRuns ? ["--optimizer-runs", options.optimizerRuns] : []),
          ...(options.out ? ["-o", options.out] : []),
          ...(options.buildInfo ? ["--build-info"] : []),
          ...(options.buildInfoPath ? ["--build-info-path", options.buildInfoPath] : []),
          ...(options.watch ? ["-w", ...(Array.isArray(options.watch) ? options.watch : [])] : []),
          ...(options.gasLimit ? ["--gas-limit", options.gasLimit] : []),
          ...(options.gasPrice ? ["--gas-price", options.gasPrice] : []),
          ...(options.priorityGasPrice ? ["--priority-gas-price", options.priorityGasPrice] : []),
          ...(options.value ? ["--value", options.value] : []),
          ...(options.nonce ? ["--nonce", options.nonce] : []),
          ...(options.legacy ? ["--legacy"] : []),
          ...(options.blob ? ["--blob"] : []),
          ...(options.blobGasPrice ? ["--blob-gas-price", options.blobGasPrice] : []),
          ...(options.auth ? ["--auth", options.auth] : []),
          ...(options.rpcUrl ? ["-r", options.rpcUrl] : []),
          ...(options.etherscanApiKey ? ["-e", options.etherscanApiKey] : []),
          ...(options.chain ? ["-c", options.chain] : []),
          ...(options.from ? ["-f", options.from] : []),
          ...(options.interactive ? ["--interactive"] : []),
          ...(options.privateKey ? ["--private-key", options.privateKey] : []),
          ...(options.mnemonic ? ["--mnemonic", options.mnemonic] : []),
          ...(options.mnemonicPassphrase ? ["--mnemonic-passphrase", options.mnemonicPassphrase] : []),
          ...(options.mnemonicDerivationPath ? ["--mnemonic-derivation-path", options.mnemonicDerivationPath] : []),
          ...(options.mnemonicIndex ? ["--mnemonic-index", options.mnemonicIndex] : []),
          ...(options.retries ? ["--retries", options.retries] : []),
          ...(options.delay ? ["--delay", options.delay] : []),
          ...(options.keystore ? ["--keystore", options.keystore] : []),
          ...(options.account ? ["--account", options.account] : []),
          ...(options.password ? ["--password", options.password] : []),
          ...(options.passwordFile ? ["--password-file", options.passwordFile] : []),
          ...(options.ledger ? ["--ledger"] : []),
          ...(options.trezor ? ["--trezor"] : []),
          ...(options.aws ? ["--aws"] : []),
          ...(options.verifier ? ["--verifier", options.verifier] : []),
          ...(options.verifierUrl ? ["--verifier-url", options.verifierUrl] : []),
          "--json",
          ...(options.constructorArgsPath ? ["--constructor-args-path", options.constructorArgsPath] : []),
          ...(options.constructorArgs ? ["--constructor-args", ...options.constructorArgs] : []),
        ];

        const result = await runCli({
          command: "forge",
          commandOptions: deployOptions,
          logFileName: "forge.log",
        });

        // Parse the result and extract contract name
        const deploymentResult = JSON.parse(result);

        // Prepare the deployment data
        const deploymentData = {
          ...deploymentResult,
          timestamp: Date.now(),
        };

        // Define the path for the deployments directory and file
        const deploymentsDir = join(process.cwd(), "deployments");
        const deploymentFilePath = join(deploymentsDir, `${contractName}.deployments.json`);

        // Ensure the deployments directory exists
        if (!existsSync(deploymentsDir)) {
          mkdirSync(deploymentsDir, { recursive: true });
        }

        // Read existing deployments or initialize an empty array
        let deployments = [];
        if (existsSync(deploymentFilePath)) {
          const fileContent = readFileSync(deploymentFilePath, "utf8");
          deployments = JSON.parse(fileContent);
        }

        // Add the new deployment data
        deployments.push(deploymentData);

        // Write the updated deployments back to the file
        writeFileSync(deploymentFilePath, JSON.stringify(deployments, null, 2));

        return `Deployed to ${contractName} to ${deploymentData.deployedTo}`;
      },
      stopMessage: `${contractName} deployed successfully`,
    });
    printOutro(notes);
  });

  return deploy;
}
