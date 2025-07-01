import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'blockscout pause' command for the SettleMint SDK.
 * This command pauses a Blockscout insights service in the SettleMint platform.
 */
export function blockscoutPauseCommand() {
  return getPauseCommand({
    name: "blockscout",
    type: "insights",
    alias: "bs",
    envKey: "SETTLEMINT_BLOCKSCOUT",
    pauseFunction: async (settlemint, id) => {
      return settlemint.insights.pause(id);
    },
  });
}
