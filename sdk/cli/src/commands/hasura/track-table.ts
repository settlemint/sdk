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
import { cancel, intro, note, outro } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export function hasuraTrackTableCommand() {
  return new Command("track-table")
    .alias("tt")
    .description("Track a table in Hasura")
    .usage(
      createExamples([
        {
          description: "Track a table in the public schema",
          command: "hasura track-table --schema public --table user",
        },

        {
          description: "Track a table and accept default values",
          command: "hasura track-table --schema public --table payments --accept-defaults",
        },
      ]),
    )
    .requiredOption("--schema <schema>", "Schema name of the table (e.g., public)")
    .requiredOption("--table <table>", "Name of the table to track")
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .action(async ({ schema, table, acceptDefaults }) => {
      intro("Tracking table in Hasura");

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
      const queryEndpoint = new URL("/v1/query", baseUrl.origin).toString();

      try {
        await serviceSpinner("integration tool", async () => {
          const trackTableQuery = {
            type: "track_table",
            args: {
              schema,
              name: table,
            },
          };

          const response = await fetch(queryEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Hasura-Admin-Secret": hasuraAdminSecret,
              "x-auth-token": accessToken,
            },
            body: JSON.stringify(trackTableQuery),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to track table: ${JSON.stringify(errorData)}`);
          }

          return await response.json();
        });

        note(`Successfully tracked table '${schema}.${table}' in Hasura`);
        outro("Table tracking completed");
      } catch (error) {
        cancel(`Failed to track table: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
}
