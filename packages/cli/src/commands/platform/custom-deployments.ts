import { Command } from "@commander-js/extra-typings";
import { customDeploymentsUpdateCommand } from "./custom-deployments/edit";

/**
 * Creates and returns the 'custom-deployments' command for the SettleMint SDK.
 * This command provides functionality to manage custom deployments in the SettleMint platform.
 * It includes options for connecting to production environments and subcommands for specific operations.
 *
 * @returns {Command} The configured 'custom-deployments' command
 */
export function customDeploymentsCommand(): Command {
  return new Command("custom-deployments")
    .alias("cd")
    .option("--prod", "Connect to your production environment")
    .description("Manage custom deployments in the SettleMint platform")
    .addCommand(customDeploymentsUpdateCommand());
}
