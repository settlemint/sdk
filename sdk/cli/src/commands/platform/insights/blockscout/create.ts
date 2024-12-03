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
        .option("--application-id <applicationId>", "Application ID")
        .option("--load-balancer-id <loadBalancerId>", "Load Balancer ID (mutually exclusive with blockchain-node-id)")
        .option(
          "--blockchain-node-id <blockchainNodeId>",
          "Blockchain Node ID (mutually exclusive with load-balancer-id)",
        )
        .action(
          async (
            name,
            { applicationId, provider, region, size, type, blockchainNodeId, loadBalancerId, ...defaultArgs },
          ) => {
            return baseAction(defaultArgs, async (settlemint, env) => {
              const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
              const blockchainNode = loadBalancerId ? undefined : (blockchainNodeId ?? env.SETTLEMINT_BLOCKCHAIN_NODE!);
              const loadBalancer = loadBalancerId ?? (blockchainNode ? undefined : env.SETTLEMINT_LOAD_BALANCER!);
              const result = await settlemint.insights.create({
                name,
                applicationId: application,
                insightsCategory: "BLOCKCHAIN_EXPLORER",
                provider,
                region,
                size,
                type,
                blockchainNode,
                loadBalancer,
              });
              return {
                result,
                mapDefaultEnv: async (): Promise<Partial<DotEnv>> => {
                  return {
                    SETTLEMINT_APPLICATION: application,
                    SETTLEMINT_BLOCKSCOUT: result.id,
                    ...getBlockscoutEndpoints(result),
                  };
                },
              };
            });
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
        command: "platform create insights blockscout my-blockscout --application-id 123456789",
      },
    ],
  });
}
