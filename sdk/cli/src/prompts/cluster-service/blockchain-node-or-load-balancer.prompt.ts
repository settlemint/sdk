import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { BlockchainNode, LoadBalancer } from "@settlemint/sdk-js";

/**
 * Arguments for the blockchain node prompt.
 */
export interface BlockchainNodeOrLoadBalancerPromptArgs extends BaseServicePromptArgs<BlockchainNode | LoadBalancer> {
  nodes: BlockchainNode[];
  loadBalancers: LoadBalancer[];
}

/**
 * Prompts the user to select a blockchain node which requires transactions to be signed before being sent to the node. (has no private key)
 *
 * @param config - Configuration object containing environment, nodes, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.nodes - The available blockchain nodes to choose from
 * @param config.loadBalancers - The available load balancers to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.filterRunningOnly - Whether to only show nodes with status "COMPLETED"
 * @param config.isRequired - Whether selecting a blockchain node or load balancer is required
 * @returns The selected blockchain node or load balancer, or undefined if none is selected
 */
export async function blockchainNodeOrLoadBalancerPrompt({
  env,
  nodes,
  loadBalancers,
  accept,
  singleOptionMessage,
  promptMessage,
  filterRunningOnly = false,
  isRequired = false,
}: BlockchainNodeOrLoadBalancerPromptArgs): Promise<BlockchainNode | LoadBalancer | undefined> {
  return servicePrompt({
    env,
    services: [...nodes, ...loadBalancers],
    accept,
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER",
    isRequired,
    defaultHandler: async ({ defaultService: defaultNode, choices }) => {
      const filteredChoices = filterRunningOnly
        ? choices.filter(({ value: node }) => node === undefined || node?.status === "COMPLETED")
        : choices;
      return select({
        message: promptMessage ?? "Which blockchain node or load balancer do you want to connect to?",
        choices: filteredChoices,
        default: defaultNode,
      });
    },
    singleOptionMessage,
  });
}
