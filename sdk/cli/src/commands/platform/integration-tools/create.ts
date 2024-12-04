import { Command } from "@commander-js/extra-typings";
import { hasuraIntegrationCreateCommand } from "./hasura/create";

/**
 * Creates and returns the 'integration-tool' command group for the SettleMint SDK.
 * This command group contains subcommands for creating different types of integration tools.
 * @returns The configured integration tool command
 */
export function integrationToolCreateCommand(): Command {
  const cmd = new Command("integration-tool").description("Create a new integration tool").alias("it");

  cmd.addCommand(hasuraIntegrationCreateCommand());

  return cmd;
}
