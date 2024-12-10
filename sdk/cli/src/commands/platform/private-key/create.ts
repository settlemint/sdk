import { Command } from "@commander-js/extra-typings";
import { privateKeyHdCreateCommand } from "./hd-ecdsa-p256/create";
import { privateKeyHsmCreateCommand } from "./hsm-ecdsa-p256/create";

/**
 * Creates and returns the 'private-key' command for the SettleMint SDK.
 * This command provides functionality to create private keys in the SettleMint platform.
 *
 * @returns {Command} The configured 'private-key' command with its subcommands
 */
export function privateKeyCreateCommand(): Command {
  return new Command("private-key")
    .alias("pk")
    .description("Create a private key in the SettleMint platform")
    .addCommand(privateKeyHdCreateCommand())
    .addCommand(privateKeyHsmCreateCommand());
}
