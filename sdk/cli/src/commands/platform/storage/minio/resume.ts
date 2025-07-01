import { getResumeCommand } from "@/commands/platform/common/resume-command";

/**
 * Creates and returns the 'minio resume' command for the SettleMint SDK.
 * This command resumes a MinIO storage service in the SettleMint platform.
 */
export function minioStorageResumeCommand() {
  return getResumeCommand({
    name: "minio",
    type: "storage",
    subType: "minio",
    alias: "m",
    envKey: "SETTLEMINT_MINIO",
    resumeFunction: async (settlemint, id) => {
      return settlemint.storage.resume(id);
    },
  });
}
