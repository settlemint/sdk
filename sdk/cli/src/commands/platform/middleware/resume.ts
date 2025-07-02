import { Command } from "@commander-js/extra-typings";
import { graphMiddlewareResumeCommand } from "./graph/resume";
import { smartContractPortalMiddlewareResumeCommand } from "./smart-contract-portal/resume";

/**
 * Creates and returns the 'middleware' command for the SettleMint SDK.
 * This command provides functionality to resume middleware services in the SettleMint platform.
 *
 * @returns {Command} The configured 'middleware' command with its subcommands
 */
export function middlewareResumeCommand(): Command {
  return new Command("middleware")
    .alias("mw")
    .description("Resume a middleware service in the SettleMint platform")
    .addCommand(graphMiddlewareResumeCommand())
    .addCommand(smartContractPortalMiddlewareResumeCommand());
}
