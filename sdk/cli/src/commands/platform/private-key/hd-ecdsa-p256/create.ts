import type { DotEnv } from "@settlemint/sdk-utils";
import { addClusterServiceProviderAndRegionsArgs } from "../../common/cluster-service.args";
import { getCreateCommand } from "../../common/create-command";

/**
 * Creates and returns the 'private-key' command for the SettleMint SDK.
 * This command creates a new HD_ECDSA_P256 private key in the SettleMint platform.
 * It requires an application ID.
 */
export function privateKeyHdCreateCommand() {
  return getCreateCommand({
    name: "HD-ECDSA-P256",
    type: "private key",
    alias: "hd",
    execute: (cmd, baseAction) => {
      addClusterServiceProviderAndRegionsArgs(cmd)
        .option("--application-id <applicationId>", "Application ID")
        .action(async (name, { applicationId, provider, region, ...defaultArgs }) => {
          return baseAction(defaultArgs, async (settlemint, env) => {
            const result = await settlemint.privateKey.create({
              name,
              applicationId: applicationId ?? env.SETTLEMINT_APPLICATION!,
              privateKeyType: "HD_ECDSA_P256",
              provider,
              region,
            });
            return {
              result,
              mapDefaultEnv: (): Partial<DotEnv> => {
                return {
                  SETTLEMINT_HD_PRIVATE_KEY: result.id,
                };
              },
            };
          });
        });
    },
    examples: [
      {
        description: "Create a private key using default options",
        command: "platform private-key create my-key --accept-defaults --default",
      },
      {
        description: "Create a private key and save as default",
        command: "platform private-key create my-key --application-id 123456789 -d",
      },
    ],
  });
}
