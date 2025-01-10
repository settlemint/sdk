import { blockchainNodePrompt } from "@/commands/connect/blockchain-node.prompt";
import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { missingApplication } from "@/error/missing-config-error";
import { cancel } from "@settlemint/sdk-utils";
import isInCi from "is-in-ci";
import { getCreateCommand } from "../../common/create-command";

/**
 * Creates and returns the 'private-key' command for the SettleMint SDK.
 * This command creates a new HSM_ECDSA_P256 private key in the SettleMint platform.
 * It requires an application ID.
 */
export function privateKeyHsmCreateCommand() {
  return getCreateCommand({
    name: "HSM-ECDSA-P256",
    type: "private key",
    alias: "hd",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application <application>", "Application unique name")
        .option("--blockchain-node <blockchainNode>", "Blockchain Node unique name")
        .action(
          async (
            name,
            { application, blockchainNode, provider, region, size, type, acceptDefaults, ...defaultArgs },
          ) => {
            return baseAction(
              {
                ...defaultArgs,
                acceptDefaults,
                provider,
                region,
              },
              async (settlemint, env) => {
                const autoAccept = !!acceptDefaults || isInCi;
                const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
                if (!applicationUniqueName) {
                  return missingApplication();
                }
                let blockchainNodeUniqueName = blockchainNode;
                if (!blockchainNodeUniqueName) {
                  const blockchainNodes = await settlemint.blockchainNode.list(applicationUniqueName);
                  const node = await blockchainNodePrompt(env, blockchainNodes, autoAccept);
                  if (!node) {
                    return cancel("No blockchain node selected. Please select one to continue.");
                  }
                  blockchainNodeUniqueName = node.uniqueName;
                }
                const result = await settlemint.privateKey.create({
                  name,
                  applicationUniqueName,
                  privateKeyType: "HSM_ECDSA_P256",
                  blockchainNodeUniqueNames: blockchainNodeUniqueName ? [blockchainNodeUniqueName] : [],
                  provider,
                  region,
                  size,
                  type,
                });
                return {
                  result,
                };
              },
            );
          },
        );
    },
    examples: [
      {
        description: "Create a private key and save as default",
        command: "platform create private-key hsm-ecdsa-p256 my-key --accept-defaults -d",
      },
      {
        description: "Create a private key in a different application",
        command: "platform create private-key hsm-ecdsa-p256 my-key --application 123456789",
      },
      {
        description: "Create a private key linked to a blockchain node",
        command: "platform create private-key hsm-ecdsa-p256 my-key --blockchain-node node-123",
      },
    ],
  });
}
