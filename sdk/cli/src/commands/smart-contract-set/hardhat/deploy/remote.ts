import { blockchainNodePrompt } from "@/commands/connect/blockchain-node.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { createExamples } from "@/commands/platform/utils/create-examples";
import { addressPrompt } from "@/commands/smart-contract-set/prompts/address.prompt";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getHardhatConfigData } from "@/utils/hardhat-config";
import { Command } from "@commander-js/extra-typings";
import { type BlockchainNode, createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import { cancel } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";

export function hardhatDeployRemoteCommand() {
  const cmd = new Command("remote")
    .description("Deploy the smart contracts using Hardhat/ignition to the remote network on the platform")
    .usage(
      createExamples([
        {
          description: "Deploy smart contracts to remote network using Hardhat/Ignition",
          command: "scs hardhat deploy remote",
        },
        {
          description: "Deploy a specific Ignition module to remote network",
          command: "scs hardhat deploy remote --module ignition/modules/custom.ts",
        },
        {
          description: "Deploy with a clean deployment state to remote network",
          command: "scs hardhat deploy remote --reset",
        },
        {
          description: "Deploy and verify contracts on remote network",
          command: "scs hardhat deploy remote --verify",
        },
        {
          description: "Deploy to remote network with specific blockchain node",
          command: "scs hardhat deploy remote --blockchain-node my-node",
        },
        {
          description: "Deploy to production environment",
          command: "scs hardhat deploy remote --prod",
        },
      ]),
    )
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
      "--blockchain-node <blockchainNode>",
      "Blockchain Node unique name (optional, defaults to the blockchain node in the environment)",
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
      blockchainNode: blockchainNodeUniqueName,
    }) => {
      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const instance = await instancePrompt(env, true);
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance,
        prefer: "application",
      });

      const settlemint = createSettleMintClient({
        accessToken,
        instance,
      });

      const nodeUniqueName = blockchainNodeUniqueName ?? (autoAccept ? env.SETTLEMINT_BLOCKCHAIN_NODE : undefined);
      let node: BlockchainNode | undefined = undefined;
      if (!nodeUniqueName) {
        if (!env.SETTLEMINT_APPLICATION) {
          return missingApplication();
        }
        const nodes = await settlemint.blockchainNode.list(env.SETTLEMINT_APPLICATION);
        const evmNodes = nodes.filter((node) => node.isEvm);
        if (evmNodes.length === 0) {
          cancel("No EVM blockchain nodes found. Please create an EVM blockchain node and try again.");
        }

        const nodesWithPrivateKey = await Promise.all(
          nodes.map((node) => settlemint.blockchainNode.read(node.uniqueName)),
        );
        const nodesWithActivePrivateKey = nodesWithPrivateKey.filter(
          (node) => node.privateKeys && node.privateKeys.length > 0,
        );
        if (nodesWithActivePrivateKey.length === 0) {
          cancel(
            "No EVM blockchain nodes with private keys found. Please activate a private key on your EVM blockchain node and try again.",
          );
        }

        const blockchainNode = await blockchainNodePrompt(env, nodesWithActivePrivateKey, acceptDefaults);
        if (!blockchainNode) {
          return nothingSelectedError("EVM blockchain node");
        }
        node = blockchainNode;
      } else {
        node = await settlemint.blockchainNode.read(nodeUniqueName);
        if (!node.isEvm) {
          cancel(
            "The specified blockchain node is not an EVM blockchain node. Please specify an EVM blockchain node to continue.",
          );
        }
      }

      const envConfig = await settlemint.foundry.env(node.uniqueName);
      const hardhatConfig = await getHardhatConfigData(envConfig);
      if (verify && !hardhatConfig?.etherscan?.apiKey) {
        cancel(
          "It is not possible to verify the deployment on this network unless you supply an Etherscan API key in the hardhat.config.ts file",
        );
      }

      const address = await addressPrompt({ env, accept: autoAccept, prod, node, hardhatConfig });
      if (!address) {
        return nothingSelectedError("private key");
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
