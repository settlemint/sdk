import { DEFAULT_SUBGRAPH_NAME } from "@/constants/default-subgraph";
import { subgraphNamePrompt } from "@/prompts/smart-contract-set/subgraph-name.prompt";
import select from "@inquirer/select";
import { cancel } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

const ALL = "All";
const NEW = "New subgraph";

/**
 * Prompts the user to select a subgraph name from a list of available subgraphs.
 * If running in CI or accept is true, returns the default
 * subgraph or all available subgraphs (if allowAll is true) without prompting.
 *
 * @param options - Configuration options for the subgraph prompt
 * @param options.env - Environment variables containing subgraph endpoint URLs and default subgraph
 * @param options.accept - Whether to automatically accept default values without prompting
 * @param options.message - Message to display in the prompt
 * @param options.allowAll - Whether to allow selecting all subgraphs at once
 * @param options.allowNew - Whether to allow creating a new subgraph
 * @param options.isCi - Whether running in CI environment (defaults to isInCi)
 * @returns Array of selected subgraph names
 * @throws {Error} If no subgraphs are found or if no subgraph is selected
 */
export async function subgraphPrompt({
  env,
  accept,
  message,
  allowAll = false,
  allowNew = false,
  isCi = isInCi,
}: {
  env: Partial<DotEnv>;
  accept?: boolean;
  message: string;
  allowAll?: boolean;
  allowNew?: boolean;
  isCi?: boolean;
}): Promise<string[]> {
  const autoAccept = isCi || !!accept;
  const subgraphNames =
    (env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?.map((endpoint) => endpoint.split("/").pop()).filter(
      Boolean,
    ) as string[]) ?? [];

  if (autoAccept) {
    if (allowAll) {
      return subgraphNames;
    }
    if (env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH) {
      return [env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH];
    }
    if (subgraphNames.length === 1) {
      return subgraphNames;
    }
    // Use the kit subgraph as default if it exists
    if (subgraphNames.includes(DEFAULT_SUBGRAPH_NAME)) {
      return [DEFAULT_SUBGRAPH_NAME];
    }
    return [];
  }

  if (!allowNew) {
    if (subgraphNames.length === 0) {
      cancel("No subgraphs found");
    }

    if (subgraphNames.length === 1) {
      return subgraphNames;
    }
  }

  const choices = subgraphNames.slice().sort();
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
    defaultChoice = env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH ?? NEW;
  } else {
    defaultChoice = env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH ?? subgraphNames[0];
  }
  const subgraphName =
    choices.length === 1 && choices[0] === NEW
      ? NEW
      : await select({
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
