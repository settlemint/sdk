import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import type { DotEnv } from "@settlemint/sdk-utils";
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
      addClusterServiceArgs(cmd)
        .option("--application-id <applicationId>", "Application ID")
        .action(async (name, { applicationId, provider, region, size, type, ...defaultArgs }) => {
          return baseAction(defaultArgs, async (settlemint, env) => {
            const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
            const result = await settlemint.privateKey.create({
              name,
              applicationId: application,
              privateKeyType: "HD_ECDSA_P256",
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
                  SETTLEMINT_HD_PRIVATE_KEY: result.uniqueName,
                };
              },
            };
          });
        });
    },
    examples: [
      {
        description: "Create a private key and save as default",
        command: "platform create private-key hd-ecdsa-p256 my-key --accept-defaults -d",
      },
      {
        description: "Create a private key in a different application",
        command: "platform create private-key hd-ecdsa-p256 my-key --application-id 123456789",
      },
    ],
  });
}
