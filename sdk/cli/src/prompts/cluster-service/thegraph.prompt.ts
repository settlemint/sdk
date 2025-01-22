import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";

/**
 * Extract HAGraphMiddleware type from the Middleware union type
 */
export type HAGraphMiddleware = Extract<Middleware, { __typename: "HAGraphMiddleware" }>;

/**
 * Type guard to check if a middleware is HAGraphMiddleware
 */
export function isHAGraphMiddleware(middleware: Middleware): middleware is HAGraphMiddleware {
  return middleware.__typename === "HAGraphMiddleware";
}

export interface TheGraphPromptArgs extends BaseServicePromptArgs<HAGraphMiddleware> {
  middlewares: Middleware[];
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
}: TheGraphPromptArgs): Promise<HAGraphMiddleware | undefined> {
  const graphMiddlewares = middlewares.filter(isHAGraphMiddleware);
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
