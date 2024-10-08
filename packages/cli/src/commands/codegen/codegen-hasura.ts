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

  const clientTemplate = `import { createServerHasuraClient } from "@settlemint/sdk-hasura";
import type { introspection } from "../../hasura-env.d.ts";

export const { client: hasuraClient, graphql: hasuraGraphql } = createServerHasuraClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
  };
}>({
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
  adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET!,
});`;

  await writeTemplate(clientTemplate, "/lib/settlemint", "hasura.ts");
}
