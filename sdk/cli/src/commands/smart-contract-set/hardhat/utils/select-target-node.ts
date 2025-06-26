import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { serviceNotRunningError } from "@/error/service-not-running-error";
import { blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { hasValidPrivateKey } from "@/utils/cluster-service";
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
  let node: BlockchainNode | undefined;
  if (!nodeUniqueName) {
    if (!env.SETTLEMINT_APPLICATION) {
      return missingApplication();
    }
    const nodes = await serviceSpinner("blockchain node", () =>
      settlemint.blockchainNode.list(env.SETTLEMINT_APPLICATION!),
    );
    const validNodes = nodes.filter((node) => validateNode(node, false));

    if (validNodes.length === 0) {
      cancel(
        "No valid blockchain nodes found for deployment. A valid node must be an EVM blockchain node with an activated ECDSA P256 or HSM ECDSA P256 private key, and be running.",
      );
    }

    const blockchainNode = await blockchainNodePrompt({
      env,
      nodes: validNodes,
      accept: autoAccept,
      isRequired: true,
      filterRunningOnly: true,
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
  }

  validateNode(node);

  note(`🔗 Connected to blockchain node '${node.uniqueName}'`);
  return node;
}

function validateNode(node: BlockchainNode, cancelOnError = true) {
  if (!node.isEvm) {
    if (cancelOnError) {
      cancel(
        `The specified blockchain node '${node.uniqueName}' is not an EVM blockchain node. Please specify an EVM blockchain node to continue.`,
      );
    }
    return false;
  }
  if (!hasValidPrivateKey(node)) {
    if (cancelOnError) {
      cancel(
        `The specified blockchain node '${node.uniqueName}' does not have an ECDSA P256 or HSM ECDSA P256 private key activated. Please activate an ECDSA P256 or HSM ECDSA P256 private key on your node and try again.`,
      );
    }
    return false;
  }
  if (node.status !== "COMPLETED") {
    if (cancelOnError) {
      serviceNotRunningError("blockchain node", node.status);
    }
    return false;
  }
  return true;
}
