import { Command } from "@commander-js/extra-typings";
import { ipfsStoragePauseCommand } from "./ipfs/pause";
import { minioStoragePauseCommand } from "./minio/pause";

/**
 * Creates and returns the 'storage' command for the SettleMint SDK.
 * This command provides functionality to pause storage services in the SettleMint platform.
 *
 * @returns {Command} The configured 'storage' command with its subcommands
 */
export function storagePauseCommand(): Command {
  return new Command("storage")
    .alias("st")
    .description("Pause a storage service in the SettleMint platform")
    .addCommand(ipfsStoragePauseCommand())
    .addCommand(minioStoragePauseCommand());
}
