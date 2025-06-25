import { Command } from "@commander-js/extra-typings";
import { blockchainNodeResumeCommand } from "./blockchain-node/resume";

/**
 * Creates and returns the 'resume' command group for the SettleMint SDK.
 * This command group contains subcommands for resuming various services in the SettleMint platform.
 */
export function resumeCommand() {
  const cmd = new Command("resume")
    .description("Resume a resource in the SettleMint platform")
    .addCommand(blockchainNodeResumeCommand());

  return cmd;
}
