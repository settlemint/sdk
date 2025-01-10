import select from "@inquirer/select";
import type { CustomDeployment } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { servicePrompt } from "./service.prompt";

/**
 * Prompts the user to select a custom deployment to connect to.
 *
 * @param env - The environment variables containing the current configuration
 * @param customDeployments - The available custom deployments to choose from
 * @param accept - Whether to automatically accept default values without prompting
 * @returns The selected custom deployment, or undefined if none is selected
 */
export async function customDeploymentPrompt(
  env: Partial<DotEnv>,
  customDeployments: CustomDeployment[],
  accept: boolean | undefined,
): Promise<CustomDeployment | undefined> {
  return servicePrompt({
    env,
    services: customDeployments,
    accept,
    envKey: "SETTLEMINT_CUSTOM_DEPLOYMENT",
    defaultHandler: async ({
      defaultService: defaultCustomDeployment,
    }: { defaultService: CustomDeployment | undefined }) => {
      return select({
        message: "Which Custom Deployment do you want to connect to?",
        choices: [
          ...customDeployments.map((customDeployment) => ({
            name: customDeployment.name,
            value: customDeployment,
          })),
          {
            name: "None",
            value: undefined,
          },
        ],
        default: defaultCustomDeployment,
      });
    },
  });
}
