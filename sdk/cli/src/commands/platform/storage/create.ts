import { Command } from "@commander-js/extra-typings";
import { ipfsStorageCreateCommand } from "./ipfs/create";
import { minioStorageCreateCommand } from "./minio/create";

/**
 * Creates and returns the 'storage' command for the SettleMint SDK.
 * This command provides functionality to create storage services in the SettleMint platform.
 *
 * @returns {Command} The configured 'storage' command with its subcommands
 */
export function storageCreateCommand(): Command {
  return new Command("storage")
    .alias("st")
    .description("Create a storage service in the SettleMint platform")
    .addCommand(ipfsStorageCreateCommand())
    .addCommand(minioStorageCreateCommand());
}
