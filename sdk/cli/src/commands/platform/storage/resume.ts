import { Command } from "@commander-js/extra-typings";
import { ipfsStorageResumeCommand } from "./ipfs/resume";
import { minioStorageResumeCommand } from "./minio/resume";

/**
 * Creates and returns the 'storage' command for the SettleMint SDK.
 * This command provides functionality to resume storage services in the SettleMint platform.
 *
 * @returns {Command} The configured 'storage' command with its subcommands
 */
export function storageResumeCommand(): Command {
  return new Command("storage")
    .alias("st")
    .description("Resume a storage service in the SettleMint platform")
    .addCommand(ipfsStorageResumeCommand())
    .addCommand(minioStorageResumeCommand());
}
