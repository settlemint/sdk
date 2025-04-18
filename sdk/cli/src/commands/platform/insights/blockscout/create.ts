import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { getBlockscoutEndpoints } from "@/utils/get-cluster-service-endpoint";
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
                let blockchainNodeUniqueName = loadBalancer
                  ? undefined
                  : (blockchainNode ?? env.SETTLEMINT_BLOCKCHAIN_NODE);
                const loadBalancerUniqueName = blockchainNodeUniqueName
                  ? undefined
                  : (loadBalancer ?? env.SETTLEMINT_LOAD_BALANCER);

                if (!blockchainNodeUniqueName && !loadBalancerUniqueName) {
                  const blockchainNodes = await serviceSpinner("blockchain node", () =>
                    settlemint.blockchainNode.list(applicationUniqueName),
                  );
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
                  settlemint.insights.create({
                    name,
                    applicationUniqueName,
                    insightsCategory: "BLOCKCHAIN_EXPLORER",
                    provider: provider!,
                    region: region!,
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
