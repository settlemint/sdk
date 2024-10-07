import { writeEnv } from "@settlemint/sdk-utils/environment";
import { spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Writes environment variables to .env files with a spinner for visual feedback.
 *
 * @param env - Partial environment variables to be written.
 * @param environment - The name of the environment (e.g., "development", "production").
 * @returns A promise that resolves when the environment variables are written.
 * @throws If there's an error writing the environment files.
 *
 * @example
 * await writeEnvSpinner(
 *   { SETTLEMINT_INSTANCE: "https://example.com", SETTLEMINT_ACCESS_TOKEN: "token123" },
 *   "development"
 * );
 */
export async function writeEnvSpinner(env: Partial<DotEnv>) {
  return spinner({
    startMessage: `Saving .env.${env.SETTLEMINT_ENVIRONMENT} and .env.${env.SETTLEMINT_ENVIRONMENT}.local files`,
    stopMessage: `Written .env.${env.SETTLEMINT_ENVIRONMENT} and .env.${env.SETTLEMINT_ENVIRONMENT}.local file`,
    task: async () => {
      await writeEnv(
        {
          SETTLEMINT_ENVIRONMENT: env.SETTLEMINT_ENVIRONMENT,
          SETTLEMINT_INSTANCE: env.SETTLEMINT_INSTANCE,
          SETTLEMINT_WORKSPACE: env.SETTLEMINT_WORKSPACE,
          SETTLEMINT_APPLICATION: env.SETTLEMINT_APPLICATION,
          SETTLEMINT_HASURA: env.SETTLEMINT_HASURA,
          SETTLEMINT_HASURA_ENDPOINT: env.SETTLEMINT_HASURA_ENDPOINT,
          SETTLEMINT_THEGRAPH: env.SETTLEMINT_THEGRAPH,
          SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT: env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT,
          SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK: env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK,
          SETTLEMINT_PORTAL: env.SETTLEMINT_PORTAL,
          SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
          SETTLEMINT_PORTAL_REST_ENDPOINT: env.SETTLEMINT_PORTAL_REST_ENDPOINT,
          SETTLEMINT_HD_PRIVATE_KEY: env.SETTLEMINT_HD_PRIVATE_KEY,
        },
        false,
      );

      await writeEnv(
        {
          SETTLEMINT_ACCESS_TOKEN: env.SETTLEMINT_ACCESS_TOKEN,
          SETTLEMINT_HASURA_ADMIN_SECRET: env.SETTLEMINT_HASURA_ADMIN_SECRET,
        },
        true,
      );
    },
  });
}
