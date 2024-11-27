import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "../../common/create-command";

/**
 * Creates and returns the 'graph' middleware command for the SettleMint SDK.
 * This command creates a new graph middleware in the SettleMint platform.
 * It requires an application ID and smart contract set ID.
 */
export function graphMiddlewareCreateCommand() {
  return getCreateCommand({
    name: "graph",
    type: "middleware",
    alias: "graph",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application-id <applicationId>", "Application ID")
        .option("--smart-contract-set-id <smartContractSetId>", "Smart Contract Set ID")
        .action(async (name, { applicationId, smartContractSetId, provider, region, size, type, ...defaultArgs }) => {
          return baseAction(defaultArgs, async (settlemint, env) => {
            const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
            const smartContractSet = smartContractSetId ?? env.SETTLEMINT_SMART_CONTRACT_SET!;
            const result = await settlemint.middleware.create({
              name,
              applicationId: application,
              provider,
              region,
              interface: "GRAPH",
              size,
              type,
            });
            return {
              result,
              mapDefaultEnv: () => {
                return {
                  SETTLEMINT_APPLICATION: application,
                  SETTLEMINT_SMART_CONTRACT_SET: smartContractSet,
                  SETTLEMINT_GRAPH_MIDDLEWARE: result.id,
                };
              },
            };
          });
        });
    },
    examples: [
      {
        description: "Create a graph middleware using default options",
        command: "platform create middleware graph my-graph --accept-defaults --default",
      },
      {
        description: "Create a graph middleware and save as default",
        command:
          "platform create middleware graph my-graph --application-id 123456789 --smart-contract-set-id scs-123 -d",
      },
    ],
  });
}
