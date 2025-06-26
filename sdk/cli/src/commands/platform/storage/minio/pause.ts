import { getPauseCommand } from "@/commands/platform/common/pause-command";

/**
 * Creates and returns the 'minio pause' command for the SettleMint SDK.
 * This command pauses a MinIO storage service in the SettleMint platform.
 */
export function minioStoragePauseCommand() {
  return getPauseCommand({
    name: "minio",
    type: "storage",
    subType: "minio",
    alias: "mi",
    envKey: "SETTLEMINT_MINIO",
    pauseFunction: async (settlemint, id) => {
      return settlemint.storage.pause(id);
    },
  });
}
