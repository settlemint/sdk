import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'blockscout restart' command for the SettleMint SDK.
 * This command restarts a Blockscout instance in the SettleMint platform.
 */
export function blockscoutRestartCommand() {
  return getRestartCommand({
    name: "blockscout",
    type: "insights",
    subType: "blockscout",
    alias: "bs",
    envKey: "SETTLEMINT_BLOCKSCOUT",
    restartFunction: async (settlemint, id) => {
      return settlemint.insights.restart(id);
    },
  });
}
