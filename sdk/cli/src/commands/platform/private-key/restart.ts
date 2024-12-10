import { Command } from "@commander-js/extra-typings";
import { hdEcdsaP256RestartCommand } from "./hd-ecdsa-p256/restart";

/**
 * Creates and returns the 'private-key' command for the SettleMint SDK.
 * This command provides functionality to restart private keys in the SettleMint platform.
 *
 * @returns {Command} The configured 'private-key' command with its subcommands
 */
export function privateKeyRestartCommand(): Command {
  return new Command("private-key")
    .alias("pk")
    .description("Restart a private key in the SettleMint platform")
    .addCommand(hdEcdsaP256RestartCommand());
}
