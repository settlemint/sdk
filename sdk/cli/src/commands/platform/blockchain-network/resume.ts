import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'blockchain-network resume' command for the SettleMint SDK.
 * This command resumes a blockchain network in the SettleMint platform.
 */
export function blockchainNetworkResumeCommand() {
  return getResumeCommand({
    name: "blockchain-network",
    type: "blockchain network",
    alias: "bn",
    envKey: "SETTLEMINT_BLOCKCHAIN_NETWORK",
    resumeFunction: async (settlemint, id) => {
      return settlemint.blockchainNetwork.resume(id);
    },
  });
}
