import { servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { Middleware } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a Smart Contract Portal instance to connect to.
 *
 * @param config - Configuration object containing environment, middlewares, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.middlewares - The available middleware instances to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.isRequired - Whether a Portal instance is required
 * @returns The selected Portal middleware, or undefined if none is selected
 */
export async function portalPrompt({
  env,
  middlewares,
  accept,
  isRequired = false,
}: {
  env: Partial<DotEnv>;
  middlewares: Middleware[];
  accept: boolean | undefined;
  isRequired?: boolean;
}): Promise<Middleware | undefined> {
  const possible = middlewares.filter((middleware) => middleware.interface === "SMART_CONTRACT_PORTAL");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_PORTAL",
    isRequired,
    defaultHandler: async ({ defaultService: defaultMiddleware, choices }) => {
      return select({
        message: "Which Smart Contract Portal instance do you want to connect to?",
        choices,
        default: defaultMiddleware,
      });
    },
  });
}
