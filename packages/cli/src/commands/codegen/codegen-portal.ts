import { writeTemplate } from "@/commands/codegen/write-template";
import { generateSchema } from "@gql.tada/cli-utils";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function codegenPortal(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
  if (!gqlEndpoint) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  await generateSchema({
    input: gqlEndpoint,
    output: "portal-schema.graphql",
    tsconfig: undefined,
    headers: {
      "x-auth-token": accessToken,
    },
  });

  const template = `import { createPortalClient } from "@settlemint/sdk-portal";
import type { introspection } from "../../portal-env.d.ts";

export const { client: portalClient, graphql: portalGraphql } = createServerPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: number;
  };
}>({
  instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!, // undefined in browser, by design to not leak the secrets
});`;

  await writeTemplate(template, "/lib/settlemint", "portal.ts");
}
