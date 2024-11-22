import select from "@inquirer/select";
import type { IntegrationTool } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function hasuraPrompt(
  env: Partial<DotEnv>,
  integrations: IntegrationTool[],
  accept: boolean,
): Promise<IntegrationTool | undefined> {
  const possible = integrations.filter((integration) => integration.integrationType === "HASURA");

  if (possible.length === 0) {
    return undefined;
  }

  const defaultIntegration =
    (possible.find((integration) => integration.id === env.SETTLEMINT_HASURA) ?? possible.length === 1)
      ? possible[0]
      : undefined;
  const defaultPossible = accept && defaultIntegration;

  if (defaultPossible) {
    return defaultIntegration;
  }

  const hasura = await select({
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
    default: defaultIntegration,
  });

  return hasura;
}
