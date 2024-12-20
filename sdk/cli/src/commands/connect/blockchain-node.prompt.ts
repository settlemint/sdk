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
  accept: boolean,
): Promise<BlockchainNode | undefined> {
  if (nodes.length === 0) {
    return undefined;
  }

  const defaultNode =
    nodes.find((node) => node.uniqueName === env.SETTLEMINT_BLOCKCHAIN_NODE) ??
    (nodes.length === 1 ? nodes[0] : undefined);
  const defaultPossible = accept; // is optional

  if (defaultPossible) {
    return defaultNode;
  }

  const node = await select({
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

  return node;
}
