import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { ServiceNotConfiguredError } from "@/error/serviceNotConfiguredError";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";

export function hardhatDeployRemoteCommand() {
  const build = new Command("remote")
    .description("Deploy the smart contracts using Hardhat/ignition to the remote network on the platform")
    .option(
      "-m, --module <ignitionmodule>",
      'The module to deploy with Ignition, defaults to "ignition/modules/main.ts"',
    )
    .option("--deployment-id <deploymentId>", "Set a custom deployment id")
    .option("-r, --reset", "Reset the deployment")
    .option("--verify", "Verify the deployment")
    .option("--prod", "Connect to your production environment");

  build.action(async ({ module, reset, verify, deploymentId, prod }) => {
    const env = await loadEnv(false, !!prod);

    const accessToken = await accessTokenPrompt(env, true);
    const instance = await instancePrompt(env, true);

    if (!env.SETTLEMINT_BLOCKCHAIN_NODE) {
      throw new ServiceNotConfiguredError("Blockchain node");
    }

    const settlemint = createSettleMintClient({
      accessToken,
      instance,
    });

    const envConfig = await settlemint.foundry.env(env.SETTLEMINT_BLOCKCHAIN_NODE, env.SETTLEMINT_THEGRAPH);
    const address = envConfig.BTP_FROM;
    if (!address) {
      throw new Error("No private key is activated on the node to sign the transaction.");
    }

    if (verify && !(envConfig.ETHERSCAN_API_KEY || env.ETHERSCAN_API_KEY)) {
      throw new Error(
        "It is not possible to verify the deployment on this network unless you supply an Etherscan API key using the ETHERSCAN_API_KEY environment variable",
      );
    }
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(
      command,
      [
        ...args,
        "hardhat",
        "ignition",
        "deploy",
        ...(reset ? ["--reset"] : []),
        ...(verify ? ["--verify"] : []),
        ...(deploymentId ? ["--deployment-id", deploymentId] : []),
        "--network",
        "btp",
        module ?? "ignition/modules/main.ts",
      ].filter(Boolean),
      envConfig,
    );
  });

  return build;
}
