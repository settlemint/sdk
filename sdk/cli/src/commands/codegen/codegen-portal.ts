import { testGqlEndpoint } from "@/commands/codegen/test-gql-endpoint";
import { writeTemplate } from "@/commands/codegen/write-template";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { generateSchema } from "@gql.tada/cli-utils";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function codegenPortal(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
  if (!gqlEndpoint) {
    return;
  }

  const accessToken = await getApplicationOrPersonalAccessToken({
    env,
    instance: env.SETTLEMINT_INSTANCE,
    prefer: "application",
  });
  if (!accessToken) {
    return;
  }

  await testGqlEndpoint({
    accessToken,
    gqlEndpoint,
  });
  await generateSchema({
    input: gqlEndpoint,
    output: "portal-schema.graphql",
    tsconfig: undefined,
    headers: {
      "x-auth-token": accessToken ?? "",
    },
  });

  const template = `import { createPortalClient } from "@settlemint/sdk-portal";
import type { introspection } from "@schemas/portal-env";

export const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
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
  instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!, // undefined in browser, by design to not leak the secrets
});`;

  await writeTemplate(template, "/lib/settlemint", "portal.ts");
}
