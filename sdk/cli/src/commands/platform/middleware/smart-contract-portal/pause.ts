import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'smart-contract-portal pause' command for the SettleMint SDK.
 * This command pauses a Smart Contract Portal middleware in the SettleMint platform.
 */
export function smartContractPortalMiddlewarePauseCommand() {
  return getPauseCommand({
    name: "smart-contract-portal",
    type: "middleware",
    alias: "scp",
    envKey: "SETTLEMINT_PORTAL",
    pauseFunction: async (settlemint, id) => {
      return settlemint.middleware.pause(id);
    },
  });
}
