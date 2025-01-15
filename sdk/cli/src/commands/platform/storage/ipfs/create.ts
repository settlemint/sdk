import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { missingApplication } from "@/error/missing-config-error";
import { getIpfsEndpoints } from "@/utils/get-cluster-service-endpoint";
import type { DotEnv } from "@settlemint/sdk-utils";
import { getCreateCommand } from "../../common/create-command";

/**
 * Creates and returns the 'ipfs' storage command for the SettleMint SDK.
 * This command creates a new IPFS storage in the SettleMint platform.
 * It requires an application ID.
 */
export function ipfsStorageCreateCommand() {
  return getCreateCommand({
    name: "ipfs",
    type: "storage",
    subType: "IPFS",
    alias: "ip",
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
            async (settlemint, env) => {
              const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
              if (!applicationUniqueName) {
                return missingApplication();
              }
              const result = await settlemint.storage.create({
                name,
                applicationUniqueName,
                storageProtocol: "IPFS",
                provider,
                region,
                size,
                type,
              });
              return {
                result,
                mapDefaultEnv: (): Partial<DotEnv> => {
                  return {
                    SETTLEMINT_APPLICATION: applicationUniqueName,
                    SETTLEMINT_IPFS: result.uniqueName,
                    ...getIpfsEndpoints(result),
                  };
                },
              };
            },
          );
        });
    },
    examples: [
      {
        description: "Create an IPFS storage and save as default",
        command: "platform create storage ipfs my-storage --accept-defaults -d",
      },
      {
        description: "Create an IPFS storage in a different application",
        command: "platform create storage ipfs my-storage --application app-123",
      },
    ],
  });
}
