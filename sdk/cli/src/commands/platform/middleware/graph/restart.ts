import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'graph restart' command for the SettleMint SDK.
 * This command restarts a Graph middleware service in the SettleMint platform.
 */
export function graphRestartCommand() {
  return getRestartCommand({
    name: "graph",
    type: "middleware",
    alias: "gr",
    envKey: "SETTLEMINT_THEGRAPH",
    restartFunction: async (settlemint, id) => {
      return settlemint.middleware.restart(id);
    },
  });
}
