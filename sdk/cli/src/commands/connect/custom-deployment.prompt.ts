import select from "@inquirer/select";
import type { CustomDeployment } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { servicePrompt } from "./service.prompt";

export async function customDeploymentPrompt(
  env: Partial<DotEnv>,
  customDeployments: CustomDeployment[],
  accept: boolean | undefined,
): Promise<CustomDeployment | undefined> {
  return servicePrompt(
    env,
    customDeployments,
    accept,
    "SETTLEMINT_CUSTOM_DEPLOYMENT",
    async ({ defaultService: defaultCustomDeployment }) => {
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
  );
}
