import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { IntegrationTool } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a Hasura instance to connect to.
 *
 * @param env - The environment variables containing the current configuration
 * @param integrations - The available integration tools to choose from
 * @param accept - Whether to automatically accept default values without prompting
 * @returns The selected Hasura integration, or undefined if none is selected
 */
export async function hasuraPrompt(
  env: Partial<DotEnv>,
  integrations: IntegrationTool[],
  accept: boolean | undefined,
): Promise<IntegrationTool | undefined> {
  const possible = integrations.filter((integration) => integration.integrationType === "HASURA");
  return servicePrompt({
    env,
    services: possible,
    accept,
    envKey: "SETTLEMINT_HASURA",
    defaultHandler: async ({ defaultService: defaultHasura }: { defaultService: IntegrationTool | undefined }) => {
      return select({
        message: "Which Hasura instance do you want to connect to?",
        choices: [
          ...possible.map((integration) => ({
            name: integration.name,
            value: integration,
          })),
          {
            name: "None",
            value: undefined,
          },
        ],
        default: defaultHasura,
      });
    },
  });
}
