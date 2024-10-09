import { writeTemplate } from "@/commands/codegen/write-template";
import { generateSchema } from "@gql.tada/cli-utils";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function codegenTheGraph(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK;
  if (!gqlEndpoint) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  await generateSchema({
    input: gqlEndpoint,
    output: "the-graph-schema.graphql",
    tsconfig: undefined,
    headers: {
      "x-auth-token": accessToken,
    },
  });

  const serverSideTemplate = `import { createServerTheGraphClient } from "@settlemint/sdk-thegraph";
import type { introspection } from "../../the-graph-env.d.ts";

export const { client: theGraphClient, graphql: theGraphGraphql } = createServerTheGraphClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
  };
}>({
  instance: process.env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
});`;

  await writeTemplate(serverSideTemplate, "/lib/settlemint", "the-graph.ts");

  const clientSideTemplate = `import { createTheGraphClient } from "@settlemint/sdk-thegraph";
  import type { introspection } from "../../the-graph-env.d.ts";

  export const { client: theGraphClient, graphql: theGraphGraphql } = createTheGraphClient<{
    introspection: introspection;
    disableMasking: true;
    scalars: {
      DateTime: Date;
      JSON: Record<string, unknown>;
    };
  }>({
    instance: "/proxy/thegraph/graphql",
  });`;

  await writeTemplate(clientSideTemplate, "/lib/settlemint/clientside", "the-graph.ts");
}
