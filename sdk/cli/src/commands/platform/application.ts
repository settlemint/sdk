import { Command } from "@commander-js/extra-typings";
import { servicesCommand } from "./application/services";

/**
 * Creates and returns the 'application' command group for the SettleMint SDK.
 * This command group contains subcommands for managing applications in the SettleMint platform.
 *
 * @returns {Command} The configured 'application' command with its subcommands
 */
export function applicationCommand(): Command {
  return new Command("application")
    .alias("app")
    .description("Manage applications in the SettleMint platform")
    .addCommand(servicesCommand());
}
