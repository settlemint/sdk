import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'ipfs pause' command for the SettleMint SDK.
 * This command pauses an IPFS storage service in the SettleMint platform.
 */
export function ipfsStoragePauseCommand() {
  return getPauseCommand({
    name: "ipfs",
    type: "storage",
    subType: "ipfs",
    alias: "ip",
    envKey: "SETTLEMINT_IPFS",
    pauseFunction: async (settlemint, id) => {
      return settlemint.storage.pause(id);
    },
  });
}
