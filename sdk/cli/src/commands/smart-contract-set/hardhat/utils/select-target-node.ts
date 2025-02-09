import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { serviceNotRunningError } from "@/error/service-not-running-error";
import { blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import type { BlockchainNode, SettlemintClient } from "@settlemint/sdk-js";
import { cancel, note } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function selectTargetNode({
  env,
  blockchainNodeUniqueName,
  autoAccept,
  settlemint,
}: {
  env: Partial<DotEnv>;
  blockchainNodeUniqueName?: string;
  autoAccept: boolean;
  settlemint: SettlemintClient;
}): Promise<BlockchainNode> {
  const nodeUniqueName = blockchainNodeUniqueName ?? (autoAccept ? env.SETTLEMINT_BLOCKCHAIN_NODE : undefined);
  let node: BlockchainNode | undefined = undefined;
  if (!nodeUniqueName) {
    if (!env.SETTLEMINT_APPLICATION) {
      return missingApplication();
    }
    const nodes = await serviceSpinner("blockchain node", () =>
      settlemint.blockchainNode.list(env.SETTLEMINT_APPLICATION!),
    );
    const evmNodes = nodes.filter((node) => node.isEvm);
    if (evmNodes.length === 0) {
      cancel("No EVM blockchain nodes found. Please create an EVM blockchain node and try again.");
    }

    const nodesWithPrivateKey = await Promise.all(nodes.map((node) => settlemint.blockchainNode.read(node.uniqueName)));
    const nodesWithActivePrivateKey = nodesWithPrivateKey.filter(
      (node) => node.privateKeys && node.privateKeys.length > 0,
    );
    if (nodesWithActivePrivateKey.length === 0) {
      cancel(
        "No EVM blockchain nodes with private keys found. Please activate a private key on your EVM blockchain node and try again.",
      );
    }

    const blockchainNode = await blockchainNodePrompt({
      env,
      nodes: nodesWithActivePrivateKey,
      accept: autoAccept,
      isRequired: true,
      promptMessage:
        "Which blockchain node do you want to connect to? (Only nodes with private keys activated are shown)",
      singleOptionMessage: (node) =>
        `Using '${node}' - the only node with active private keys. To use a different node, ensure it has a private key activated.`,
    });
    if (!blockchainNode) {
      return nothingSelectedError("EVM blockchain node");
    }
    node = blockchainNode;
  } else {
    node = await settlemint.blockchainNode.read(nodeUniqueName);
    if (!node.isEvm) {
      cancel(
        `The specified blockchain node '${nodeUniqueName}' is not an EVM blockchain node. Please specify an EVM blockchain node to continue.`,
      );
    }
  }

  if (node.status !== "COMPLETED") {
    serviceNotRunningError("blockchain node", node.status);
  }

  note(`🔗 Connected to blockchain node '${node.uniqueName}'`);
  return node;
}
