import { Command } from "@commander-js/extra-typings";
import { blockscoutInsightsCreateCommand } from "./blockscout/create";

/**
 * Creates and returns the 'insights' command group for the SettleMint SDK.
 * This command group contains subcommands for creating different types of insights.
 * @returns The configured insights command
 */
export function insightsCreateCommand(): Command {
  const cmd = new Command("insights").description("Create a new insights").alias("in");

  cmd.addCommand(blockscoutInsightsCreateCommand());

  return cmd;
}
