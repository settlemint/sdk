import { printAsciiArt, printCancel, printIntro, printOutro, printSpinner } from "@/cli/lib/cli-message";
import { readSettlemintConfig } from "@/cli/lib/config/read-config";
import { runHardhat } from "@/cli/lib/hardhat";
import { Command } from "@commander-js/extra-typings";

export function hardhatDeployCommand() {
  const build = new Command("remote")
    .description("Deploy the smart contracts using Hardhat/ignition to the remote network on the platform")
    .option(
      "-m, --module <ignitionmodule>",
      'The module to deploy with Ignition. (default: "ignition/modules/main.ts")',
    )
    .option("--default-sender <address>", "Set the default sender for the deployment")
    .option("--deployment-id <id>", "Set the id of the deployment")
    .option("--parameters <path>", "A relative path to a JSON file to use for the module parameters")
    .option("--reset", "Wipes the existing deployment state before deploying")
    .option("--strategy <strategy>", 'Set the deployment strategy to use (default: "basic")')
    .option("--verify", "Verify the deployment on Etherscan")
    .option("--network <name>", "The network to connect to (default: settlemint)")
    .option("--verbose", "Enables Hardhat verbose logging")
    .option(
      "-a, --application <id>",
      "The name of the environment to use (SETTLEMINT_APPLICATION environment variable)",
    );

  build.action(
    async ({
      module,
      application,
      defaultSender,
      deploymentId,
      parameters,
      reset,
      strategy,
      verify,
      network,
      verbose,
    }) => {
      printAsciiArt();
      printIntro("Deploying the smart contracts");

      const config = readSettlemintConfig(true);
      if (!config) {
        printCancel("No .settlemintrc.json file found");
        process.exit(1);
      }

      const appId = process.env.SETTLEMINT_APPLICATION ?? application ?? config.defaultApplication?.id;
      const app = config.applications?.[appId];
      if (!app) {
        printCancel("No application found");
        process.exit(1);
      }

      const nodeUrl = app.nodeJsonRpcDeploy;
      if (!nodeUrl) {
        printCancel("No deployment node URL found");
        process.exit(1);
      }

      process.env.SETTLEMINT_NODE_JSON_RPC_URL = nodeUrl;
      process.env.HARDHAT_IGNITION_CONFIRM_DEPLOYMENT = "false";
      process.env.HARDHAT_IGNITION_CONFIRM_RESET = "false";

      await printSpinner({
        startMessage: "Running hardhat deploy",
        task: async () => {
          const options = [
            "ignition",
            "deploy",
            ...(reset ? ["--reset"] : []),
            ...(defaultSender ? ["--default-sender", defaultSender] : []),
            ...(deploymentId ? ["--deployment-id", deploymentId] : []),
            ...(parameters ? ["--parameters", parameters] : []),
            ...(strategy ? ["--strategy", strategy] : []),
            ...(verify ? ["--verify"] : []),
            "--network",
            network || "settlemint",
            ...(verbose ? ["--verbose"] : []),
            module || "ignition/modules/main.ts",
          ];

          await runHardhat(options.join(" "));
        },
        stopMessage: "Smart contracts deployed",
      });

      printOutro("Smart contracts deployed");
    },
  );

  return build;
}
