import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'ipfs resume' command for the SettleMint SDK.
 * This command resumes an IPFS storage service in the SettleMint platform.
 */
export function ipfsStorageResumeCommand() {
  return getResumeCommand({
    name: "ipfs",
    type: "storage",
    alias: "ip",
    envKey: "SETTLEMINT_IPFS",
    resumeFunction: async (settlemint, id) => {
      return settlemint.storage.resume(id);
    },
  });
}
