import select from "@inquirer/select";
import type { BlockchainNode } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a blockchain node to connect to.
 * If there's only one blockchain node available and auto-accept is enabled,
 * it will automatically select that node.
 *
 * @param env - The current environment variables
 * @param nodes - Array of available blockchain nodes
 * @param accept - Whether to automatically accept default values
 * @returns The selected blockchain node or undefined if none selected
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
    nodes.find((node) => node.id === env.SETTLEMINT_BLOCKCHAIN_NODE) ?? (nodes.length === 1 ? nodes[0] : undefined);
  const defaultPossible = accept && defaultNode;

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
