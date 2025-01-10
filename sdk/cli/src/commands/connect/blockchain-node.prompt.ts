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
 * @returns The selected blockchain node, or undefined if no nodes are available or none is selected
 */
export async function blockchainNodePrompt(
  env: Partial<DotEnv>,
  nodes: BlockchainNode[],
  accept: boolean | undefined,
): Promise<BlockchainNode | undefined> {
  return servicePrompt<BlockchainNode>(
    env,
    nodes,
    accept,
    "SETTLEMINT_BLOCKCHAIN_NODE",
    async ({ defaultService: defaultNode }) => {
      return select({
        message: "Which blockchain node do you want to connect to?",
        choices: [
          ...nodes.map((node) => ({
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
  );
}
