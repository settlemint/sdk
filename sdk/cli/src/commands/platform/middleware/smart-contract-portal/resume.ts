import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'smart-contract-portal resume' command for the SettleMint SDK.
 * This command resumes a Smart Contract Portal middleware service in the SettleMint platform.
 */
export function smartContractPortalMiddlewareResumeCommand() {
  return getResumeCommand({
    name: "smart-contract-portal",
    type: "middleware",
    alias: "scp",
    envKey: "SETTLEMINT_PORTAL",
    resumeFunction: async (settlemint, id) => {
      return settlemint.middleware.resume(id);
    },
  });
}
