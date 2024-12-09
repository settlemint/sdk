import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'ipfs restart' command for the SettleMint SDK.
 * This command restarts an IPFS storage service in the SettleMint platform.
 */
export function ipfsRestartCommand() {
  return getRestartCommand({
    name: "ipfs",
    type: "storage",
    alias: "ip",
    envKey: "SETTLEMINT_IPFS",
    restartFunction: async (settlemint, id) => {
      return settlemint.storage.restart(id);
    },
  });
}
