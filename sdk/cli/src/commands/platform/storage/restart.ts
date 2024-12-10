import { Command } from "@commander-js/extra-typings";
import { ipfsRestartCommand } from "./ipfs/restart";

/**
 * Creates and returns the 'storage' command for the SettleMint SDK.
 * This command provides functionality to restart storage services in the SettleMint platform.
 *
 * @returns {Command} The configured 'storage' command with its subcommands
 */
export function storageRestartCommand(): Command {
  return new Command("storage")
    .alias("st")
    .description("Restart a storage service in the SettleMint platform")
    .addCommand(ipfsRestartCommand());
}
