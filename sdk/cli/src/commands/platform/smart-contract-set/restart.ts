import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'smart-contract-set restart' command for the SettleMint SDK.
 * This command restarts a Smart Contract Set in the SettleMint platform.
 */
export function smartContractSetRestartCommand() {
  return getRestartCommand({
    name: "smart-contract-set",
    type: "smart contract set",
    alias: "scs",
    envKey: "SETTLEMINT_SMART_CONTRACT_SET",
    restartFunction: async (settlemint, id) => {
      return settlemint.smartContractSet.restart(id);
    },
  });
}
