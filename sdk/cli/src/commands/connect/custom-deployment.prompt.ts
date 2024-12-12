import select from "@inquirer/select";
import type { CustomDeployment } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function customDeploymentPrompt(
  env: Partial<DotEnv>,
  customDeployments: CustomDeployment[],
  accept: boolean,
): Promise<CustomDeployment | undefined> {
  if (customDeployments.length === 0) {
    return undefined;
  }

  const defaultCustomDeployment =
    customDeployments.find((customDeployment) => customDeployment.id === env.SETTLEMINT_CUSTOM_DEPLOYMENT) ??
    (customDeployments.length === 1 ? customDeployments[0] : undefined);
  const defaultPossible = accept && defaultCustomDeployment;

  if (defaultPossible) {
    return defaultCustomDeployment;
  }

  const middleware = await select({
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

  return middleware;
}
