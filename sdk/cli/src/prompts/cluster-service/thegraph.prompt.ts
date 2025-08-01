import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";
import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import { isRunning } from "@/utils/cluster-service";

/**
 * Extract HAGraphMiddleware or HAGraphPostgresMiddleware type from the Middleware union type
 */
export type AnyHAGraphMiddleware = Extract<
  Middleware,
  { __typename: "HAGraphMiddleware" | "HAGraphPostgresMiddleware" }
>;

/**
 * Type guard to check if a middleware is HAGraphMiddleware or HAGraphPostgresMiddleware
 */
export function isAnyHAGraphMiddleware(middleware: Middleware): middleware is AnyHAGraphMiddleware {
  return middleware.__typename === "HAGraphMiddleware" || middleware.__typename === "HAGraphPostgresMiddleware";
}

export interface TheGraphPromptArgs extends BaseServicePromptArgs {
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
}: TheGraphPromptArgs): Promise<AnyHAGraphMiddleware | undefined> {
  const graphMiddlewares = middlewares.filter(isAnyHAGraphMiddleware);
  return servicePrompt({
    env,
    services: graphMiddlewares,
    accept,
    envKey: "SETTLEMINT_THEGRAPH",
    isRequired,
    defaultHandler: async ({ defaultService: defaultMiddleware, choices }) => {
      const filteredChoices = filterRunningOnly
        ? choices.filter(({ value: middleware }) => isRunning(middleware))
        : choices;
      return select({
        message: "Which The Graph instance do you want to connect to?",
        choices: filteredChoices,
        default: defaultMiddleware,
      });
    },
  });
}
