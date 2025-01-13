import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

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
}: {
  env: Partial<DotEnv>;
  middlewares: Middleware[];
  accept?: boolean;
  filterRunningOnly?: boolean;
  isRequired?: boolean;
}) {
  const graphMiddlewares = middlewares.filter((middleware) => middleware.__typename === "HAGraphMiddleware");
  const choices = filterRunningOnly
    ? graphMiddlewares.filter((middleware) => middleware.status === "COMPLETED")
    : graphMiddlewares;
  return servicePrompt({
    env,
    services: graphMiddlewares,
    accept,
    envKey: "SETTLEMINT_THEGRAPH",
    isRequired,
    defaultHandler: async ({ defaultService: defaultMiddleware }: { defaultService: Middleware | undefined }) => {
      return select({
        message: "Which The Graph instance do you want to connect to?",
        choices: [
          ...choices.map((middleware) => ({
            name: middleware.name,
            value: middleware,
          })),
          ...(isRequired
            ? []
            : [
                {
                  name: "None",
                  value: undefined,
                },
              ]),
        ],
        default: defaultMiddleware,
      });
    },
  });
}
