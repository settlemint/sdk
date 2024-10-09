import { writeTemplate } from "@/commands/codegen/write-template";
import { generateSchema } from "@gql.tada/cli-utils";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function codegenTheGraphFallback(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK;
  if (!gqlEndpoint) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  await generateSchema({
    input: gqlEndpoint,
    output: "the-graph-fallback-schema.graphql",
    tsconfig: undefined,
    headers: {
      "x-auth-token": accessToken,
    },
  });

  const serverSideTemplate = `import { createServerTheGraphClient } from "@settlemint/sdk-thegraph";
import type { introspection } from "../../the-graph-fallback-env.d.ts";

export const { client: theGraphFallbackClient, graphql: theGraphFallbackGraphql } = createServerTheGraphClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
  };
}>({
  instance: process.env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
});`;

  await writeTemplate(serverSideTemplate, "/lib/settlemint", "the-graph-fallback.ts");

  const clientSideTemplate = `import { createTheGraphClient } from "@settlemint/sdk-thegraph";
import type { introspection } from "../../../the-graph-fallback-env.d.ts";

export const { client: theGraphFallbackClient, graphql: theGraphFallbackGraphql } = createTheGraphClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
  };
}>({
  instance: "/proxy/thegraph-fallback/graphql",
});`;

  await writeTemplate(clientSideTemplate, "/lib/settlemint/clientside", "the-graph-fallback.ts");
}
