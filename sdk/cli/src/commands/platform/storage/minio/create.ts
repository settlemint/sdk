import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { missingApplication } from "@/error/missing-config-error";
import { getMinioEndpoints } from "@/utils/get-cluster-service-endpoint";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
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
    subType: "MinIO",
    alias: "m",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application <application>", "Application unique name")
        .action(async (name, { application, provider, region, size, type, ...defaultArgs }) => {
          return baseAction(
            {
              ...defaultArgs,
              provider,
              region,
            },
            async (settlemint, env, showSpinner) => {
              const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
              if (!applicationUniqueName) {
                return missingApplication();
              }
              const result = await showSpinner(() =>
                settlemint.storage.create({
                  name,
                  applicationUniqueName,
                  storageProtocol: "MINIO",
                  provider,
                  region,
                  size,
                  type,
                }),
              );
              return {
                result,
                mapDefaultEnv: (): Partial<DotEnv> => {
                  return {
                    SETTLEMINT_APPLICATION: applicationUniqueName,
                    SETTLEMINT_MINIO: result.uniqueName,
                    ...getMinioEndpoints(result),
                  };
                },
              };
            },
          );
        });
    },
    examples: [
      {
        description: "Create a MinIO storage and save as default",
        command: "platform create storage minio my-storage --accept-defaults -d",
      },
      {
        description: "Create a MinIO storage in a different application",
        command: "platform create storage minio my-storage --application app-123",
      },
    ],
  });
}
