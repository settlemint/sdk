import { Command } from "@commander-js/extra-typings";
import { blockchainNetworkBesuCreateCommand } from "./besu/create";

/**
 * Creates and returns the 'blockchain-network' command for the SettleMint SDK.
 * This command provides functionality to create blockchain networks in the SettleMint platform.
 *
 * @returns {Command} The configured 'blockchain-network' command with its subcommands
 */
export function blockchainNetworkCreateCommand(): Command {
  return new Command("blockchain-network")
    .alias("bn")
    .description("Create a blockchain network in the SettleMint platform")
    .addCommand(blockchainNetworkBesuCreateCommand());
}
