import select from "@inquirer/select";
import { cancel } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

const ALL = "All";

/**
 * Prompts the user to select a subgraph name from a list of available subgraphs.
 * If running in CI, returns all available subgraphs without prompting.
 *
 * @param env - Environment variables containing subgraph endpoint URLs
 * @returns Array of selected subgraph names
 * @throws If no subgraph names are available to select from
 */
export async function subgraphPrompt(env: Partial<DotEnv>, accept: boolean | undefined): Promise<string[]> {
  const autoAccept = isInCi || !!accept;
  const subgraphNames =
    (env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?.map((endpoint) => endpoint.split("/").pop()).filter(
      Boolean,
    ) as string[]) ?? [];

  if (autoAccept) {
    return subgraphNames;
  }

  if (subgraphNames.length === 0) {
    cancel("No subgraphs found");
  }

  if (subgraphNames.length === 1) {
    return subgraphNames;
  }

  const subgraphName = await select({
    message: "Which The Graph subgraph do you want to generate types for?",
    choices: [ALL, ...subgraphNames].map((name) => ({
      name,
      value: name,
    })),
    default: ALL,
  });

  if (!subgraphName) {
    cancel("No subgraph selected");
  }

  return subgraphName === ALL ? subgraphNames : [subgraphName];
}
