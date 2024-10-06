import select from "@inquirer/select";
import type { IntegrationTool } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function hasuraPrompt(
  env: Partial<DotEnv>,
  integrations: IntegrationTool[],
  accept: boolean,
): Promise<IntegrationTool> {
  const defaultIntegration = integrations.find((integration) => integration.id === env.SETTLEMINT_HASURA);
  const defaultPossible = accept && defaultIntegration;

  const application = await select(
    {
      message: "Which Hasura instance do you want to connect to?",
      choices: integrations
        .filter((integration) => integration.integrationType === "HASURA")
        .map((integration) => ({
          name: integration.name,
          value: integration,
        })),
      default: defaultIntegration,
    },
    { signal: defaultPossible ? AbortSignal.timeout(0) : undefined },
  ).catch((error) => {
    if (error.name === "AbortPromptError") {
      return defaultIntegration;
    }
    throw error;
  });

  if (!application) {
    throw new Error("No Hasura instance selected");
  }

  return application;
}
