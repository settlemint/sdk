import { basename } from "node:path";
import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { getPortalEndpoints } from "@/utils/get-cluster-service-endpoint";
import { type DotEnv, cancel } from "@settlemint/sdk-utils";

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
        .option("--application <application>", "Application unique name")
        .option("--load-balancer <loadBalancer>", "Load Balancer unique name (mutually exclusive with blockchain-node)")
        .option(
          "--blockchain-node <blockchainNode>",
          "Blockchain Node unique name (mutually exclusive with load-balancer)",
        )
        .option("--abis <abis...>", "Path to abi file(s)")
        .option(
          "--include-predeployed-abis <includePredeployedAbis...>",
          "Include pre-deployed abis (run `settlemint platform config` to see available pre-deployed abis)",
        )
        .action(
          async (
            name,
            {
              application,
              blockchainNode,
              loadBalancer,
              provider,
              region,
              size,
              type,
              includePredeployedAbis,
              abis,
              ...defaultArgs
            },
          ) => {
            return baseAction(
              {
                ...defaultArgs,
                provider,
                region,
              },
              async (settlemint, env) => {
                const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION!;
                const blockchainNodeUniqueName = loadBalancer
                  ? undefined
                  : (blockchainNode ?? env.SETTLEMINT_BLOCKCHAIN_NODE!);
                const loadBalancerUniqueName = blockchainNodeUniqueName
                  ? undefined
                  : (loadBalancer ?? env.SETTLEMINT_LOAD_BALANCER!);
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
                    cancel(`Failed to read or parse ABI file: ${error.message}`);
                  }
                }

                if (includePredeployedAbis && includePredeployedAbis.length > 0) {
                  const platformConfig = await settlemint.platform.config();
                  const invalidPredeployedAbis = includePredeployedAbis.filter(
                    (abi) => !platformConfig.preDeployedContracts.some((contract) => contract === abi),
                  );
                  if (invalidPredeployedAbis.length > 0) {
                    cancel(
                      `Invalid pre-deployed abis: '${invalidPredeployedAbis.join(", ")}'. Possible values: '${platformConfig.preDeployedContracts.sort().join(", ")}'`,
                    );
                  }
                }

                const result = await settlemint.middleware.create({
                  name,
                  applicationUniqueName,
                  interface: "SMART_CONTRACT_PORTAL",
                  blockchainNodeUniqueName,
                  loadBalancerUniqueName,
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
                      SETTLEMINT_APPLICATION: applicationUniqueName,
                      SETTLEMINT_PORTAL: result.uniqueName,
                      ...getPortalEndpoints(result),
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
        description: "Create a smart contract portal middleware and save as default",
        command: "platform create middleware smart-contract-portal my-portal --accept-defaults -d",
      },
      {
        description: "Create a smart contract portal middleware in a different application",
        command:
          "platform create middleware smart-contract-portal my-portal --application my-app --blockchain-node node-123",
      },
    ],
  });
}
