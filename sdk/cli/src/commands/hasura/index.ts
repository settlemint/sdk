import { Command } from "@commander-js/extra-typings";
import { hasuraTrackTableCommand } from "./track-table";

/**
 * Creates and returns the 'hasura' command for the SettleMint SDK.
 * This command provides functionality to manage the Hasura resource in the SettleMint platform.
 *
 * @returns {Command} The configured 'hasura' command with its subcommands
 */
export function hasuraCommand(): Command {
  return new Command("hasura")
    .alias("ha")
    .description("Manage Hasura service in the SettleMint platform")
    .addCommand(hasuraTrackTableCommand());
}
