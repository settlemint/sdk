import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { BlockchainNode } from "@settlemint/sdk-js";
import { isRunning } from "../../utils/cluster-service";

/**
 * Arguments for the blockchain node prompt.
 */
export interface BlockchainNodePromptArgs<AllowAll = boolean> extends BaseServicePromptArgs<AllowAll> {
  nodes: BlockchainNode[];
}

/**
 * Prompts the user to select a blockchain node to connect to.
 *
 * @param config - Configuration object containing environment, nodes, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.nodes - The available blockchain nodes to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.filterRunningOnly - Whether to only show nodes with status "COMPLETED"
 * @param config.isRequired - Whether selecting a blockchain node is required
 * @param config.allowAll - Whether to allow all nodes to be selected
 * @returns The selected blockchain node, or undefined if none is selected
 */
export async function blockchainNodePrompt<AllowAll extends boolean = false>({
  env,
  nodes,
  accept,
  singleOptionMessage,
  promptMessage,
  filterRunningOnly = false,
  isRequired = false,
  allowAll = false as AllowAll,
}: BlockchainNodePromptArgs<AllowAll>): Promise<
  AllowAll extends true ? BlockchainNode | BlockchainNode[] | undefined : BlockchainNode | undefined
> {
  return servicePrompt<AllowAll extends true ? BlockchainNode | BlockchainNode[] : BlockchainNode>({
    env,
    services: nodes,
    accept,
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
    isRequired,
    defaultHandler: async ({ defaultService: defaultNode, choices }) => {
      const filteredChoices: typeof choices = filterRunningOnly
        ? choices
            .filter(({ value: node }) => {
              return Array.isArray(node) ? true : isRunning(node);
            })
            .map((item) => {
              if (Array.isArray(item.value)) {
                return {
                  ...item,
                  value: item.value.filter(isRunning),
                } as (typeof choices)[0];
              }
              return item;
            })
        : choices;
      return select({
        message: promptMessage ?? "Which blockchain node do you want to connect to?",
        choices: filteredChoices,
        default: defaultNode,
      });
    },
    singleOptionMessage,
    allowAll,
  });
}
