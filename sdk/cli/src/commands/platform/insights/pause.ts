import { Command } from "@commander-js/extra-typings";
import { blockscoutPauseCommand } from "./blockscout/pause";

/**
 * Creates and returns the 'insights' command for the SettleMint SDK.
 * This command provides functionality to pause insights services in the SettleMint platform.
 *
 * @returns {Command} The configured 'insights' command with its subcommands
 */
export function insightsPauseCommand(): Command {
  return new Command("insights")
    .alias("in")
    .description("Pause an insights service in the SettleMint platform")
    .addCommand(blockscoutPauseCommand());
}
