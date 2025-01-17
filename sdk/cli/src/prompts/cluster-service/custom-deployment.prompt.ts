import select from "@inquirer/select";
import type { CustomDeployment } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { servicePrompt } from "./service.prompt";

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
}: {
  env: Partial<DotEnv>;
  customDeployments: CustomDeployment[];
  accept: boolean | undefined;
  isRequired?: boolean;
}): Promise<CustomDeployment | undefined> {
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
