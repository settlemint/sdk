import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'blockchain-network restart' command for the SettleMint SDK.
 * This command restarts a blockchain network in the SettleMint platform.
 */
export function blockchainNetworkRestartCommand() {
  return getRestartCommand({
    name: "blockchain-network",
    type: "blockchain network",
    alias: "bn",
    envKey: "SETTLEMINT_BLOCKCHAIN_NETWORK",
    restartFunction: async (settlemint, uniqueName) => {
      return settlemint.blockchainNetwork.restart(uniqueName);
    },
  });
}
