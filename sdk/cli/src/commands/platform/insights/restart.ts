import { Command } from "@commander-js/extra-typings";
import { blockscoutRestartCommand } from "./blockscout/restart";

/**
 * Creates and returns the 'insights' command for the SettleMint SDK.
 * This command provides functionality to restart insights services in the SettleMint platform.
 *
 * @returns {Command} The configured 'insights' command with its subcommands
 */
export function insightsRestartCommand(): Command {
  return new Command("insights")
    .alias("in")
    .description("Restart an insights service in the SettleMint platform")
    .addCommand(blockscoutRestartCommand());
}
