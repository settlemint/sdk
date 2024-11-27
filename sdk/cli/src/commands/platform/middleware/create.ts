import { Command } from "@commander-js/extra-typings";
import { graphMiddlewareCreateCommand } from "./graph/create";

/**
 * Creates and returns the 'middleware' command for the SettleMint SDK.
 * This command provides functionality to create middleware services in the SettleMint platform.
 *
 * @returns {Command} The configured 'middleware' command with its subcommands
 */
export function middlewareCreateCommand(): Command {
  return new Command("middleware")
    .alias("mw")
    .description("Create a middleware service in the SettleMint platform")
    .addCommand(graphMiddlewareCreateCommand());
}
