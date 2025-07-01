import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'blockchain-node resume' command for the SettleMint SDK.
 * This command resumes a blockchain node in the SettleMint platform.
 */
export function blockchainNodeResumeCommand() {
  return getResumeCommand({
    name: "blockchain-node",
    type: "blockchain node",
    alias: "bn",
    envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
    resumeFunction: async (settlemint, id) => {
      return settlemint.blockchainNode.resume(id);
    },
  });
}
