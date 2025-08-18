import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { missingApplication } from "@/error/missing-config-error";
import { getHasuraEnv } from "@/utils/get-cluster-service-env";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'hasura' integration tool command for the SettleMint SDK.
 * This command creates a new Hasura integration in the SettleMint platform.
 */
export function hasuraIntegrationCreateCommand() {
  return getCreateCommand({
    name: "hasura",
    type: "integration tool",
    subType: "Hasura",
    alias: "ha",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option("--application <application>", "Application unique name")
        .action(async (name, { application, provider, region, size, type, ...defaultArgs }) => {
          return baseAction(
            {
              ...defaultArgs,
              provider,
              region,
            },
            async ({ settlemint, env, showSpinner, provider, region }) => {
              const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
              if (!applicationUniqueName) {
                return missingApplication();
              }
              const result = await showSpinner(() =>
                settlemint.integrationTool.create({
                  name,
                  applicationUniqueName,
                  integrationType: "HA_HASURA",
                  provider,
                  region,
                  size,
                  type,
                }),
              );
              return {
                result,
                mapDefaultEnv: async (): Promise<Partial<DotEnv>> => {
                  return {
                    SETTLEMINT_APPLICATION: applicationUniqueName,
                    SETTLEMINT_HASURA: result.uniqueName,
                    ...getHasuraEnv(result),
                  };
                },
              };
            },
          );
        });
    },
    examples: [
      {
        description: "Create a Hasura integration and save as default",
        command: "platform create integration-tool hasura my-hasura --accept-defaults -d",
      },
      {
        description: "Create a Hasura integration in a different application",
        command: "platform create integration-tool hasura my-hasura --application app-123",
      },
    ],
  });
}
