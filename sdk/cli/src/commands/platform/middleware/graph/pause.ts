import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'graph pause' command for the SettleMint SDK.
 * This command pauses a Graph middleware in the SettleMint platform.
 */
export function graphMiddlewarePauseCommand() {
  return getPauseCommand({
    name: "graph",
    type: "middleware",
    alias: "gr",
    envKey: "SETTLEMINT_THEGRAPH",
    pauseFunction: async (settlemint, id) => {
      return settlemint.middleware.pause(id);
    },
  });
}
