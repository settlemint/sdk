import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import input from "@inquirer/input";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { sanitizeName } from "../subgraph/utils/sanitize-name";

/**
 * Prompts the user for the name of their subgraph.
 * If a subgraph name is already present in the environment variables,
 * it will be used. Otherwise, the user will be prompted to enter it.
 *
 * @param defaultName - The name of the subgraph to deploy, if not provided, it will be prompted
 * @param env - Partial environment variables, potentially containing a pre-configured subgraph name.
 * @param accept - Whether to automatically accept the existing subgraph name.
 * @param prod - Whether to write to production environment.
 * @returns A promise that resolves to the subgraph name.
 *
 * @example
 * const env: Partial<DotEnv> = { SETTLEMINT_SUBGRAPH_NAME: "my-subgraph" };
 * const subgraphName = await subgraphNamePrompt(env, false, false);
 */
export async function subgraphNamePrompt(
  defaultName: string | undefined,
  env: Partial<DotEnv>,
  accept: boolean,
  prod: boolean | undefined,
): Promise<string | undefined> {
  const defaultSubgraphName = defaultName ? sanitizeName(defaultName) : env.SETTLEMINT_THEGRAPH_SUBGRAPH_NAME;

  if (accept) {
    if (defaultSubgraphName && env.SETTLEMINT_THEGRAPH_SUBGRAPH_NAME !== defaultSubgraphName) {
      await saveSubgraphName(defaultSubgraphName, env, prod);
    }
    return defaultSubgraphName;
  }

  const subgraphName = await input({
    message: "What is the name of your subgraph?",
    default: defaultSubgraphName,
    required: true,
  });

  const sanitizedSubgraphName = sanitizeName(subgraphName);

  if (sanitizedSubgraphName !== defaultSubgraphName) {
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
