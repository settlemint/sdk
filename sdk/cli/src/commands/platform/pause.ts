import { Command } from "@commander-js/extra-typings";
import { blockchainNodePauseCommand } from "./blockchain-node/pause";

/**
 * Creates and returns the 'pause' command group for the SettleMint SDK.
 * This command group contains subcommands for pausing various services in the SettleMint platform.
 */
export function pauseCommand() {
  const cmd = new Command("pause")
    .description("Pause a resource in the SettleMint platform")
    .addCommand(blockchainNodePauseCommand());

  return cmd;
}
