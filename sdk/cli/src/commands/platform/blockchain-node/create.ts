import { Command } from "@commander-js/extra-typings";
import { blockchainNodeBesuCreateCommand } from "./besu/create";

/**
 * Creates and returns the 'blockchain-node' command for the SettleMint SDK.
 * This command provides functionality to create blockchain nodes in the SettleMint platform.
 *
 * @returns {Command} The configured 'blockchain-node' command with its subcommands
 */
export function blockchainNodeCreateCommand(): Command {
  return new Command("blockchain-node")
    .alias("bn")
    .description("Create a blockchain node in the SettleMint platform")
    .addCommand(blockchainNodeBesuCreateCommand());
}
