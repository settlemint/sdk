import { Command } from "@commander-js/extra-typings";
import { hasuraRestartCommand } from "./hasura/restart";

/**
 * Creates and returns the 'integration-tool' command for the SettleMint SDK.
 * This command provides functionality to restart integration tool services in the SettleMint platform.
 *
 * @returns {Command} The configured 'integration-tool' command with its subcommands
 */
export function integrationToolRestartCommand(): Command {
  return new Command("integration-tool")
    .alias("it")
    .description("Restart an integration tool service in the SettleMint platform")
    .addCommand(hasuraRestartCommand());
}
