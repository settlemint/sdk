import { servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { IntegrationTool } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a Hasura instance to connect to.
 *
 * @param config - Configuration object containing environment, integrations, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.integrations - The available integration tools to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.isRequired - Whether a Hasura instance is required
 * @returns The selected Hasura integration, or undefined if none is selected
 */
export async function hasuraPrompt({
  env,
  integrations,
  accept,
  isRequired = false,
}: {
  env: Partial<DotEnv>;
  integrations: IntegrationTool[];
  accept: boolean | undefined;
  isRequired?: boolean;
}): Promise<IntegrationTool | undefined> {
  const possible = integrations.filter((integration) => integration.integrationType === "HASURA");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_HASURA",
    isRequired,
    defaultHandler: async ({ defaultService: defaultHasura, choices }) => {
      return select({
        message: "Which Hasura instance do you want to connect to?",
        choices,
        default: defaultHasura,
      });
    },
  });
}
