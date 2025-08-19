import { generateSchema } from "@gql.tada/cli-utils";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import { installDependencies, isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
import { note } from "@settlemint/sdk-utils/terminal";
import { type DotEnv, LOCAL_INSTANCE, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";
import { writeTemplate } from "@/commands/codegen/utils/write-template";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";

const PACKAGE_NAME = "@settlemint/sdk-hasura";

export async function codegenHasura(env: DotEnv, useBun?: boolean) {
  const gqlEndpoint = env.SETTLEMINT_HASURA_ENDPOINT;

  const instance = env.SETTLEMINT_INSTANCE;
  const accessToken =
    instance === STANDALONE_INSTANCE || instance === LOCAL_INSTANCE
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
    const hasuraTemplate = `import { createHasuraClient, createHasuraMetadataClient } from "${PACKAGE_NAME}";
import type { introspection } from "@schemas/hasura-env";
import { createLogger, requestLogger, type LogLevel } from '@settlemint/sdk-utils/logging';

const logger = createLogger({ level: process.env.SETTLEMINT_LOG_LEVEL as LogLevel });

// Validate required environment variables
const hasuraEndpoint = process.env.SETTLEMINT_HASURA_ENDPOINT;
const hasuraAdminSecret = process.env.SETTLEMINT_HASURA_ADMIN_SECRET;

if (!hasuraEndpoint) {
  throw new Error('SETTLEMINT_HASURA_ENDPOINT environment variable is required');
}

if (!hasuraAdminSecret) {
  throw new Error('SETTLEMINT_HASURA_ADMIN_SECRET environment variable is required');
}

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
  instance: hasuraEndpoint,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
  adminSecret: hasuraAdminSecret,
}, {
  fetch: requestLogger(logger, "hasura", fetch) as typeof fetch,
});

export const hasuraMetadataClient = createHasuraMetadataClient({
  instance: hasuraEndpoint,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
  adminSecret: hasuraAdminSecret,
}, logger);`;

    await writeTemplate(hasuraTemplate, "/lib/settlemint", "hasura.ts");
  } else {
    note("[Codegen] Missing required Hasura environment variables", "warn");
  }

  const databaseUrl = env.SETTLEMINT_HASURA_DATABASE_URL;
  if (databaseUrl) {
    // Generate appropriate template based on useBun flag
    let template: string;

    if (useBun) {
      // Generate Bun SQL template with connection pool settings matching PostgreSQL pool
      template = `import { SQL } from 'bun';

const databaseUrl = process.env.SETTLEMINT_HASURA_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('SETTLEMINT_HASURA_DATABASE_URL environment variable is required');
}

export const client = new SQL({
  url: databaseUrl,

  // Connection pool settings (matching PostgreSQL pool configuration)
  max: 10, // Maximum connections in pool
  idleTimeout: 30, // Close idle connections after 30 seconds
  connectionTimeout: 5, // Timeout when establishing new connections (5 seconds)
  maxLifetime: 0, // Connection lifetime in seconds (0 = forever)
});
`;
    } else {
      // Use existing Drizzle template
      template = `import { createPostgresPool } from "${PACKAGE_NAME}/postgres";

const databaseUrl = process.env.SETTLEMINT_HASURA_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('SETTLEMINT_HASURA_DATABASE_URL environment variable is required');
}

export const postgresPool = createPostgresPool(databaseUrl);
`;
    }

    // Always generate the template, but with proper build time handling
    await writeTemplate(template, "/lib/settlemint", "postgres.ts");

    const projectDir = await projectRoot();
    // Install the package only if it's not already installed
    if (!(await isPackageInstalled(PACKAGE_NAME, projectDir))) {
      await installDependencies(PACKAGE_NAME, projectDir);
    }
  } else {
    note("[Codegen] Missing database environment variables", "warn");
  }
}
