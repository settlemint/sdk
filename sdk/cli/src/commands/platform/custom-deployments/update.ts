import { waitForCompletion } from "@/commands/platform/utils/wait-for-completion";
import { instancePrompt } from "@/prompts/instance.prompt";
import { createExamples } from "@/utils/commands/create-examples";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { cancel, intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'connect' command for the SettleMint SDK.
 * This command initializes the setup of the SettleMint SDK in the user's project.
 * It guides the user through a series of prompts to configure their environment,
 * select services, and set up necessary files.
 *
 * @returns {Command} The configured 'connect' command
 */
export function customDeploymentsUpdateCommand(): Command<[tag: string], { prod?: boolean; wait?: boolean }> {
  return new Command("custom-deployment")
    .alias("cd")
    .argument("<tag>", "The tag to update the custom deployment to")
    .option(
      "--unique-name <uniqueName>",
      "The unique name of the custom deployment to update. If not provided, will use SETTLEMINT_CUSTOM_DEPLOYMENT from env",
    )
    .option("--prod", "Connect to your production environment")
    .option("--wait", "Wait for the custom deployment to be redeployed")
    .description("Update a custom deployment in the SettleMint platform")
    .usage(
      createExamples([
        {
          description: "Update a custom deployment",
          command: "custom-deployment update v1.0.0",
        },
        {
          description: "Update a custom deployment with a specific unique name",
          command: "custom-deployment update v1.0.0 --unique-name my-custom-deployment",
        },
      ]),
    )
    .action(async (tag, { uniqueName, prod, wait }) => {
      intro("Updating custom deployment in the SettleMint platform");

      const env: Partial<DotEnv> = await loadEnv(false, !!prod);

      const customDeploymentUniqueName = uniqueName ?? env.SETTLEMINT_CUSTOM_DEPLOYMENT;
      if (!customDeploymentUniqueName) {
        cancel(
          "No custom deployment unique name specified. Please provide it either via the --unique-name flag or by setting the SETTLEMINT_CUSTOM_DEPLOYMENT environment variable",
        );
      }

      const instance = await instancePrompt(env, true);
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance,
        prefer: "application",
      });

      const settlemint = createSettleMintClient({
        accessToken,
        instance,
      });

      const customDeployment = await spinner({
        startMessage: "Updating custom deployment",
        task: async () => {
          return settlemint.customDeployment.update(customDeploymentUniqueName, tag);
        },
        stopMessage: "Custom deployment updated",
      });

      if (wait) {
        await waitForCompletion({
          settlemint,
          type: "custom deployment",
          uniqueName: customDeployment.uniqueName,
          action: "deploy",
        });
      }

      outro(`${customDeployment.name} updated to ${tag}`);
    });
}
