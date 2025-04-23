import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { CustomDeployment } from "@settlemint/sdk-js";

export interface CustomDeploymentPromptArgs extends BaseServicePromptArgs {
  customDeployments: CustomDeployment[];
}

/**
 * Prompts the user to select a custom deployment to connect to.
 *
 * @param config - Configuration object containing environment, custom deployments, and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.customDeployments - The available custom deployments to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.isRequired - Whether a custom deployment is required
 * @returns The selected custom deployment, or undefined if none is selected
 */
export async function customDeploymentPrompt({
  env,
  customDeployments,
  accept,
  isRequired = false,
}: CustomDeploymentPromptArgs): Promise<CustomDeployment | undefined> {
  return servicePrompt({
    env,
    services: customDeployments,
    accept,
    envKey: "SETTLEMINT_CUSTOM_DEPLOYMENT",
    isRequired,
    defaultHandler: async ({ defaultService: defaultCustomDeployment, choices }) => {
      return select({
        message: "Which Custom Deployment do you want to connect to?",
        choices,
        default: defaultCustomDeployment,
      });
    },
  });
}
