import { getCreateCommand } from "@/commands/platform/common/create-command";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";

/**
 * Creates and returns the 'private-key' command for the SettleMint SDK.
 * This command creates a new HSM_ECDSA_P256 private key in the SettleMint platform.
 */
export function privateKeyHsmCreateCommand() {
  return getCreateCommand({
    name: "HSM-ECDSA-P256",
    type: "private key",
    subType: "HSM-ECDSA-P256",
    alias: "hsm",
    execute: (cmd, baseAction) => {
      cmd
        .option("--application <application>", "Application unique name")
        .option("--blockchain-node <blockchainNode>", "Blockchain Node unique name")
        .action(async (name, { application, blockchainNode, acceptDefaults, ...defaultArgs }) => {
          return baseAction(
            {
              ...defaultArgs,
              acceptDefaults,
            },
            async ({ settlemint, env, showSpinner, provider: _provider, region: _region }) => {
              const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
              if (!applicationUniqueName) {
                return missingApplication();
              }
              let blockchainNodeUniqueName = blockchainNode;
              if (!blockchainNodeUniqueName) {
                const blockchainNodes = await serviceSpinner("blockchain node", () =>
                  settlemint.blockchainNode.list(applicationUniqueName),
                );
                const node = await blockchainNodePrompt({
                  env,
                  nodes: blockchainNodes,
                  accept: acceptDefaults,
                  isRequired: true,
                });
                if (!node) {
                  return nothingSelectedError("blockchain node");
                }
                blockchainNodeUniqueName = node.uniqueName;
              }
              const result = await showSpinner(() =>
                settlemint.privateKey.create({
                  name,
                  applicationUniqueName,
                  privateKeyType: "HSM_ECDSA_P256",
                  blockchainNodeUniqueNames: blockchainNodeUniqueName ? [blockchainNodeUniqueName] : [],
                }),
              );
              return {
                result,
              };
            },
          );
        });
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
