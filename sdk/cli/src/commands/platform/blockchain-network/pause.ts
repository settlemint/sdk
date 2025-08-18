import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'blockchain-network pause' command for the SettleMint SDK.
 * This command pauses a blockchain network in the SettleMint platform.
 */
export function blockchainNetworkPauseCommand() {
  return getPauseCommand({
    name: "blockchain-network",
    type: "blockchain network",
    alias: "bnw",
    envKey: "SETTLEMINT_BLOCKCHAIN_NETWORK",
    pauseFunction: async (settlemint, id) => {
      return settlemint.blockchainNetwork.pause(id);
    },
  });
}
