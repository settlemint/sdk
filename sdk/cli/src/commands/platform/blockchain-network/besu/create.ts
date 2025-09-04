import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { missingApplication } from "@/error/missing-config-error";
import { getBlockchainNetworkChainId } from "@/utils/blockchain-network";
import { getBlockchainNodeEnv, getBlockchainNodeOrLoadBalancerEnv } from "@/utils/get-cluster-service-env";
import { parseNumber } from "@/utils/parse-number";

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
    subType: "Besu",
    alias: "b",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option(
          "--app, --application <application>",
          "The unique name of the application to create the network in (defaults to application from env)",
        )
        .requiredOption("--node-name <name>", "Name of the node")
        .option("--chain-id <chainId>", "The chain ID for the network", parseNumber)
        .option("--contract-size-limit <limit>", "Maximum contract size limit", parseNumber)
        .option("--evm-stack-size <size>", "EVM stack size", parseNumber)
        .option("--gas-limit <limit>", "Block gas limit")
        .option("--gas-price <price>", "Gas price in wei", parseNumber)
        .option("--seconds-per-block <seconds>", "Block time in seconds", parseNumber)
        .option("--includePredeployedContracts", "Include predeployed contracts in the genesis file")
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
              includePredeployedContracts,
              ...defaultArgs
            },
          ) => {
            return baseAction(
              {
                ...defaultArgs,
                provider,
                region,
              },
              async ({ settlemint, env, showSpinner, provider, region }) => {
                const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
                if (!applicationUniqueName) {
                  return missingApplication();
                }
                const result = await showSpinner(() =>
                  settlemint.blockchainNetwork.create({
                    name,
                    applicationUniqueName,
                    nodeName: nodeName,
                    consensusAlgorithm: "BESU_QBFT",
                    chainId,
                    contractSizeLimit,
                    evmStackSize,
                    gasLimit,
                    gasPrice,
                    provider,
                    region,
                    secondsPerBlock,
                    size,
                    type,
                    includePredeployedContracts,
                  }),
                );

                // Give it some time to kick off the creation of the first blockchain node
                await new Promise((resolve) => setTimeout(resolve, 1_000));
                const blockchainNetworkWithNodes = await showSpinner(() =>
                  settlemint.blockchainNetwork.read(result.uniqueName),
                );

                const blockchainNode =
                  blockchainNetworkWithNodes.blockchainNodes.find((item) => item.name === nodeName) ??
                  blockchainNetworkWithNodes.blockchainNodes[0];

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
                      SETTLEMINT_APPLICATION: applicationUniqueName,
                      SETTLEMINT_BLOCKCHAIN_NETWORK: result.uniqueName,
                      SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID: getBlockchainNetworkChainId(result),
                      SETTLEMINT_BLOCKCHAIN_NODE: blockchainNode?.uniqueName,
                      ...getBlockchainNodeEnv(blockchainNode),
                      SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER: undefined,
                      ...getBlockchainNodeOrLoadBalancerEnv(undefined),
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
