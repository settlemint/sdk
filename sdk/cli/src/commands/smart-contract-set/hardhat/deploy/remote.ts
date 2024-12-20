import { blockchainNodePrompt } from "@/commands/connect/blockchain-node.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { addressPrompt } from "@/commands/smart-contract-set/prompts/address.prompt";
import { missingAccessTokenError } from "@/error/missing-config-error";
import { getHardhatConfigData } from "@/utils/hardhat-config";
import { Command } from "@commander-js/extra-typings";
import { type BlockchainNode, createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import { cancel } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";

export function hardhatDeployRemoteCommand() {
  const cmd = new Command("remote")
    .description("Deploy the smart contracts using Hardhat/ignition to the remote network on the platform")
    .option(
      "-m, --module <ignitionmodule>",
      'The module to deploy with Ignition, defaults to "ignition/modules/main.ts"',
    )
    .option("--deployment-id <deploymentId>", "Set the id of the deployment")
    .option("-r, --reset", "Wipes the existing deployment state before deploying")
    .option("-v, --verify", "Verify the deployment on Etherscan")
    .option("--default-sender <defaultSender>", "Set the default sender for the deployment")
    .option("--parameters <parameters>", "A relative path to a JSON file to use for the module parameters")
    .option("--strategy <strategy>", `Set the deployment strategy to use (default: "basic")`)
    .option(
      "--blockchain-node-id <blockchainNodeId>",
      "Blockchain Node ID (optional, defaults to the blockchain node in the environment)",
    )
    .option("--prod", "Connect to your production environment")
    .option("-a, --accept-defaults", "Accept the default and previously set values");

  cmd.action(
    async ({
      module,
      reset,
      verify,
      deploymentId,
      defaultSender,
      parameters,
      strategy,
      prod,
      acceptDefaults,
      blockchainNodeId,
    }) => {
      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
      if (!accessToken) {
        return missingAccessTokenError();
      }

      const instance = await instancePrompt(env, true);
      const settlemint = createSettleMintClient({
        accessToken,
        instance,
      });

      let node: BlockchainNode | undefined = undefined;
      if (!blockchainNodeId) {
        const blockchainNodes = await settlemint.blockchainNode.list(env.SETTLEMINT_APPLICATION!);
        if (blockchainNodes.length === 0) {
          cancel("No blockchain nodes found. Please create a blockchain node and try again.");
        }

        const nodesWithPrivateKey = await Promise.all(
          blockchainNodes.map((node) => settlemint.blockchainNode.read(node.id)),
        );
        const nodesWithActivePrivateKey = nodesWithPrivateKey.filter(
          (node) => node.privateKeys && node.privateKeys.length > 0,
        );
        if (nodesWithActivePrivateKey.length === 0) {
          cancel(
            "No blockchain nodes with private keys found. Please activate a private key on your blockchain node and try again.",
          );
        }

        const blockchainNode = await blockchainNodePrompt(env, nodesWithActivePrivateKey, autoAccept);
        if (!blockchainNode) {
          cancel("No Blockchain Node selected. Please select one to continue.");
        }
        node = blockchainNode;
      } else {
        node = await settlemint.blockchainNode.read(blockchainNodeId);
      }

      const envConfig = await settlemint.foundry.env(node.id);
      const hardhatConfig = await getHardhatConfigData(envConfig);
      if (verify && !hardhatConfig?.etherscan?.apiKey) {
        cancel(
          "It is not possible to verify the deployment on this network unless you supply an Etherscan API key in the hardhat.config.ts file",
        );
      }

      const address = await addressPrompt({ env, accept: autoAccept, prod, node, hardhatConfig });
      if (!address) {
        cancel("No private key selected. Please select one to continue.");
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
          ...(defaultSender ? ["--default-sender", defaultSender] : []),
          ...(parameters ? ["--parameters", parameters] : []),
          ...(strategy ? ["--strategy", strategy] : []),
          "--network",
          "btp",
          module ?? "ignition/modules/main.ts",
        ].filter(Boolean),
        { env: envConfig },
      );
    },
  );

  return cmd;
}
