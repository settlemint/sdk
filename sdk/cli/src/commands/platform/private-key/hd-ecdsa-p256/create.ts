import { getCreateCommand } from "@/commands/platform/common/create-command";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { getHdPrivateKeyEnv } from "@/utils/get-cluster-service-env";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'private-key' command for the SettleMint SDK.
 * This command creates a new HD_ECDSA_P256 private key in the SettleMint platform.
 */
export function privateKeyHdCreateCommand() {
  return getCreateCommand({
    name: "HD-ECDSA-P256",
    type: "private key",
    subType: "HD-ECDSA-P256",
    alias: "hd",
    execute: (cmd, baseAction) => {
      cmd
        .option("--application <application>", "Application unique name")
        .option("--blockchain-node <blockchainNode>", "Blockchain Node unique name")
        .option(
          "--trusted-forwarder-address <trustedForwarderAddress>",
          "The address of the trusted forwarder contract. Must inherit from OpenZeppelin's ERC2771Forwarder contract",
        )
        .option(
          "--trusted-forwarder-name <trustedForwarderName>",
          "The name of the trusted forwarder contract as known to OpenZeppelin's extension (e.g. 'OpenZeppelinERC2771Forwarder'). This exact name is required for the verification process",
        )
        .option(
          "--relayer-key-unique-name <relayerKeyUniqueName>",
          "Private key unique name to use for relaying meta-transactions",
        )
        .action(
          async (
            name,
            {
              application,
              blockchainNode,
              trustedForwarderAddress,
              trustedForwarderName,
              relayerKeyUniqueName,
              acceptDefaults,
              ...defaultArgs
            },
          ) => {
            return baseAction(
              {
                ...defaultArgs,
                acceptDefaults,
              },
              async ({ settlemint, env, showSpinner }) => {
                const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
                if (!applicationUniqueName) {
                  return missingApplication();
                }
                // Validate that either all trusted forwarder and relayer options are set or none are set
                if (
                  (trustedForwarderAddress || trustedForwarderName || relayerKeyUniqueName) &&
                  !(trustedForwarderAddress && trustedForwarderName && relayerKeyUniqueName)
                ) {
                  throw new Error(
                    "When using meta-transaction functionality, you must provide all three options: " +
                      "--trusted-forwarder-address, --trusted-forwarder-name, and --relayer-key-unique-name",
                  );
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
                    privateKeyType: "HD_ECDSA_P256",
                    blockchainNodeUniqueNames: blockchainNodeUniqueName ? [blockchainNodeUniqueName] : [],
                    trustedForwarderAddress,
                    trustedForwarderName,
                    relayerKeyUniqueName,
                  }),
                );
                return {
                  result,
                  mapDefaultEnv: (): Partial<DotEnv> => {
                    return {
                      SETTLEMINT_APPLICATION: applicationUniqueName,
                      SETTLEMINT_HD_PRIVATE_KEY: result.uniqueName,
                      ...getHdPrivateKeyEnv(result),
                    };
                  },
                };
              },
            );
          },
        );
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
