import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { parseNumber } from "@/utils/parse-number";
import type { DotEnv } from "@settlemint/sdk-utils";
import { getCreateCommand } from "../../common/create-command";

/**
 * Creates and returns the 'blockchain-network besu' command for the SettleMint SDK.
 * This command creates a new Besu blockchain network in a specified application.
 *
 * @returns A configured Commander command for creating a Besu network
 */
export function blockchainNetworkBesuCreateCommand() {
  return getCreateCommand({
    name: "besu",
    type: "blockchain network",
    alias: "b",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option(
          "-a, --application <uniqueName>",
          "The unique name of the application to create the network in (defaults to application from env)",
        )
        .requiredOption("--node-name <name>", "Name of the node")
        .option("--chain-id <chainId>", "The chain ID for the network", parseNumber)
        .option("--contract-size-limit <limit>", "Maximum contract size limit", parseNumber)
        .option("--evm-stack-size <size>", "EVM stack size", parseNumber)
        .option("--gas-limit <limit>", "Block gas limit")
        .option("--gas-price <price>", "Gas price in wei", parseNumber)
        .option("--seconds-per-block <seconds>", "Block time in seconds", parseNumber)
        .action(
          async (
            name,
            {
              application,
              chainId,
              contractSizeLimit,
              evmStackSize,
              gasLimit,
              gasPrice,
              nodeName,
              provider,
              region,
              secondsPerBlock,
              size,
              type,
              ...defaultArgs
            },
          ) => {
            return baseAction(defaultArgs, async (settlemint, env) => {
              const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION!;
              const result = await settlemint.blockchainNetwork.create({
                name,
                applicationUniqueName,
                nodeName: nodeName,
                consensusAlgorithm: "BESU_QBFT",
                chainId,
                contractSizeLimit,
                evmStackSize,
                gasLimit,
                gasPrice,
                provider: provider,
                region: region,
                secondsPerBlock,
                size,
                type,
              });

              const blockchainNode =
                result.blockchainNodes.find((item) => item.name === nodeName) ?? result.blockchainNodes[0];

              return {
                result,
                waitFor: blockchainNode
                  ? {
                      resourceType: "blockchain node",
                      ...blockchainNode,
                    }
                  : undefined,
                mapDefaultEnv: (): Partial<DotEnv> => {
                  return {
                    SETTLEMINT_APPLICATION: application,
                    SETTLEMINT_BLOCKCHAIN_NETWORK: result.uniqueName,
                    SETTLEMINT_BLOCKCHAIN_NODE: blockchainNode?.uniqueName,
                  };
                },
              };
            });
          },
        );
    },
    examples: [
      {
        description: "Create a Besu blockchain network and save as default",
        command: "platform create blockchain-network besu my-network --node-name validator-1 --accept-defaults -d",
      },
      {
        description: "Create a Besu blockchain network in a different application",
        command:
          "platform create blockchain-network besu my-network --application app-123 --node-name validator-1 --chain-id 12345 --gas-limit 10000000 --seconds-per-block 5",
      },
    ],
  });
}
