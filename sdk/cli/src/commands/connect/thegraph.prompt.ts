import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a The Graph instance to connect to.
 *
 * @param env - The environment variables containing the current configuration
 * @param middlewares - The available middleware instances to choose from
 * @param accept - Whether to automatically accept default values without prompting
 * @returns The selected The Graph middleware, or undefined if none is selected
 */
export async function theGraphPrompt(env: Partial<DotEnv>, middlewares: Middleware[], accept: boolean | undefined) {
  const possible = middlewares.filter((middleware) => middleware.__typename === "HAGraphMiddleware");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_THEGRAPH",
    defaultHandler: async ({ defaultService: defaultMiddleware }: { defaultService: Middleware | undefined }) => {
      return select({
        message: "Which The Graph instance do you want to connect to?",
        choices: [
          ...possible.map((middleware) => ({
            name: middleware.name,
            value: middleware,
          })),
          {
            name: "None",
            value: undefined,
          },
        ],
        default: defaultMiddleware,
      });
    },
  });
}
