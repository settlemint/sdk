import input from "@inquirer/input";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { writeEnvSpinner } from "../../connect/write-env.spinner";
import { sanitizeName } from "../subgraph/utils/sanitize-name";

/**
 * Prompts the user for the name of their subgraph.
 * If a subgraph name is already present in the environment variables,
 * it will be used. Otherwise, the user will be prompted to enter it.
 *
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
  env: Partial<DotEnv>,
  accept: boolean,
  prod: boolean | undefined,
): Promise<string | undefined> {
  const defaultSubgraphName = env.SETTLEMINT_THEGRAPH_SUBGRAPH_NAME;

  if (accept) {
    return defaultSubgraphName;
  }

  const subgraphName = await input({
    message: "What is the name of your subgraph?",
    default: defaultSubgraphName,
    required: true,
  });

  const sanitizedSubgraphName = sanitizeName(subgraphName);

  if (sanitizedSubgraphName !== defaultSubgraphName) {
    await writeEnvSpinner(!!prod, {
      ...env,
      SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: sanitizedSubgraphName,
    });
  }

  return sanitizedSubgraphName;
}
