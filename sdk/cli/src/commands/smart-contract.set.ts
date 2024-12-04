import { Command } from "@commander-js/extra-typings";
import { createCommand } from "./smart-contract-set/create";

/**
 * Creates and returns the 'smart-contract-set' command for the SettleMint SDK.
 * This command provides functionality to manage smart contract sets,
 * including creation, updates and deletion.
 *
 * @returns {Command} The configured 'smart-contract-set' command
 */
export function smartContractSetCommand(): Command {
  return new Command("smart-contract-set")
    .alias("scs")
    .description("Manage smart contract sets")
    .addCommand(createCommand());
}
