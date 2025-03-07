import { sanitizeName } from "@/utils/subgraph/sanitize-name";
import input from "@inquirer/input";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user for the name of their new subgraph.
 * The name will be sanitized to ensure it is valid for The Graph protocol.
 *
 * @param options - The options for the subgraph name prompt
 * @param options.defaultName - The name of the subgraph to deploy (optional)
 * @param options.env - Environment variables containing potential pre-configured subgraph name
 * @param options.accept - Whether to automatically accept existing subgraph name without prompting
 * @returns Promise resolving to the sanitized subgraph name, or undefined if no name provided
 */
export async function subgraphNamePrompt({
  defaultName,
  env,
  accept,
}: {
  defaultName?: string;
  env: Partial<DotEnv>;
  accept: boolean;
}): Promise<string | undefined> {
  const defaultSubgraphName = defaultName ? sanitizeName(defaultName) : undefined;

  if (accept) {
    return defaultSubgraphName ?? env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH;
  }

  const subgraphName = await input({
    message: "What is the name of your subgraph?",
    default: defaultSubgraphName,
    required: true,
  });

  return sanitizeName(subgraphName);
}
