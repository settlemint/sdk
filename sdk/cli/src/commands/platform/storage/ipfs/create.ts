import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
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
    alias: "ip",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application-id <applicationId>", "Application ID")
        .action(async (name, { applicationId, provider, region, size, type, ...defaultArgs }) => {
          return baseAction(defaultArgs, async (settlemint, env) => {
            const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
            const result = await settlemint.storage.create({
              name,
              applicationId: application,
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
                  SETTLEMINT_APPLICATION: application,
                  SETTLEMINT_IPFS: result.id,
                  SETTLEMINT_IPFS_API_ENDPOINT: result?.endpoints.find((endpoint) => endpoint.id.includes("api"))
                    ?.displayValue,
                  SETTLEMINT_IPFS_PINNING_ENDPOINT: result?.endpoints.find((endpoint) =>
                    endpoint.id.includes("cluster-pinning-api"),
                  )?.displayValue,
                  SETTLEMINT_IPFS_GATEWAY_ENDPOINT: result?.endpoints.find((endpoint) =>
                    endpoint.id.includes("gateway"),
                  )?.displayValue,
                };
              },
            };
          });
        });
    },
    examples: [
      {
        description: "Create an IPFS storage and save as default",
        command: "platform create storage ipfs my-storage --accept-defaults -d",
      },
      {
        description: "Create an IPFS storage in a different application",
        command: "platform create storage ipfs my-storage --application-id app-123",
      },
    ],
  });
}
