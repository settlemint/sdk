import { Command } from "@commander-js/extra-typings";
import { hasuraPauseCommand } from "./hasura/pause";

/**
 * Creates and returns the 'integration-tool' command for the SettleMint SDK.
 * This command provides functionality to pause integration tool services in the SettleMint platform.
 *
 * @returns {Command} The configured 'integration-tool' command with its subcommands
 */
export function integrationToolPauseCommand(): Command {
  return new Command("integration-tool")
    .alias("it")
    .description("Pause an integration tool service in the SettleMint platform")
    .addCommand(hasuraPauseCommand());
}
