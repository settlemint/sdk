import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'graph resume' command for the SettleMint SDK.
 * This command resumes a Graph middleware service in the SettleMint platform.
 */
export function graphMiddlewareResumeCommand() {
  return getResumeCommand({
    name: "graph",
    type: "middleware",
    subType: "graph",
    alias: "gr",
    envKey: "SETTLEMINT_THEGRAPH",
    resumeFunction: async (settlemint, id) => {
      return settlemint.middleware.resume(id);
    },
  });
}
