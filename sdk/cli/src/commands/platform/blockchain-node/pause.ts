import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'blockchain-node pause' command for the SettleMint SDK.
 * This command pauses a blockchain node in the SettleMint platform.
 */
export function blockchainNodePauseCommand() {
  return getPauseCommand({
    name: "blockchain-node",
    type: "blockchain node",
    alias: "bn",
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
    pauseFunction: async (settlemint, id) => {
      return settlemint.blockchainNode.pause(id);
    },
  });
}
