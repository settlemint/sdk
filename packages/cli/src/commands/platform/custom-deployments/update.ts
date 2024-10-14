import { waitForCompletion } from "@/commands/platform/utils/wait-for-completion";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'connect' command for the SettleMint SDK.
 * This command initializes the setup of the SettleMint SDK in the user's project.
 * It guides the user through a series of prompts to configure their environment,
 * select services, and set up necessary files.
 *
 * @returns {Command} The configured 'connect' command
 */
export function customDeploymentsUpdateCommand(): Command<[id: string, tag: string], { prod?: boolean }> {
  return new Command("custom-deployment")
    .alias("custom-deployments")
    .alias("cd")
    .argument("<id>", "The ID of the custom deployment to update")
    .argument("<tag>", "The tag to update the custom deployment to")
    .option("--prod", "Connect to your production environment")
    .option("--wait", "Wait for the custom deployment to be redeployed")
    .description("Update a custom deployment in the SettleMint platform")
    .action(async (id, tag, { prod, wait }) => {
      intro("Updating custom deployment in the SettleMint platform");

      const env: DotEnv = await loadEnv(true, !!prod);

      const settlemint = createSettleMintClient({
        accessToken: env.SETTLEMINT_ACCESS_TOKEN,
        instance: env.SETTLEMINT_INSTANCE,
      });

      const customDeployment = await spinner({
        startMessage: "Updating custom deployment",
        task: async () => {
          return settlemint.customDeployment.update(id, tag);
        },
        stopMessage: "Custom deployment updated",
      });

      if (wait) {
        await waitForCompletion(settlemint, "customDeployment", customDeployment.id);
      }

      outro(`${customDeployment.name} updated to ${tag}`);
    });
}
