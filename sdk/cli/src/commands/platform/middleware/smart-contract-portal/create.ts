import { basename } from "node:path";
import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { getPortalEndpoints } from "@/utils/get-cluster-service-endpoint";
import { Option } from "@commander-js/extra-typings";
import type { DotEnv } from "@settlemint/sdk-utils";

/**
 * Creates and returns the 'smart-contract-portal' middleware command for the SettleMint SDK.
 * This command creates a new smart contract portal middleware in the SettleMint platform.
 * It requires an application ID and smart contract set ID.
 */
export function smartContractPortalMiddlewareCreateCommand() {
  return getCreateCommand({
    name: "smart-contract-portal",
    type: "middleware",
    alias: "scp",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application-id <applicationId>", "Application ID")
        .option("--load-balancer-id <loadBalancerId>", "Load Balancer ID (mutually exclusive with blockchain-node-id)")
        .option(
          "--blockchain-node-id <blockchainNodeId>",
          "Blockchain Node ID (mutually exclusive with load-balancer-id)",
        )
        .option("--abis <abis...>", "Path to abi file(s)")
        .addOption(
          new Option("--include-predeployed-abis <includePredeployedAbis...>", "Include pre-deployed abis").choices([
            "StarterKitERC20Registry",
            "StarterKitERC20Factory",
            "StarterKitERC20",
            "StarterKitERC20DexFactory",
            "StarterKitERC20Dex",
          ]),
        )
        .action(
          async (
            name,
            {
              applicationId,
              blockchainNodeId,
              loadBalancerId,
              provider,
              region,
              size,
              type,
              includePredeployedAbis,
              abis,
              ...defaultArgs
            },
          ) => {
            return baseAction(defaultArgs, async (settlemint, env) => {
              const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
              const blockchainNode = loadBalancerId ? undefined : (blockchainNodeId ?? env.SETTLEMINT_BLOCKCHAIN_NODE!);
              const loadBalancer = loadBalancerId ?? (blockchainNode ? undefined : env.SETTLEMINT_LOAD_BALANCER!);
              // Read and parse ABI files if provided
              const parsedAbis: { name: string; abi: string }[] = [];
              if (abis && abis.length > 0) {
                try {
                  const parsedAbiResults = await Promise.all(
                    abis.map(async (abiPath): Promise<{ name: string; abi: string }> => {
                      const abiContent = await Bun.file(abiPath).text();
                      const filename = basename(abiPath, ".json");
                      return { name: filename, abi: abiContent };
                    }),
                  );
                  parsedAbis.push(...parsedAbiResults);
                } catch (err) {
                  const error = err as Error;
                  throw new Error(`Failed to read or parse ABI file: ${error.message}`);
                }
              }
              const result = await settlemint.middleware.create({
                name,
                applicationId: application,
                interface: "SMART_CONTRACT_PORTAL",
                blockchainNodeId: blockchainNode,
                loadBalancerId: loadBalancer,
                abis: parsedAbis,
                includePredeployedAbis,
                provider,
                region,
                size,
                type,
              });
              return {
                result,
                mapDefaultEnv: async (): Promise<Partial<DotEnv>> => {
                  return {
                    SETTLEMINT_APPLICATION: application,
                    SETTLEMINT_PORTAL: result.id,
                    ...getPortalEndpoints(result),
                  };
                },
              };
            });
          },
        );
    },
    examples: [
      {
        description: "Create a smart contract portal middleware and save as default",
        command: "platform create middleware smart-contract-portal my-portal --accept-defaults -d",
      },
      {
        description: "Create a smart contract portal middleware in a different application",
        command:
          "platform create middleware smart-contract-portal my-portal --application-id 123456789 --smart-contract-set-id scs-123 --blockchain-node-id node-123",
      },
    ],
  });
}
