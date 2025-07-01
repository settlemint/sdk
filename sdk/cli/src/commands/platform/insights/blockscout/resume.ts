import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'blockscout resume' command for the SettleMint SDK.
 * This command resumes a Blockscout insights service in the SettleMint platform.
 */
export function blockscoutResumeCommand() {
  return getResumeCommand({
    name: "blockscout",
    type: "insights",
    alias: "bs",
    envKey: "SETTLEMINT_BLOCKSCOUT",
    resumeFunction: async (settlemint, id) => {
      return settlemint.insights.resume(id);
    },
  });
}
