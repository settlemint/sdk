import { blockchainNodePrompt } from "@/commands/connect/blockchain-node.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import { cancel } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";

export function hardhatScriptRemoteCommand() {
  const cmd = new Command("remote")
    .description("Run a Hardhat script to deploy a contract on the platform or interact with a deployed contract.")
    .requiredOption("-s, --script <script>", 'The script to run with Hardhat , e.g. "scripts/deploy.ts"')
    .option(
      "--blockchain-node <blockchainNode>",
      "Blockchain Node unique name (optional, defaults to the blockchain node in the environment)",
    )
    .option("--prod", "Connect to your production environment")
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--no-compile", "Don't compile before running this task");

  cmd.action(async ({ script, prod, blockchainNode: blockchainNodeUniqueName, acceptDefaults, compile }) => {
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

    let nodeUniqueName = blockchainNodeUniqueName ?? (autoAccept ? env.SETTLEMINT_BLOCKCHAIN_NODE : undefined);
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
      nodeUniqueName = blockchainNode.uniqueName;
    } else {
      const node = await settlemint.blockchainNode.read(nodeUniqueName);
      if (!node.isEvm) {
        cancel(
          "The specified blockchain node is not an EVM blockchain node. Please specify an EVM blockchain node to continue.",
        );
      }
    }

    const envConfig = await settlemint.foundry.env(nodeUniqueName);
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(
      command,
      [...args, "hardhat", "run", script, "--network", "btp", ...(compile ? ["--no-compile"] : [])],
      { env: envConfig },
    );
  });

  return cmd;
}
