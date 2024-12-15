import { writeTemplate } from "@/commands/codegen/write-template";
import { generateSchema } from "@gql.tada/cli-utils";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function codegenTheGraph(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT;
  if (!gqlEndpoint) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
  if (!accessToken) {
    return;
  }

  await generateSchema({
    input: gqlEndpoint,
    output: "the-graph-schema.graphql",
    tsconfig: undefined,
    headers: {
      "x-auth-token": accessToken,
    },
  });

  const template = `import { createTheGraphClient } from "@settlemint/sdk-thegraph";
import type { introspection } from "@schemas/the-graph-env";

export const { client: theGraphClient, graphql: theGraphGraphql } = createTheGraphClient<{
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
  instance: process.env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!, // undefined in browser, by design to not leak the secrets
});`;

  await writeTemplate(template, "/lib/settlemint", "the-graph.ts");
}
