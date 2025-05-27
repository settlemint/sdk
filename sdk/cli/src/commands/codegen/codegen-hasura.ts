import { writeTemplate } from "@/commands/codegen/utils/write-template";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { generateSchema } from "@gql.tada/cli-utils";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import { installDependencies, isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
import { note } from "@settlemint/sdk-utils/terminal";
import { type DotEnv, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";

const PACKAGE_NAME = "@settlemint/sdk-hasura";

export async function codegenHasura(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_HASURA_ENDPOINT;

  const instance = env.SETTLEMINT_INSTANCE;
  const accessToken =
    instance === STANDALONE_INSTANCE
      ? undefined
      : await getApplicationOrPersonalAccessToken({
          env,
          instance: env.SETTLEMINT_INSTANCE,
          prefer: "application",
        });
  const adminSecret = env.SETTLEMINT_HASURA_ADMIN_SECRET;

  // Generate GraphQL schema if we have the required variables
  if (gqlEndpoint && adminSecret) {
    await generateSchema({
      input: gqlEndpoint,
      output: "hasura-schema.graphql",
      tsconfig: undefined,
      headers: {
        "x-hasura-admin-secret": adminSecret,
        ...(accessToken ? { "x-auth-token": accessToken } : {}),
      },
    });

    // Generate Hasura client template with build time safety
    const hasuraTemplate = `import { createHasuraClient } from "${PACKAGE_NAME}";
import type { introspection } from "@schemas/hasura-env";
import { createLogger, requestLogger, type LogLevel } from '@settlemint/sdk-utils/logging';

const logger = createLogger({ level: process.env.SETTLEMINT_LOG_LEVEL as LogLevel });

export const { client: hasuraClient, graphql: hasuraGraphql } = createHasuraClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    timestamp: string;
    timestampz: string;
    uuid: string;
    date: string;
    time: string;
    jsonb: string;
    numeric: string;
    interval: string;
    geometry: string;
    geography: string;
  };
}>({
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
  adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET!,
}, {
  fetch: requestLogger(logger, "hasura", fetch) as typeof fetch,
});`;

    await writeTemplate(hasuraTemplate, "/lib/settlemint", "hasura.ts");
  } else {
    note("[Codegen] Missing required Hasura environment variables", "warn");
  }

  const databaseUrl = env.SETTLEMINT_HASURA_DATABASE_URL;
  if (databaseUrl) {
    // Generate Drizzle client template with build time safety
    const drizzleTemplate = `import { createPostgresPool } from "${PACKAGE_NAME}/postgres";

export const postgresPool = createPostgresPool(process.env.SETTLEMINT_HASURA_DATABASE_URL ?? "");
`;

    // Always generate the Drizzle template, but with proper build time handling
    await writeTemplate(drizzleTemplate, "/lib/settlemint", "postgres.ts");

    const projectDir = await projectRoot();
    // Install the package only if it's not already installed
    if (!(await isPackageInstalled(PACKAGE_NAME, projectDir))) {
      await installDependencies(PACKAGE_NAME, projectDir);
    }
  } else {
    note("[Codegen] Missing database environment variables", "warn");
  }
}
