import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { blockchainNodeOrLoadBalancerPrompt } from "@/prompts/cluster-service/blockchain-node-or-load-balancer.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { getGraphEndpoint } from "@/utils/get-cluster-service-endpoint";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'graph' middleware command for the SettleMint SDK.
 * This command creates a new graph middleware in the SettleMint platform.
 */
export function graphMiddlewareCreateCommand() {
  return getCreateCommand({
    name: "graph",
    type: "middleware",
    subType: "The Graph",
    alias: "gr",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application <application>", "Application unique name")
        .option(
          "--blockchain-node <blockchainNode>",
          "Blockchain Node unique name (mutually exclusive with load-balancer)",
        )
        .option("--load-balancer <loadBalancer>", "Load Balancer unique name (mutually exclusive with blockchain-node)")
        .action(
          async (
            name,
            { application, blockchainNode, loadBalancer, provider, region, size, type, acceptDefaults, ...defaultArgs },
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
                    return nothingSelectedError("blockchain node or load balancer");
                  }
                  if (nodeOrLoadbalancer.__typename?.endsWith("LoadBalancer")) {
                    loadBalancerUniqueName = nodeOrLoadbalancer.uniqueName;
                  } else {
                    blockchainNodeUniqueName = nodeOrLoadbalancer.uniqueName;
                  }
                }
                const result = await showSpinner(() =>
                  settlemint.middleware.create({
                    name,
                    applicationUniqueName,
                    interface: "HA_GRAPH",
                    blockchainNodeUniqueName,
                    loadBalancerUniqueName,
                    provider,
                    region,
                    size,
                    type,
                  }),
                );
                return {
                  result,
                  mapDefaultEnv: async (): Promise<Partial<DotEnv>> => {
                    const graphMiddleware = await settlemint.middleware.read(result.uniqueName);
                    return {
                      SETTLEMINT_APPLICATION: applicationUniqueName,
                      SETTLEMINT_THEGRAPH: result.uniqueName,
                      ...(await getGraphEndpoint(settlemint, graphMiddleware)),
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
        description: "Create a graph middleware and save as default",
        command: "platform create middleware graph my-graph --accept-defaults -d",
      },
      {
        description: "Create a graph middleware in a different application",
        command: "platform create middleware graph my-graph --application my-app --blockchain-node node-123",
      },
      {
        description: "Create a graph middleware and connect to a specific load balancer",
        command: "platform create middleware graph my-graph --load-balancer my-load-balancer",
      },
      {
        description: "Create a graph middleware and connect to a specific blockchain node",
        command: "platform create middleware graph my-graph --blockchain-node my-blockchain-node",
      },
    ],
  });
}
