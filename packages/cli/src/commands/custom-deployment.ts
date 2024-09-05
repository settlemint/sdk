import { Command } from "@commander-js/extra-typings";
import { customDeploymentUpdateCommand } from "./custom-deployment/update";

/**
 * Creates and returns a custom deployment command.
 * @returns {Command} A Command object for managing custom deployments.
 */
export function customDeploymentCommand() {
  const customDeployment = new Command("custom-deployment");
  customDeployment.description("Manage custom deployments");

  // Add the update subcommand
  customDeployment.addCommand(customDeploymentUpdateCommand());

  return customDeployment;
}
