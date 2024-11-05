import { createCommand } from "@/commands/platform/create";
import { updateCommand } from "@/commands/platform/update";
import { Command } from "@commander-js/extra-typings";

/**
 * Creates and returns the 'platform' command for the SettleMint SDK.
 * This command provides functionality related to the SettleMint platform,
 * including custom deployments management.
 *
 * @returns {Command} The configured 'platform' command
 */
export function platformCommand(): Command {
  return new Command("platform")
    .description("Manage SettleMint platform resources")
    .addCommand(createCommand())
    .addCommand(updateCommand());
}
