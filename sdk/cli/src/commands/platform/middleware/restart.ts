import { Command } from "@commander-js/extra-typings";
import { graphRestartCommand } from "./graph/restart";
import { smartContractPortalRestartCommand } from "./smart-contract-portal/restart";

/**
 * Creates and returns the 'middleware' command for the SettleMint SDK.
 * This command provides functionality to restart middleware services in the SettleMint platform.
 *
 * @returns {Command} The configured 'middleware' command with its subcommands
 */
export function middlewareRestartCommand(): Command {
  return new Command("middleware")
    .alias("mw")
    .description("Restart a middleware service in the SettleMint platform")
    .addCommand(graphRestartCommand())
    .addCommand(smartContractPortalRestartCommand());
}
