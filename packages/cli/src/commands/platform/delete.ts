import { workspaceDeleteCommand } from "@/commands/platform/workspace/delete";
import { Command } from "@commander-js/extra-typings";

/**
 * Creates and returns the 'delete' command for the SettleMint SDK.
 * This command provides functionality to delete resources in the SettleMint platform.
 * Currently supports deleting workspaces through the workspace subcommand.
 *
 * @returns {Command} The configured 'delete' command with its subcommands
 */
export function deleteCommand(): Command {
  return new Command("delete")
    .alias("d")
    .description("Delete a resource in the SettleMint platform")
    .addCommand(workspaceDeleteCommand());
}
