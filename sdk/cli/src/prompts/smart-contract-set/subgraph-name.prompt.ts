import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import { sanitizeName } from "@/utils/subgraph/sanitize-name";
import input from "@inquirer/input";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user for the name of their subgraph.
 * If a subgraph name is already present in the environment variables,
 * it will be used. Otherwise, the user will be prompted to enter it.
 * The name will be sanitized to ensure it is valid for The Graph protocol.
 *
 * @param options - The options for the subgraph name prompt
 * @param options.defaultName - The name of the subgraph to deploy (optional)
 * @param options.env - Environment variables containing potential pre-configured subgraph name
 * @param options.accept - Whether to automatically accept existing subgraph name without prompting
 * @param options.prod - Whether to write to production environment variables
 * @returns Promise resolving to the sanitized subgraph name, or undefined if no name provided
 */
export async function subgraphNamePrompt({
  defaultName,
  env,
  accept,
  prod,
}: {
  defaultName?: string;
  env: Partial<DotEnv>;
  accept: boolean;
  prod?: boolean;
}): Promise<string | undefined> {
  const defaultSubgraphName = defaultName ? sanitizeName(defaultName) : undefined;

  if (accept) {
    if (defaultSubgraphName && env.SETTLEMINT_THEGRAPH_SUBGRAPH_NAME !== defaultSubgraphName) {
      await saveSubgraphName(defaultSubgraphName, env, prod);
    }
    return defaultSubgraphName ?? env.SETTLEMINT_THEGRAPH_SUBGRAPH_NAME;
  }

  const subgraphName = await input({
    message: "What is the name of your subgraph?",
    default: defaultSubgraphName,
    required: true,
  });

  const sanitizedSubgraphName = sanitizeName(subgraphName);

  if (env.SETTLEMINT_THEGRAPH_SUBGRAPH_NAME !== sanitizedSubgraphName) {
    await saveSubgraphName(sanitizedSubgraphName, env, prod);
  }

  return sanitizedSubgraphName;
}

async function saveSubgraphName(sanitizedSubgraphName: string, env: Partial<DotEnv>, prod: boolean | undefined) {
  await writeEnvSpinner(!!prod, {
    ...env,
    SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: sanitizedSubgraphName,
  });
}
