import { Command } from "@commander-js/extra-typings";
import { blockchainNetworkPauseCommand } from "./blockchain-network/pause";
import { blockchainNodePauseCommand } from "./blockchain-node/pause";
import { customDeploymentPauseCommand } from "./custom-deployments/pause";
import { insightsPauseCommand } from "./insights/pause";
import { integrationToolPauseCommand } from "./integration-tools/pause";
import { loadBalancerPauseCommand } from "./load-balancer/pause";
import { middlewarePauseCommand } from "./middleware/pause";
import { privateKeyPauseCommand } from "./private-key/pause";
import { storagePauseCommand } from "./storage/pause";

/**
 * Creates and returns the 'pause' command group for the SettleMint SDK.
 * This command group contains subcommands for pausing various services in the SettleMint platform.
 */
export function pauseCommand() {
  const cmd = new Command("pause")
    .description("Pause a resource in the SettleMint platform")
    .addCommand(blockchainNodePauseCommand())
    .addCommand(blockchainNetworkPauseCommand())
    .addCommand(customDeploymentPauseCommand())
    .addCommand(insightsPauseCommand())
    .addCommand(integrationToolPauseCommand())
    .addCommand(loadBalancerPauseCommand())
    .addCommand(middlewarePauseCommand())
    .addCommand(privateKeyPauseCommand())
    .addCommand(storagePauseCommand());
  return cmd;
}
