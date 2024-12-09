import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'smart-contract-portal restart' command for the SettleMint SDK.
 * This command restarts a Smart Contract Portal middleware service in the SettleMint platform.
 */
export function smartContractPortalRestartCommand() {
  return getRestartCommand({
    name: "smart-contract-portal",
    type: "middleware",
    subType: "smart-contract-portal",
    alias: "scp",
    envKey: "SETTLEMINT_PORTAL",
    restartFunction: async (settlemint, id) => {
      return settlemint.middleware.restart(id);
    },
  });
}
