import { Command } from "@commander-js/extra-typings";
import { customDeploymentsUpdateCommand } from "./custom-deployments/update";

/**
 * Creates and returns the 'custom-deployments' command for the SettleMint SDK.
 * This command provides functionality to manage custom deployments in the SettleMint platform.
 * It includes options for connecting to production environments and subcommands for specific operations.
 *
 * @returns {Command} The configured 'custom-deployments' command
 */
export function updateCommand(): Command {
  return new Command("update")
    .alias("u")
    .description("Update a resource in the SettleMint platform")
    .addCommand(customDeploymentsUpdateCommand());
}
