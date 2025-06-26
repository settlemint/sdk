import { Command } from "@commander-js/extra-typings";
import { blockchainNetworkResumeCommand } from "./blockchain-network/resume";
import { blockchainNodeResumeCommand } from "./blockchain-node/resume";
import { customDeploymentResumeCommand } from "./custom-deployments/resume";
import { blockscoutResumeCommand } from "./insights/blockscout/resume";
import { hasuraResumeCommand } from "./integration-tools/hasura/resume";
import { evmLoadBalancerResumeCommand } from "./load-balancer/evm/resume";
import { graphMiddlewareResumeCommand } from "./middleware/graph/resume";
import { smartContractPortalMiddlewareResumeCommand } from "./middleware/smart-contract-portal/resume";
import { accessibleEcdsaP256PrivateKeyResumeCommand } from "./private-key/accessible-ecdsa-p256/resume";
import { hdEcdsaP256PrivateKeyResumeCommand } from "./private-key/hd-ecdsa-p256/resume";
import { ipfsStorageResumeCommand } from "./storage/ipfs/resume";
import { minioStorageResumeCommand } from "./storage/minio/resume";

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
    .addCommand(blockscoutResumeCommand())
    .addCommand(hasuraResumeCommand())
    .addCommand(evmLoadBalancerResumeCommand())
    .addCommand(graphMiddlewareResumeCommand())
    .addCommand(smartContractPortalMiddlewareResumeCommand())
    .addCommand(accessibleEcdsaP256PrivateKeyResumeCommand())
    .addCommand(hdEcdsaP256PrivateKeyResumeCommand())
    .addCommand(ipfsStorageResumeCommand())
    .addCommand(minioStorageResumeCommand());

  return cmd;
}
