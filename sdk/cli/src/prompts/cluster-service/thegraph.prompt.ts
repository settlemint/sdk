import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";

export interface TheGraphPromptArgs extends BaseServicePromptArgs<Middleware> {
  middlewares: Middleware[];
  filterRunningOnly?: boolean;
}

/**
 * Prompts the user to select a The Graph instance to connect to.
 *
 * @param options - The options object containing:
 * @param options.env - The environment variables containing the current configuration
 * @param options.middlewares - The available middleware instances to choose from
 * @param options.accept - Whether to automatically accept default values without prompting
 * @param options.filterRunningOnly - Whether to only show running graph middlewares
 * @param options.isRequired - Whether a selection is required
 * @returns The selected The Graph middleware, or undefined if none is selected
 */
export async function theGraphPrompt({
  env,
  middlewares,
  accept,
  filterRunningOnly = false,
  isRequired = false,
}: TheGraphPromptArgs): Promise<Middleware | undefined> {
  const graphMiddlewares = middlewares.filter((middleware) => middleware.__typename === "HAGraphMiddleware");
  return servicePrompt({
    env,
    services: graphMiddlewares,
    accept,
    envKey: "SETTLEMINT_THEGRAPH",
    isRequired,
    defaultHandler: async ({ defaultService: defaultMiddleware, choices }) => {
      const filteredChoices = filterRunningOnly
        ? choices.filter(({ value: middleware }) => middleware === undefined || middleware?.status === "COMPLETED")
        : choices;
      return select({
        message: "Which The Graph instance do you want to connect to?",
        choices: filteredChoices,
        default: defaultMiddleware,
      });
    },
  });
}
