import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { Option } from "@commander-js/extra-typings";
import type { DotEnv } from "@settlemint/sdk-utils";
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
              // TODO: use enum from graphql api schema
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
              const result = await settlemint.smartContractSet.create({
                name,
                applicationId: applicationId ?? env.SETTLEMINT_APPLICATION!,
                blockchainNodeId: blockchainNodeId ?? env.SETTLEMINT_BLOCKCHAIN_NODE!,
                provider,
                region,
                size,
                useCase,
                userId,
              });
              return {
                result,
                mapDefaultEnv: (): Partial<DotEnv> => {
                  return {
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
