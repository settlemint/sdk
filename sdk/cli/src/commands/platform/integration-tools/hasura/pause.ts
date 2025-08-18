import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'hasura pause' command for the SettleMint SDK.
 * This command pauses a Hasura integration tool in the SettleMint platform.
 */
export function hasuraPauseCommand() {
  return getPauseCommand({
    name: "hasura",
    type: "integration tool",
    alias: "ha",
    envKey: "SETTLEMINT_HASURA",
    pauseFunction: async (settlemint, id) => {
      return settlemint.integrationTool.pause(id);
    },
  });
}
