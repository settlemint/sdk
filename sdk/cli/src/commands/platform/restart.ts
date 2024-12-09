import { Command } from "@commander-js/extra-typings";
import { blockchainNetworkRestartCommand } from "./blockchain-network/restart";
import { customDeploymentRestartCommand } from "./custom-deployments/restart";
import { insightsRestartCommand } from "./insights/restart";
import { integrationToolRestartCommand } from "./integration-tools/restart";
import { middlewareRestartCommand } from "./middleware/restart";
import { smartContractPortalRestartCommand } from "./middleware/smart-contract-portal/restart";
import { privateKeyRestartCommand } from "./private-key/restart";
import { storageRestartCommand } from "./storage/restart";

/**
 * Creates and returns the 'restart' command group for the SettleMint SDK.
 * This command group contains subcommands for restarting various services in the SettleMint platform.
 */
export function restartCommand() {
  const cmd = new Command("restart")
    .description("Restart a resource in the SettleMint platform")
    .addCommand(blockchainNetworkRestartCommand())
    .addCommand(customDeploymentRestartCommand())
    .addCommand(insightsRestartCommand())
    .addCommand(integrationToolRestartCommand())
    .addCommand(middlewareRestartCommand())
    .addCommand(privateKeyRestartCommand())
    .addCommand(smartContractPortalRestartCommand())
    .addCommand(storageRestartCommand());

  return cmd;
}
