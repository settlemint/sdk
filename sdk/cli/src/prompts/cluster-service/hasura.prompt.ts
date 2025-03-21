import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { IntegrationTool } from "@settlemint/sdk-js";

export type Hasura = Extract<IntegrationTool, { __typename: "Hasura" }>;

export function isHasura(integration: IntegrationTool): integration is Hasura {
  return integration.__typename === "Hasura";
}

export interface HasuraPromptArgs extends BaseServicePromptArgs<Hasura> {
  integrations: IntegrationTool[];
}

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
}: HasuraPromptArgs): Promise<Hasura | undefined> {
  const hasuras = integrations.filter(isHasura);
  return servicePrompt({
    env,
    services: hasuras,
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
