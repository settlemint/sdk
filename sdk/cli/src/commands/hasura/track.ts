import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { hasuraPrompt } from "@/prompts/cluster-service/hasura.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getHasuraEndpoints } from "@/utils/get-cluster-service-endpoint";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export function hasuraTrackCommand() {
  return new Command("track")
    .alias("t")
    .description("Track all tables in Hasura")
    .usage(
      createExamples([
        {
          description: "Track all tables in all schemas",
          command: "hasura track",
        },
        {
          description: "Track all tables and accept default values",
          command: "hasura track --accept-defaults",
        },
      ]),
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .action(async ({ acceptDefaults }) => {
      intro("Tracking all tables in Hasura");

      const env: Partial<DotEnv> = await loadEnv(false, false);
      const applicationUniqueName = env.SETTLEMINT_APPLICATION;
      if (!applicationUniqueName) {
        return missingApplication();
      }

      const selectedInstance = await instancePrompt(env, true);
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance: selectedInstance,
        prefer: "application",
      });

      const settlemint = createSettleMintClient({
        accessToken,
        instance: selectedInstance,
      });

      const integrationTools = await serviceSpinner("integration tool", () =>
        settlemint.integrationTool.list(applicationUniqueName),
      );

      const hasura = await hasuraPrompt({
        env,
        integrations: integrationTools,
        accept: acceptDefaults,
        isRequired: true,
      });

      if (!hasura) {
        return nothingSelectedError("Hasura instance");
      }

      const hasuraEndpoints = getHasuraEndpoints(hasura);
      const hasuraGraphqlEndpoint = hasuraEndpoints.SETTLEMINT_HASURA_ENDPOINT;
      const hasuraAdminSecret = hasuraEndpoints.SETTLEMINT_HASURA_ADMIN_SECRET;

      if (!hasuraGraphqlEndpoint || !hasuraAdminSecret) {
        return note("Could not retrieve Hasura endpoint or admin secret. Please check your configuration.");
      }

      // Convert GraphQL endpoint to Query endpoint
      const baseUrl = new URL(hasuraGraphqlEndpoint);
      const queryEndpoint = new URL("/v1/metadata", baseUrl.origin).toString();

      const messages: string[] = [];

      await spinner({
        startMessage: "Tracking all tables in Hasura",
        stopMessage: "Successfully tracked all tables in Hasura",
        task: async () => {
          const executeHasuraQuery = async <T>(query: object): Promise<{ ok: boolean; data: T }> => {
            const response = await fetch(queryEndpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Hasura-Admin-Secret": hasuraAdminSecret,
                "x-auth-token": accessToken,
              },
              body: JSON.stringify(query),
            });

            if (!response.ok) {
              return { ok: false, data: (await response.json()) as T };
            }

            return { ok: true, data: (await response.json()) as T };
          };

          const exportMetadata = async () => {
            return executeHasuraQuery<{
              resource_version: number;
              metadata: {
                version: number;
                sources: Array<{
                  name: string;
                  kind: string;
                  tables: Array<{
                    table: {
                      name: string;
                      schema: string;
                    };
                  }>;
                }>;
              };
            }>({
              type: "export_metadata",
              version: 2,
              args: {},
            });
          };

          // Get current metadata to identify all tables
          const metadataResult = await exportMetadata();

          if (!metadataResult.ok) {
            throw new Error(`Failed to export metadata: ${JSON.stringify(metadataResult.data)}`);
          }

          const metadata = metadataResult.data;

          // Extract all tables from all sources
          const allTables: Array<{ source: string; schema: string; table: string }> = [];

          metadata.metadata.sources.map((source) => {
            source.tables.map((tableInfo) => {
              allTables.push({
                source: source.name,
                schema: tableInfo.table.schema,
                table: tableInfo.table.name,
              });
            });
          });

          messages.push(`Found ${allTables.length} tables in the database`);

          // Use bulk untrack operation instead of going one by one
          const untrackResult = await executeHasuraQuery<{ code?: string }>({
            type: "pg_untrack_tables",
            args: {
              tables: allTables.map(({ source, table }) => ({ source, table })),
              allow_warnings: true,
            },
          });

          if (!untrackResult.ok) {
            throw new Error(`Failed to untrack tables: ${JSON.stringify(untrackResult.data)}`);
          }

          const trackResult = await executeHasuraQuery<{ code?: string }>({
            type: "pg_track_tables",
            args: {
              tables: allTables.map(({ source, table }) => ({ source, table })),
              allow_warnings: true,
            },
          });

          if (!trackResult.ok) {
            throw new Error(`Failed to track tables: ${JSON.stringify(trackResult.data)}`);
          }

          messages.push(`Successfully tracked ${allTables.length} tables`);

          return { data: "success" };
        },
      });

      // Display collected messages after spinner completes
      for (const message of messages) {
        note(message);
      }

      outro("Table tracking completed successfully");
    });
}
