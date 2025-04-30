import { Command } from "@commander-js/extra-typings";
import { applicationsListCommand } from "./application/list";
import { servicesCommand } from "./application/services";
import { workspacesListCommand } from "./workspace/list";

/**
 * Creates and returns the 'list' command group for the SettleMint SDK.
 * This command group contains subcommands for listing resources in the SettleMint platform.
 *
 * @returns {Command} The configured 'list' command with its subcommands
 */
export function listCommand(): Command {
  return new Command("list")
    .alias("ls")
    .description("List resources in the SettleMint platform")
    .addCommand(applicationsListCommand())
    .addCommand(servicesCommand())
    .addCommand(workspacesListCommand());
}
