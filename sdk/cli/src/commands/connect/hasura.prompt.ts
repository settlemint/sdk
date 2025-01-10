import { servicePrompt } from "@/commands/connect/service.prompt";
import select from "@inquirer/select";
import type { IntegrationTool } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function hasuraPrompt(
  env: Partial<DotEnv>,
  integrations: IntegrationTool[],
  accept: boolean | undefined,
): Promise<IntegrationTool | undefined> {
  const possible = integrations.filter((integration) => integration.integrationType === "HASURA");
  return servicePrompt<IntegrationTool>(
    env,
    possible,
    accept,
    "SETTLEMINT_HASURA",
    async ({ defaultService: defaultHasura }) => {
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
  );
}
