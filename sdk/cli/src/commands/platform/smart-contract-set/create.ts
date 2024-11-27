import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { Option } from "@commander-js/extra-typings";
import { getCreateCommand } from "../common/create-command";

/**
 * Creates and returns the 'smart-contract-set' command for the SettleMint SDK.
 * This command creates a new smart contract set in the SettleMint platform.
 * It requires an application ID, blockchain node ID, use case, and user ID.
 */
export function smartContractSetCreateCommand() {
  return getCreateCommand({
    name: "smart-contract-set",
    type: "smart contract set",
    alias: "scs",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application-id <applicationId>", "Application ID")
        .option("--blockchain-node-id <blockchainNodeId>", "Blockchain Node ID")
        .addOption(
          new Option("--use-case <useCase>", "Use case for the smart contract set")
            .choices([
              "solidity-empty",
              "solidity-token-erc20",
              "solidity-token-erc1155",
              "solidity-token-erc20-metatx",
              "solidity-supplychain",
              "chaincode-ts-empty",
              "chaincode-ts-empty-pdc",
              "chaincode-go-empty",
              "solidity-statemachine",
              "solidity-token-erc20-crowdsale",
              "solidity-token-erc721",
              "solidity-token-erc721a",
              "solidity-token-erc721-generative-art",
              "solidity-token-soulbound",
              "solidity-diamond-bond",
              "solidity-attestation-service",
              "solidity-zeto",
              "solidity-starterkit",
            ])
            .makeOptionMandatory(),
        )
        .option("--user-id <userId>", "User ID")
        .action(
          async (
            name,
            { applicationId, blockchainNodeId, provider, region, size, type, useCase, userId, ...defaultArgs },
          ) => {
            return baseAction(defaultArgs, async (settlemint, env) => {
              const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
              const blockchainNode = blockchainNodeId ?? env.SETTLEMINT_BLOCKCHAIN_NODE!;
              const result = await settlemint.smartContractSet.create({
                name,
                applicationId: application,
                blockchainNodeId: blockchainNode,
                provider,
                region,
                size,
                type,
                useCase,
                userId,
              });
              return {
                result,
                mapDefaultEnv: async () => {
                  const blockchainNetwork = blockchainNodeId
                    ? (await settlemint.blockchainNode.read(blockchainNodeId)).blockchainNetwork.id
                    : env.SETTLEMINT_BLOCKCHAIN_NETWORK!;
                  return {
                    SETTLEMINT_APPLICATION: application,
                    SETTLEMINT_BLOCKCHAIN_NETWORK: blockchainNetwork,
                    SETTLEMINT_BLOCKCHAIN_NODE: blockchainNode,
                    SETTLEMINT_SMART_CONTRACT_SET: result.id,
                  };
                },
              };
            });
          },
        );
    },
    examples: [
      {
        description: "Create a smart contract set using default options",
        command: "platform create smart-contract-set my-contracts --use-case nft --accept-defaults --default",
      },
      {
        description: "Create a smart contract set and save as default",
        command:
          "platform create smart-contract-set my-contracts --application-id 123456789 --blockchain-node-id node-123 --use-case nft --user-id user-123 -d",
      },
    ],
  });
}
