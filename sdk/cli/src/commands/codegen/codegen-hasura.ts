import { writeTemplate } from "@/commands/codegen/write-template";
import { generateSchema } from "@gql.tada/cli-utils";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function codegenHasura(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_HASURA_ENDPOINT;
  if (!gqlEndpoint) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
  const adminSecret = env.SETTLEMINT_HASURA_ADMIN_SECRET!;

  await generateSchema({
    input: gqlEndpoint,
    output: "hasura-schema.graphql",
    tsconfig: undefined,
    headers: {
      "x-hasura-admin-secret": adminSecret,
      "x-auth-token": accessToken,
    },
  });

  const template = `import { createHasuraClient } from "@settlemint/sdk-hasura";
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
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!, // undefined in browser, by design to not leak the secrets
  adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET!, // undefined in browser, by design to not leak the secrets
});`;

  await writeTemplate(template, "/lib/settlemint", "hasura.ts");
}
