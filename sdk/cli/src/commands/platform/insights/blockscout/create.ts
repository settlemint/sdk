import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { getBlockscoutEndpoints } from "@/utils/get-cluster-service-endpoint";
import type { DotEnv } from "@settlemint/sdk-utils";

/**
 * Creates and returns the 'blockscout' insights command for the SettleMint SDK.
 * This command creates a new Blockscout insights service in the SettleMint platform.
 * It requires an application ID.
 */
export function blockscoutInsightsCreateCommand() {
  return getCreateCommand({
    name: "blockscout",
    type: "insights",
    alias: "bs",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application <application>", "Application unique name")
        .option("--load-balancer <loadBalancer>", "Load Balancer unique name (mutually exclusive with blockchain-node)")
        .option(
          "--blockchain-node <blockchainNode>",
          "Blockchain Node unique name (mutually exclusive with load-balancer)",
        )
        .action(
          async (name, { application, provider, region, size, type, blockchainNode, loadBalancer, ...defaultArgs }) => {
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
                const result = await settlemint.insights.create({
                  name,
                  applicationUniqueName,
                  insightsCategory: "BLOCKCHAIN_EXPLORER",
                  provider,
                  region,
                  size,
                  type,
                  blockchainNodeUniqueName,
                  loadBalancerUniqueName,
                });
                return {
                  result,
                  mapDefaultEnv: async (): Promise<Partial<DotEnv>> => {
                    return {
                      SETTLEMINT_APPLICATION: applicationUniqueName,
                      SETTLEMINT_BLOCKSCOUT: result.uniqueName,
                      ...getBlockscoutEndpoints(result),
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
        description: "Create a Blockscout insights service and save as default",
        command: "platform create insights blockscout my-blockscout --accept-defaults -d",
      },
      {
        description: "Create a Blockscout insights service in a different application",
        command: "platform create insights blockscout my-blockscout --application app-123",
      },
    ],
  });
}
