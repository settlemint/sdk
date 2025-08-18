import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { IntegrationTool } from "@settlemint/sdk-js";

export type AnyHasura =
  | Extract<IntegrationTool, { __typename: "Hasura" }>
  | Extract<IntegrationTool, { __typename: "HAHasura" }>;

export function isAnyHasura(integration: IntegrationTool): integration is AnyHasura {
  return integration.__typename === "Hasura" || integration.__typename === "HAHasura";
}

export interface HasuraPromptArgs extends BaseServicePromptArgs {
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
}: HasuraPromptArgs): Promise<AnyHasura | undefined> {
  const hasuras = integrations.filter(isAnyHasura);
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
