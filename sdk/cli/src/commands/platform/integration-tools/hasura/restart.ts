import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'hasura restart' command for the SettleMint SDK.
 * This command restarts a Hasura instance in the SettleMint platform.
 */
export function hasuraRestartCommand() {
  return getRestartCommand({
    name: "hasura",
    type: "integration tool",
    alias: "ha",
    envKey: "SETTLEMINT_HASURA",
    restartFunction: async (settlemint, uniqueName) => {
      return settlemint.integrationTool.restart(uniqueName);
    },
  });
}
