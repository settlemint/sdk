import { Command } from "@commander-js/extra-typings";
import { hasuraResumeCommand } from "./hasura/resume";

/**
 * Creates and returns the 'integration-tool' command for the SettleMint SDK.
 * This command provides functionality to resume integration tool services in the SettleMint platform.
 *
 * @returns {Command} The configured 'integration-tool' command with its subcommands
 */
export function integrationToolResumeCommand(): Command {
  return new Command("integration-tool")
    .alias("it")
    .description("Resume an integration tool service in the SettleMint platform")
    .addCommand(hasuraResumeCommand());
}
