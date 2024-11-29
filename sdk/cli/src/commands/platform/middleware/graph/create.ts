import { testGqlEndpoint } from "@/commands/codegen/test-gql-endpoint";
import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { getHAGraphEndpoint } from "@/utils/get-cluster-service-endpoint";
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
    alias: "gr",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application-id <applicationId>", "Application ID")
        .option("--smart-contract-set-id <smartContractSetId>", "Smart Contract Set ID")
        .option("--storage-id <storageId>", "Storage ID (IFPS)")
        .option("--blockchain-node-id <blockchainNodeId>", "Blockchain Node ID")
        .action(
          async (
            name,
            {
              applicationId,
              smartContractSetId,
              storageId,
              blockchainNodeId,
              provider,
              region,
              size,
              type,
              ...defaultArgs
            },
          ) => {
            return baseAction(defaultArgs, async (settlemint, env) => {
              const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
              const smartContractSet = smartContractSetId ?? env.SETTLEMINT_SMART_CONTRACT_SET!;
              const blockchainNode = blockchainNodeId ?? env.SETTLEMINT_BLOCKCHAIN_NODE!;
              const storage = storageId ?? env.SETTLEMINT_IPFS;
              const result = await settlemint.middleware.create({
                name,
                applicationId: application,
                interface: "HA_GRAPH",
                smartContractSetId: smartContractSet,
                storageId: storage,
                blockchainNodeId: blockchainNode,
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
                    SETTLEMINT_THEGRAPH: result.id,
                    ...(await getHAGraphEndpoint(result, env)),
                  };
                },
              };
            });
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
        command:
          "platform create middleware graph my-graph --application-id 123456789 --smart-contract-set-id scs-123 --blockchain-node-id node-123 --storage-id storage-123",
      },
    ],
  });
}
