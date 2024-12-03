import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { getHasuraEndpoints } from "@/utils/get-cluster-service-endpoint";
import type { DotEnv } from "@settlemint/sdk-utils";

/**
 * Creates and returns the 'hasura' integration tool command for the SettleMint SDK.
 * This command creates a new Hasura integration in the SettleMint platform.
 * It requires an application ID.
 */
export function hasuraIntegrationCreateCommand() {
  return getCreateCommand({
    name: "hasura",
    type: "integration tool",
    alias: "ha",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application-id <applicationId>", "Application ID")
        .action(async (name, { applicationId, provider, region, size, type, ...defaultArgs }) => {
          return baseAction(defaultArgs, async (settlemint, env) => {
            const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
            const result = await settlemint.integrationTool.create({
              name,
              applicationId: application,
              integrationType: "HASURA",
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
                  SETTLEMINT_HASURA: result.id,
                  ...getHasuraEndpoints(result),
                };
              },
            };
          });
        });
    },
    examples: [
      {
        description: "Create a Hasura integration and save as default",
        command: "platform create integration-tool hasura my-hasura --accept-defaults -d",
      },
      {
        description: "Create a Hasura integration in a different application",
        command: "platform create integration-tool hasura my-hasura --application-id 123456789",
      },
    ],
  });
}
