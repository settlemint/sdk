import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { BlockchainNode } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a blockchain node to connect to.
 *
 * @param config - Configuration object containing environment, nodes, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.nodes - The available blockchain nodes to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.filterRunningOnly - Whether to only show nodes with status "COMPLETED"
 * @param config.isRequired - Whether selecting a blockchain node is required
 * @returns The selected blockchain node, or undefined if none is selected
 */
export async function blockchainNodePrompt({
  env,
  nodes,
  accept,
  filterRunningOnly = false,
  isRequired = false,
}: {
  env: Partial<DotEnv>;
  nodes: BlockchainNode[];
  accept: boolean | undefined;
  filterRunningOnly?: boolean;
  isRequired?: boolean;
}): Promise<BlockchainNode | undefined> {
  return servicePrompt({
    env,
    services: nodes,
    accept,
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
    isRequired,
    defaultHandler: async ({ defaultService: defaultNode, choices }) => {
      const filteredChoices = filterRunningOnly
        ? choices.filter(({ value: node }) => node === undefined || node?.status === "COMPLETED")
        : choices;
      return select({
        message: "Which blockchain node do you want to connect to?",
        choices: filteredChoices,
        default: defaultNode,
      });
    },
  });
}
