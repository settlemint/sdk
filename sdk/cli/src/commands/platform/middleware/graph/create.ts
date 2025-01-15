import { blockchainNodePrompt } from "@/commands/connect/blockchain-node.prompt";
import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { getGraphEndpoint } from "@/utils/get-cluster-service-endpoint";
import type { DotEnv } from "@settlemint/sdk-utils";

/**
 * Creates and returns the 'graph' middleware command for the SettleMint SDK.
 * This command creates a new graph middleware in the SettleMint platform.
 * It requires an application ID and smart contract set ID.
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
        .option("--blockchain-node <blockchainNode>", "Blockchain Node unique name")
        .action(
          async (
            name,
            { application, blockchainNode, provider, region, size, type, acceptDefaults, ...defaultArgs },
          ) => {
            return baseAction(
              {
                ...defaultArgs,
                acceptDefaults,
                provider,
                region,
              },
              async (settlemint, env, showSpinner) => {
                const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
                if (!applicationUniqueName) {
                  return missingApplication();
                }
                let blockchainNodeUniqueName = blockchainNode;
                if (!blockchainNodeUniqueName) {
                  const blockchainNodes = await settlemint.blockchainNode.list(applicationUniqueName);
                  const node = await blockchainNodePrompt({
                    env,
                    nodes: blockchainNodes,
                    accept: acceptDefaults,
                    isRequired: true,
                  });
                  if (!node) {
                    return nothingSelectedError("blockchain node");
                  }
                  blockchainNodeUniqueName = node.uniqueName;
                }
                const result = await showSpinner(() =>
                  settlemint.middleware.create({
                    name,
                    applicationUniqueName,
                    interface: "HA_GRAPH",
                    blockchainNodeUniqueName,
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
                      ...(await getGraphEndpoint(settlemint, graphMiddleware, env)),
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
    ],
  });
}
