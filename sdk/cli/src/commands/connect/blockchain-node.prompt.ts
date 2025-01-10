import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { BlockchainNode } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a blockchain node to connect to.
 *
 * @param env - The environment variables containing the current configuration
 * @param nodes - The available blockchain nodes to choose from
 * @param accept - Whether to automatically accept default values without prompting
 * @param filterRunningOnly - Whether to only show running nodes
 * @returns The selected blockchain node, or undefined if no nodes are available or none is selected
 */
export async function blockchainNodePrompt(
  env: Partial<DotEnv>,
  nodes: BlockchainNode[],
  accept: boolean | undefined,
  filterRunningOnly = false,
): Promise<BlockchainNode | undefined> {
  const choices = filterRunningOnly ? nodes.filter((node) => node.status === "COMPLETED") : nodes;
  return servicePrompt({
    env,
    services: nodes,
    accept,
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
    defaultHandler: async ({ defaultService: defaultNode }: { defaultService: BlockchainNode | undefined }) => {
      return select({
        message: "Which blockchain node do you want to connect to?",
        choices: [
          ...choices.map((node) => ({
            name: node.name,
            value: node,
          })),
          {
            name: "None",
            value: undefined,
          },
        ],
        default: defaultNode,
      });
    },
  });
}
