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
        .option("--application <application>", "Application unique name")
        .option("--blockchain-node <blockchainNode>", "Blockchain Node unique name")
        .action(async (name, { application, blockchainNode, provider, region, size, type, ...defaultArgs }) => {
          return baseAction(
            {
              ...defaultArgs,
              provider,
              region,
            },
            async (settlemint, env) => {
              const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION!;
              const blockchainNodeUniqueName = blockchainNode ?? env.SETTLEMINT_BLOCKCHAIN_NODE!;
              const result = await settlemint.privateKey.create({
                name,
                applicationUniqueName,
                privateKeyType: "HD_ECDSA_P256",
                blockchainNodeUniqueNames: blockchainNodeUniqueName ? [blockchainNodeUniqueName] : [],
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
                    SETTLEMINT_HD_PRIVATE_KEY: result.uniqueName,
                  };
                },
              };
            },
          );
        });
    },
    examples: [
      {
        description: "Create a private key and save as default",
        command: "platform create private-key hd-ecdsa-p256 my-key --accept-defaults -d",
      },
      {
        description: "Create a private key in a different application",
        command: "platform create private-key hd-ecdsa-p256 my-key --application my-app",
      },
      {
        description: "Create a private key linked to a blockchain node",
        command: "platform create private-key hd-ecdsa-p256 my-key --blockchain-node node-123",
      },
    ],
  });
}
