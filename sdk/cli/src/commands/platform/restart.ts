import { Command } from "@commander-js/extra-typings";
import { blockchainNetworkRestartCommand } from "./blockchain-network/restart";
import { blockchainNodeRestartCommand } from "./blockchain-node/restart";
import { customDeploymentRestartCommand } from "./custom-deployments/restart";
import { insightsRestartCommand } from "./insights/restart";
import { integrationToolRestartCommand } from "./integration-tools/restart";
import { loadBalancerRestartCommand } from "./load-balancer/restart";
import { middlewareRestartCommand } from "./middleware/restart";
import { storageRestartCommand } from "./storage/restart";

/**
 * Creates and returns the 'restart' command group for the SettleMint SDK.
 * This command group contains subcommands for restarting various services in the SettleMint platform.
 */
export function restartCommand() {
  const cmd = new Command("restart")
    .description("Restart a resource in the SettleMint platform")
    .addCommand(blockchainNetworkRestartCommand())
    .addCommand(blockchainNodeRestartCommand())
    .addCommand(customDeploymentRestartCommand())
    .addCommand(insightsRestartCommand())
    .addCommand(integrationToolRestartCommand())
    .addCommand(loadBalancerRestartCommand())
    .addCommand(middlewareRestartCommand())
    .addCommand(storageRestartCommand());

  return cmd;
}
