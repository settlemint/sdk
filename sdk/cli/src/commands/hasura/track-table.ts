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
import { cancel, intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
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
        const messages: string[] = [];

        await spinner({
          startMessage: `Tracking table '${schema}.${table}' in Hasura`,
          stopMessage: `Successfully tracked table '${schema}.${table}' in Hasura`,
          task: async () => {
            const executeHasuraQuery = async (query: object) => {
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
                return { ok: false, data: await response.json() };
              }

              return { ok: true, data: await response.json() };
            };

            const trackTable = async () => {
              return executeHasuraQuery({
                type: "track_table",
                args: { schema, table },
              });
            };

            const untrackTable = async () => {
              return executeHasuraQuery({
                type: "untrack_table",
                args: { schema, table },
              });
            };

            const trackResult = await trackTable();

            if (trackResult.ok) {
              return { data: trackResult.data };
            }

            if (trackResult.data.code !== "already-tracked") {
              throw new Error(`Failed to track table: ${JSON.stringify(trackResult.data)}`);
            }

            // If tracking failed because table is already tracked, untrack and then retrack
            messages.push(`Table '${schema}.${table}' is already tracked. Untracking and retracking...`);

            const untrackResult = await untrackTable();
            if (!untrackResult.ok) {
              throw new Error(`Failed to untrack table: ${JSON.stringify(untrackResult.data)}`);
            }
            messages.push(`Successfully untracked table '${schema}.${table}'.`);

            // Track the table again
            const retrackResult = await trackTable();
            if (!retrackResult.ok) {
              throw new Error(`Failed to re-track table: ${JSON.stringify(retrackResult.data)}`);
            }
            messages.push(`Successfully re-tracked table '${schema}.${table}'.`);

            return { data: retrackResult.data };
          },
        });

        // Display collected messages after spinner completes
        for (const message of messages) {
          note(message);
        }

        outro("Table tracking completed");
      } catch (error) {
        cancel(`Failed to track table: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
}
