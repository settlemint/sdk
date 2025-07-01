import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'custom-deployment resume' command for the SettleMint SDK.
 * This command resumes a custom deployment in the SettleMint platform.
 */
export function customDeploymentResumeCommand() {
  return getResumeCommand({
    name: "custom-deployment",
    type: "custom deployment",
    alias: "cd",
    envKey: "SETTLEMINT_CUSTOM_DEPLOYMENT",
    resumeFunction: async (settlemint, id) => {
      return settlemint.customDeployment.resume(id);
    },
  });
}
