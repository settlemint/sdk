import { workspaceCreateCommand } from "@/commands/platform/workspace/create";
import { Command } from "@commander-js/extra-typings";
import { applicationCreateCommand } from "./application/create";

/**
 * Creates and returns the 'create' command for the SettleMint SDK.
 * This command provides functionality to create resources in the SettleMint platform.
 *
 * @returns {Command} The configured 'create' command with its subcommands
 */
export function createCommand(): Command {
  return new Command("create")
    .alias("c")
    .description("Create a resource in the SettleMint platform")
    .addCommand(workspaceCreateCommand())
    .addCommand(applicationCreateCommand());
}
