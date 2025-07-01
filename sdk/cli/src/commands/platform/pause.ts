import { Command } from "@commander-js/extra-typings";
import { blockchainNetworkPauseCommand } from "./blockchain-network/pause";
import { blockchainNodePauseCommand } from "./blockchain-node/pause";
import { customDeploymentPauseCommand } from "./custom-deployments/pause";
import { blockscoutPauseCommand } from "./insights/blockscout/pause";
import { hasuraPauseCommand } from "./integration-tools/hasura/pause";
import { evmLoadBalancerPauseCommand } from "./load-balancer/evm/pause";
import { graphMiddlewarePauseCommand } from "./middleware/graph/pause";
import { smartContractPortalMiddlewarePauseCommand } from "./middleware/smart-contract-portal/pause";
import { accessibleEcdsaP256PrivateKeyPauseCommand } from "./private-key/accessible-ecdsa-p256/pause";
import { hdEcdsaP256PrivateKeyPauseCommand } from "./private-key/hd-ecdsa-p256/pause";
import { ipfsStoragePauseCommand } from "./storage/ipfs/pause";
import { minioStoragePauseCommand } from "./storage/minio/pause";

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
    .addCommand(blockscoutPauseCommand())
    .addCommand(hasuraPauseCommand())
    .addCommand(evmLoadBalancerPauseCommand())
    .addCommand(graphMiddlewarePauseCommand())
    .addCommand(smartContractPortalMiddlewarePauseCommand())
    .addCommand(accessibleEcdsaP256PrivateKeyPauseCommand())
    .addCommand(hdEcdsaP256PrivateKeyPauseCommand())
    .addCommand(ipfsStoragePauseCommand())
    .addCommand(minioStoragePauseCommand());
  return cmd;
}
