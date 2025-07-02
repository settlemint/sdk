import { Command } from "@commander-js/extra-typings";
import { graphMiddlewarePauseCommand } from "./graph/pause";
import { smartContractPortalMiddlewarePauseCommand } from "./smart-contract-portal/pause";

/**
 * Creates and returns the 'middleware' command for the SettleMint SDK.
 * This command provides functionality to pause middleware services in the SettleMint platform.
 *
 * @returns {Command} The configured 'middleware' command with its subcommands
 */
export function middlewarePauseCommand(): Command {
  return new Command("middleware")
    .alias("mw")
    .description("Pause a middleware service in the SettleMint platform")
    .addCommand(graphMiddlewarePauseCommand())
    .addCommand(smartContractPortalMiddlewarePauseCommand());
}
