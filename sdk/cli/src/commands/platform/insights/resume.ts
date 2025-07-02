import { Command } from "@commander-js/extra-typings";
import { blockscoutResumeCommand } from "./blockscout/resume";

/**
 * Creates and returns the 'insights' command for the SettleMint SDK.
 * This command provides functionality to resume insights services in the SettleMint platform.
 *
 * @returns {Command} The configured 'insights' command with its subcommands
 */
export function insightsResumeCommand(): Command {
  return new Command("insights")
    .alias("in")
    .description("Resume an insights service in the SettleMint platform")
    .addCommand(blockscoutResumeCommand());
}
