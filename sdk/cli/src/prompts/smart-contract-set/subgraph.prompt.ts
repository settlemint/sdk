import { subgraphNamePrompt } from "@/prompts/smart-contract-set/subgraph-name.prompt";
import select from "@inquirer/select";
import { cancel } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

const ALL = "All";
const NEW = "New";

/**
 * Prompts the user to select a subgraph name from a list of available subgraphs.
 * If running in CI, returns all available subgraphs without prompting.
 *
 * @param env - Environment variables containing subgraph endpoint URLs
 * @returns Array of selected subgraph names
 * @throws If no subgraph names are available to select from
 */
export async function subgraphPrompt({
  env,
  accept,
  message,
  allowAll = false,
  allowNew = false,
}: {
  env: Partial<DotEnv>;
  accept?: boolean;
  message: string;
  allowAll?: boolean;
  allowNew?: boolean;
}): Promise<string[]> {
  const autoAccept = isInCi || !!accept;
  const subgraphNames =
    (env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?.map((endpoint) => endpoint.split("/").pop()).filter(
      Boolean,
    ) as string[]) ?? [];

  if (autoAccept) {
    return allowAll
      ? subgraphNames
      : env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH
        ? [env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH]
        : [];
  }

  if (subgraphNames.length === 0) {
    cancel("No subgraphs found");
  }

  if (subgraphNames.length === 1) {
    return subgraphNames;
  }

  const choices = subgraphNames.slice();
  if (allowAll) {
    choices.unshift(ALL);
  }
  if (allowNew) {
    choices.unshift(NEW);
  }

  let defaultChoice: string;
  if (allowAll) {
    defaultChoice = ALL;
  } else if (allowNew) {
    defaultChoice = NEW;
  } else {
    defaultChoice = env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH ?? subgraphNames[0];
  }
  const subgraphName = await select({
    message: message,
    choices: choices.map((name) => ({
      name,
      value: name,
    })),
    default: defaultChoice,
  });

  if (!subgraphName) {
    cancel("No subgraph selected");
  }

  if (subgraphName === NEW) {
    const newSubgraphName = await subgraphNamePrompt({
      defaultName: "",
      env,
      accept: autoAccept,
    });
    if (!newSubgraphName) {
      return [];
    }
    return [newSubgraphName];
  }

  return subgraphName === ALL ? subgraphNames : [subgraphName];
}
