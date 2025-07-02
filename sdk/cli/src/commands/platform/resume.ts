import { Command } from "@commander-js/extra-typings";
import { blockchainNetworkResumeCommand } from "./blockchain-network/resume";
import { blockchainNodeResumeCommand } from "./blockchain-node/resume";
import { customDeploymentResumeCommand } from "./custom-deployments/resume";
import { insightsResumeCommand } from "./insights/resume";
import { integrationToolResumeCommand } from "./integration-tools/resume";
import { loadBalancerResumeCommand } from "./load-balancer/resume";
import { middlewareResumeCommand } from "./middleware/resume";
import { privateKeyResumeCommand } from "./private-key/resume";
import { storageResumeCommand } from "./storage/resume";

/**
 * Creates and returns the 'resume' command group for the SettleMint SDK.
 * This command group contains subcommands for resuming various services in the SettleMint platform.
 */
export function resumeCommand() {
  const cmd = new Command("resume")
    .description("Resume a resource in the SettleMint platform")
    .addCommand(blockchainNodeResumeCommand())
    .addCommand(blockchainNetworkResumeCommand())
    .addCommand(customDeploymentResumeCommand())
    .addCommand(insightsResumeCommand())
    .addCommand(integrationToolResumeCommand())
    .addCommand(loadBalancerResumeCommand())
    .addCommand(middlewareResumeCommand())
    .addCommand(privateKeyResumeCommand())
    .addCommand(storageResumeCommand());

  return cmd;
}
