import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { hasuraPrompt } from "@/prompts/cluster-service/hasura.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getHasuraEnv } from "@/utils/get-cluster-service-env";
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
          description: "Track all tables of the default database",
          command: "hasura track",
        },
        {
          description: "Track all tables of a specific database",
          command: "hasura track --database my-database",
        },
      ]),
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("-d, --database <database>", "Database name", "default")
    .action(async ({ acceptDefaults, database }) => {
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

      const hasuraEnv = getHasuraEnv(hasura);
      const hasuraGraphqlEndpoint = hasuraEnv.SETTLEMINT_HASURA_ENDPOINT;
      const hasuraAdminSecret = hasuraEnv.SETTLEMINT_HASURA_ADMIN_SECRET;

      if (!hasuraGraphqlEndpoint || !hasuraAdminSecret) {
        return note("Could not retrieve Hasura endpoint or admin secret. Please check your configuration.");
      }

      // Convert GraphQL endpoint to Query endpoint
      const baseUrl = new URL(hasuraGraphqlEndpoint);
      const queryEndpoint = new URL("/v1/metadata", baseUrl.origin).toString();

      const messages: string[] = [];

      const { result } = await spinner({
        startMessage: `Tracking all tables in Hasura from database "${database}"`,
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

          // Get all tables using pg_get_source_tables
          const getTablesResult = await executeHasuraQuery<
            Array<{
              name: string;
              schema: string;
            }>
          >({
            type: "pg_get_source_tables",
            args: {
              source: database,
            },
          });

          if (!getTablesResult.ok) {
            throw new Error(`Failed to get tables: ${JSON.stringify(getTablesResult.data)}`);
          }

          const tables = getTablesResult.data;

          if (tables.length === 0) {
            return { result: "no-tables" as const };
          }

          messages.push(`Found ${tables.length} tables in database "${database}"`);

          // Incase a table is already tracked, untrack it first
          await executeHasuraQuery<{ code?: string }>({
            type: "pg_untrack_tables",
            args: {
              tables: tables.map((table) => ({
                table: table.name,
              })),
              allow_warnings: true,
            },
          });

          // Track all tables
          const trackResult = await executeHasuraQuery<{ code?: string }>({
            type: "pg_track_tables",
            args: {
              tables: tables.map((table) => ({
                table: table.name,
              })),
              allow_warnings: true,
            },
          });

          if (!trackResult.ok) {
            throw new Error(`Failed to track tables: ${JSON.stringify(trackResult.data)}`);
          }

          messages.push(`Successfully tracked ${tables.length} tables`);

          return { result: "success" as const };
        },
      });

      // Display collected messages after spinner completes
      for (const message of messages) {
        note(message);
      }

      if (result === "no-tables") {
        outro(`No tables found in database "${database}"`);
      }

      outro("Table tracking completed successfully");
    });
}
