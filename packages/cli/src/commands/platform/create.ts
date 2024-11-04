import { workspaceCreateCommand } from "@/commands/platform/workspace/create";
import { Command } from "@commander-js/extra-typings";

/**
 * Creates and returns the 'create' command for the SettleMint SDK.
 * This command provides functionality to create resources in the SettleMint platform.
 * Currently supports creating workspaces through the workspace subcommand.
 *
 * @returns {Command} The configured 'create' command with its subcommands
 */
export function createCommand(): Command {
  return new Command("update")
    .alias("u")
    .description("Create a resource in the SettleMint platform")
    .addCommand(workspaceCreateCommand());
}
