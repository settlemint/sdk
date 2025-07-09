import { Command } from "@commander-js/extra-typings";
import { trackAllTables } from "@settlemint/sdk-hasura";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro } from "@settlemint/sdk-utils/terminal";
import { type DotEnv, LOCAL_INSTANCE, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { hasuraPrompt } from "@/prompts/cluster-service/hasura.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getHasuraEnv } from "@/utils/get-cluster-service-env";

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

      const selectedInstance = await instancePrompt({
        env,
        accept: acceptDefaults,
      });

      let hasuraGraphqlEndpoint: string | undefined;
      let hasuraAdminSecret: string | undefined;
      let accessToken: string | undefined;

      if (selectedInstance === STANDALONE_INSTANCE || selectedInstance === LOCAL_INSTANCE) {
        hasuraGraphqlEndpoint = env.SETTLEMINT_HASURA_ENDPOINT;
        hasuraAdminSecret = env.SETTLEMINT_HASURA_ADMIN_SECRET;
      } else {
        const applicationUniqueName = env.SETTLEMINT_APPLICATION;
        if (!applicationUniqueName) {
          return missingApplication();
        }
        accessToken = await getApplicationOrPersonalAccessToken({
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
        hasuraGraphqlEndpoint = hasuraEnv.SETTLEMINT_HASURA_ENDPOINT;
        hasuraAdminSecret = hasuraEnv.SETTLEMINT_HASURA_ADMIN_SECRET;
      }

      if (!hasuraGraphqlEndpoint || !hasuraAdminSecret) {
        return note("Could not retrieve Hasura endpoint or admin secret. Please check your configuration.");
      }

      const { result, messages } = await trackAllTables(database, {
        instance: hasuraGraphqlEndpoint,
        accessToken,
        adminSecret: hasuraAdminSecret,
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
