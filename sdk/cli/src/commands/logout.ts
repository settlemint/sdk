import { telemetry } from "@/utils/telemetry";
import { Command } from "@commander-js/extra-typings";
import select from "@inquirer/select";
import { intro, outro } from "@settlemint/sdk-utils/terminal";
import { getDefaultInstance, getInstances, removeCredentials } from "../utils/config";

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
    .action(async (options) => {
      intro("Logging out from SettleMint");
      try {
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
        const defaultInstance = await getDefaultInstance();
        const instance = await select({
          message: "Select the instance to logout from:",
          choices: instances.map((instance) => ({
            value: instance,
            label: instance,
            description: instance === defaultInstance ? "(default)" : undefined,
          })),
        });

        await removeCredentials(instance);
        outro(`Successfully logged out from ${instance}`);
        await telemetry({
          command: "logout",
          status: "success",
          instance,
        });
      } catch (error) {
        await telemetry({
          command: "logout",
          status: "error",
          message: (error as Error).message,
        });
        throw error;
      }
    });
}
