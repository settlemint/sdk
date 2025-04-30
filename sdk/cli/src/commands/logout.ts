import { createExamples } from "@/utils/commands/create-examples";
import { getInstances, removeCredentials } from "@/utils/config";
import { Command } from "@commander-js/extra-typings";
import select from "@inquirer/select";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'logout' command for the SettleMint SDK CLI.
 * This command removes stored credentials for one or all instances.
 *
 * @returns {Command} The configured 'logout' command
 */
export function logoutCommand(): Command {
  return new Command("logout")
    .description("Logout from your SettleMint account")
    .option("--all", "Logout from all instances")
    .usage(
      createExamples([
        {
          description: "Logout from your SettleMint account",
          command: "settlemint logout",
        },
        {
          description: "Logout from all instances",
          command: "settlemint logout --all",
        },
      ]),
    )
    .action(async (options) => {
      intro("Logging out from SettleMint");
      const instances = await getInstances();

      if (instances.length === 0) {
        outro("No instances to logout from");
        return;
      }

      if (options.all) {
        // Logout from all instances
        await Promise.all(instances.map((instance) => removeCredentials(instance)));
        outro("Successfully logged out from all instances");
        return;
      }

      // If there's only one instance, use that
      if (instances.length === 1) {
        const instance = instances[0]!;
        await removeCredentials(instance);
        outro(`Successfully logged out from ${instance}`);
        return;
      }

      // Let user select which instance to logout from
      const env: Partial<DotEnv> = await loadEnv(false, false);
      const defaultInstance = env.SETTLEMINT_INSTANCE;
      const instance = await select({
        message: "Select the instance to logout from:",
        choices: instances.map((instance) => ({
          value: instance,
          label: instance,
          description: defaultInstance && instance === defaultInstance ? "(default)" : undefined,
        })),
      });

      await removeCredentials(instance);
      outro(`Successfully logged out from ${instance}`);
    });
}
