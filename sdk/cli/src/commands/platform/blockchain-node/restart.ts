import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'blockchain-node restart' command for the SettleMint SDK.
 * This command restarts a blockchain node in the SettleMint platform.
 */
export function blockchainNodeRestartCommand() {
  return getRestartCommand({
    name: "blockchain-node",
    type: "blockchain node",
    alias: "bn",
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
    restartFunction: async (settlemint, id) => {
      return settlemint.blockchainNode.restart(id);
    },
  });
}
