import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getMinioEndpoints } from "@/utils/get-cluster-service-endpoint";
import type { DotEnv } from "@settlemint/sdk-utils";
import { getCreateCommand } from "../../common/create-command";

/**
 * Creates and returns the 'minio' storage command for the SettleMint SDK.
 * This command creates a new MinIO storage in the SettleMint platform.
 * It requires an application ID.
 */
export function minioStorageCreateCommand() {
  return getCreateCommand({
    name: "minio",
    type: "storage",
    alias: "m",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application-id <applicationId>", "Application ID")
        .action(async (name, { applicationId, provider, region, size, type, ...defaultArgs }) => {
          return baseAction(defaultArgs, async (settlemint, env) => {
            const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
            const result = await settlemint.storage.create({
              name,
              applicationId: application,
              storageProtocol: "MINIO",
              provider,
              region,
              size,
              type,
            });
            return {
              result,
              mapDefaultEnv: (): Partial<DotEnv> => {
                return {
                  SETTLEMINT_APPLICATION: application,
                  SETTLEMINT_MINIO: result.id,
                  ...getMinioEndpoints(result),
                };
              },
            };
          });
        });
    },
    examples: [
      {
        description: "Create a MinIO storage and save as default",
        command: "platform create storage minio my-storage --accept-defaults -d",
      },
      {
        description: "Create a MinIO storage in a different application",
        command: "platform create storage minio my-storage --application-id app-123",
      },
    ],
  });
}
