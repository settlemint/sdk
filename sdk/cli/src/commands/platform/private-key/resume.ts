import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'private-key resume' command for the SettleMint SDK.
 * This command resumes a private key service in the SettleMint platform.
 */
export function privateKeyResumeCommand() {
  return getResumeCommand({
    name: "private-key",
    type: "private key",
    alias: "pk",
    envKey: "SETTLEMINT_ACCESSIBLE_PRIVATE_KEY",
    resumeFunction: async (settlemint, id) => {
      return settlemint.privateKey.resume(id);
    },
  });
}
