import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { blockchainNodeOrLoadBalancerPrompt } from "@/prompts/cluster-service/blockchain-node-or-load-balancer.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { getBlockscoutEnv } from "@/utils/get-cluster-service-env";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'blockscout' insights command for the SettleMint SDK.
 * This command creates a new Blockscout insights service in the SettleMint platform.
 */
export function blockscoutInsightsCreateCommand() {
  return getCreateCommand({
    name: "blockscout",
    type: "insights",
    subType: "Blockscout",
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
          async (
            name,
            { application, provider, region, size, type, blockchainNode, loadBalancer, acceptDefaults, ...defaultArgs },
          ) => {
            return baseAction(
              {
                ...defaultArgs,
                acceptDefaults,
                provider,
                region,
              },
              async ({ settlemint, env, showSpinner, provider, region }) => {
                const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
                if (!applicationUniqueName) {
                  return missingApplication();
                }

                let blockchainNodeUniqueName = blockchainNode;
                let loadBalancerUniqueName = loadBalancer;

                if (!blockchainNodeUniqueName && !loadBalancerUniqueName) {
                  const blockchainNodes = await serviceSpinner("blockchain node", () =>
                    settlemint.blockchainNode.list(applicationUniqueName),
                  );
                  const loadBalancers = await serviceSpinner("load balancer", () =>
                    settlemint.loadBalancer.list(applicationUniqueName),
                  );
                  const nodeOrLoadbalancer = await blockchainNodeOrLoadBalancerPrompt({
                    env,
                    nodes: blockchainNodes,
                    loadBalancers,
                    accept: acceptDefaults,
                    isRequired: true,
                  });
                  if (!nodeOrLoadbalancer) {
                    return nothingSelectedError("blockchain node");
                  }
                  if (nodeOrLoadbalancer.__typename?.endsWith("LoadBalancer")) {
                    loadBalancerUniqueName = nodeOrLoadbalancer.uniqueName;
                  } else {
                    blockchainNodeUniqueName = nodeOrLoadbalancer.uniqueName;
                  }
                }

                const result = await showSpinner(() =>
                  settlemint.insights.create({
                    name,
                    applicationUniqueName,
                    insightsCategory: "BLOCKCHAIN_EXPLORER",
                    provider,
                    region,
                    size,
                    type,
                    blockchainNodeUniqueName,
                    loadBalancerUniqueName,
                  }),
                );
                return {
                  result,
                  mapDefaultEnv: async (): Promise<Partial<DotEnv>> => {
                    return {
                      SETTLEMINT_APPLICATION: applicationUniqueName,
                      SETTLEMINT_BLOCKSCOUT: result.uniqueName,
                      ...getBlockscoutEnv(result),
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
      {
        description: "Create a Blockscout insights service and connect to a specific load balancer",
        command: "platform create insights blockscout my-blockscout --load-balancer my-load-balancer",
      },
      {
        description: "Create a Blockscout insights service and connect to a specific blockchain node",
        command: "platform create insights blockscout my-blockscout --blockchain-node my-blockchain-node",
      },
    ],
  });
}
