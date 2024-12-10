import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { addressPrompt } from "@/commands/smart-contract-set/prompts/address.prompt";
import { deploymentIdPrompt } from "@/commands/smart-contract-set/prompts/deployment-id.prompt";
import { ServiceNotConfiguredError } from "@/error/serviceNotConfiguredError";
import { getHardhatConfigData } from "@/utils/hardhat-config";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import isInCi from "is-in-ci";

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
    .option("--prod", "Connect to your production environment")
    .option("-a, --accept-defaults", "Accept the default and previously set values");

  build.action(async ({ module, reset, verify, deploymentId, prod, acceptDefaults }) => {
    const autoAccept = !!acceptDefaults || isInCi;
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

    const node = await settlemint.blockchainNode.read(env.SETTLEMINT_BLOCKCHAIN_NODE);
    const envConfig = await settlemint.foundry.env(env.SETTLEMINT_BLOCKCHAIN_NODE, env.SETTLEMINT_THEGRAPH);
    await addressPrompt({ env, accept: autoAccept, prod, node });
    const customDeploymentId = deploymentId ?? (await deploymentIdPrompt(env, autoAccept, prod));
    if (verify) {
      const config = await getHardhatConfigData();
      if (!config?.etherscan?.apiKey) {
        throw new Error(
          "It is not possible to verify the deployment on this network unless you supply an Etherscan API key in the hardhat.config.ts file",
        );
      }
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
        ...(customDeploymentId ? ["--deployment-id", customDeploymentId] : []),
        "--network",
        "btp",
        module ?? "ignition/modules/main.ts",
      ].filter(Boolean),
      envConfig,
    );
  });

  return build;
}
