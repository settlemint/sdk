import { writeTemplate } from "@/commands/codegen/write-template";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { generateSchema } from "@gql.tada/cli-utils";
import { installDependencies, isPackageInstalled, note } from "@settlemint/sdk-utils";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

const PACKAGE_NAME = "@settlemint/sdk-hasura";

export async function codegenHasura(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_HASURA_ENDPOINT;
  const accessToken = await getApplicationOrPersonalAccessToken({
    env,
    instance: env.SETTLEMINT_INSTANCE,
    prefer: "application",
  });
  const adminSecret = env.SETTLEMINT_HASURA_ADMIN_SECRET;
  const databaseUrl = env.SETTLEMINT_HASURA_DATABASE_URL;

  // Early return if required Hasura environment variables are missing during runtime
  if (process.env.NODE_ENV !== "production" && (!gqlEndpoint || !accessToken || !adminSecret)) {
    note("[Codegen] Missing required Hasura environment variables", "warn");
    return;
  }

  // Generate GraphQL schema if we have the required variables
  if (gqlEndpoint && accessToken && adminSecret) {
    await generateSchema({
      input: gqlEndpoint,
      output: "hasura-schema.graphql",
      tsconfig: undefined,
      headers: {
        "x-hasura-admin-secret": adminSecret,
        "x-auth-token": accessToken,
      },
    });
  }

  // Generate Hasura client template with build time safety
  const hasuraTemplate = `import { createHasuraClient } from "${PACKAGE_NAME}";
import type { introspection } from "@schemas/hasura-env";

export const { client: hasuraClient, graphql: hasuraGraphql } = createHasuraClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: string;
  };
}>({
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT ?? "",
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN ?? "", // undefined in browser, by design to not leak the secrets
  adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET ?? "", // undefined in browser, by design to not leak the secrets
});`;

  await writeTemplate(hasuraTemplate, "/lib/settlemint", "hasura.ts");

  // Generate Drizzle client template with build time safety
  const drizzleTemplate = `import { createPostgresPool } from "${PACKAGE_NAME}/postgres";

export const postgresPool = createPostgresPool(process.env.SETTLEMINT_HASURA_DATABASE_URL ?? '');
`;

  // Always generate the Drizzle template, but with proper build time handling
  await writeTemplate(drizzleTemplate, "/lib/settlemint", "postgres.ts");

  // Install the package only if it's not already installed
  if (!(await isPackageInstalled(PACKAGE_NAME))) {
    await installDependencies(PACKAGE_NAME);
  }

  // Warn about missing database variables only during runtime
  if (process.env.NODE_ENV !== "production" && !databaseUrl) {
    console.warn("[Codegen] Missing database environment variables");
  }
}
