import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { BlockchainNode, LoadBalancer } from "@settlemint/sdk-js";

/**
 * Arguments for the blockchain node prompt.
 */
export interface NodeNoSigningPromptArgs extends BaseServicePromptArgs<BlockchainNode> {
  nodes: BlockchainNode[];
  loadBalancers: LoadBalancer[];
}

/**
 * Prompts the user to select a blockchain node which requires transactions to be signed before being sent to the node. (has no private key)
 *
 * @param config - Configuration object containing environment, nodes, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.nodes - The available blockchain nodes to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.filterRunningOnly - Whether to only show nodes with status "COMPLETED"
 * @param config.isRequired - Whether selecting a blockchain node is required
 * @returns The selected blockchain node, or undefined if none is selected
 */
export async function nodeNoSigningPrompt({
  env,
  nodes,
  accept,
  singleOptionMessage,
  promptMessage,
  filterRunningOnly = false,
  isRequired = false,
}: NodeNoSigningPromptArgs): Promise<BlockchainNode | undefined> {
  return servicePrompt({
    env,
    services: nodes,
    accept,
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
    isRequired,
    defaultHandler: async ({ defaultService: defaultNode, choices }) => {
      const nodesWithNoSigning = choices.filter(
        ({ value: node }) => !Array.isArray(node?.privateKeys) || node?.privateKeys?.length === 0,
      );
      const filteredChoices = filterRunningOnly
        ? nodesWithNoSigning.filter(({ value: node }) => node === undefined || node?.status === "COMPLETED")
        : nodesWithNoSigning;
      return select({
        message:
          promptMessage ??
          "Which blockchain node do you want to READ/WRITE from/to? Transactions should be signed before sending to this node",
        choices: filteredChoices,
        default: defaultNode,
      });
    },
    singleOptionMessage,
  });
}
