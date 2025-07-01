import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'hasura resume' command for the SettleMint SDK.
 * This command resumes a Hasura integration tool in the SettleMint platform.
 */
export function hasuraResumeCommand() {
  return getResumeCommand({
    name: "hasura",
    type: "integration tool",
    alias: "ha",
    envKey: "SETTLEMINT_HASURA",
    resumeFunction: async (settlemint, id) => {
      return settlemint.integrationTool.resume(id);
    },
  });
}
