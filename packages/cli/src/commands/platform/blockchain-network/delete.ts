import { getDeleteCommand } from "@/commands/platform/common/delete-command";

/**
 * Creates and returns the 'blockchain-network delete' command for the SettleMint SDK.
 * This command deletes an existing blockchain network from the SettleMint platform.
 * It takes a network ID to identify which network to delete.
 */
export function blockchainNetworkDeleteCommand() {
  return getDeleteCommand({
    type: "blockchain network",
    alias: "n",
    envKey: "SETTLEMINT_BLOCKCHAIN_NETWORK",
    deleteFunction: async (settlemint, id) => {
      return settlemint.blockchainNetwork.delete(id);
    },
  });
}
