import { getRestartCommand } from "@/commands/platform/common/restart-command";

/**
 * Creates and returns the 'minio restart' command for the SettleMint SDK.
 * This command restarts a MinIO storage service in the SettleMint platform.
 */
export function minioRestartCommand() {
  return getRestartCommand({
    name: "minio",
    type: "storage",
    alias: "m",
    envKey: "SETTLEMINT_MINIO",
    restartFunction: async (settlemint, id) => {
      return settlemint.storage.restart(id);
    },
  });
}
