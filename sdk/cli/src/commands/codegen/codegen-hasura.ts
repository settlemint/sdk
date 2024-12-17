import { writeTemplate } from "@/commands/codegen/write-template";
import { generateSchema } from "@gql.tada/cli-utils";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function codegenHasura(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_HASURA_ENDPOINT;
  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
  const adminSecret = env.SETTLEMINT_HASURA_ADMIN_SECRET;

  // Early return if required Hasura environment variables are missing during runtime
  if (process.env.NODE_ENV !== "production" && (!gqlEndpoint || !accessToken || !adminSecret)) {
    console.warn("[Codegen] Missing required Hasura environment variables");
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
  const hasuraTemplate = `import { createHasuraClient } from "@settlemint/sdk-hasura";
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
  const drizzleTemplate = `import { createDrizzleClient } from "@settlemint/sdk-hasura";

export const drizzleClient = createDrizzleClient({
  databaseUrl: process.env.SETTLEMINT_HASURA_DATABASE_URL ?? "",
  database: process.env.SETTLEMINT_HASURA_DATABASE_DB_NAME ?? "",
  user: process.env.SETTLEMINT_HASURA_DATABASE_USER ?? "",
  password: process.env.SETTLEMINT_HASURA_DATABASE_PASSWORD ?? "",
  maxPoolSize: process.env.SETTLEMINT_HASURA_DATABASE_MAX_POOL_SIZE,
  idleTimeoutMillis: process.env.SETTLEMINT_HASURA_DATABASE_IDLE_TIMEOUT,
  connectionTimeoutMillis: process.env.SETTLEMINT_HASURA_DATABASE_CONNECTION_TIMEOUT,
});`;

  // Always generate the Drizzle template, but with proper build time handling
  await writeTemplate(drizzleTemplate, "/lib/settlemint", "drizzle.ts");
}
