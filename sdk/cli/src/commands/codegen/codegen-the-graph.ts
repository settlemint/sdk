import { writeTemplate } from "@/commands/codegen/write-template";
import { generateSchema } from "@gql.tada/cli-utils";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function codegenTheGraph(env: DotEnv) {
  const gqlEndpoints = env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS;
  if (!Array.isArray(gqlEndpoints) || gqlEndpoints.length === 0) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
  if (!accessToken) {
    return;
  }

  const template = [
    `import { createTheGraphClient } from "@settlemint/sdk-thegraph";`,
    `import type { introspection } from "@schemas/the-graph-env"`,
  ];

  for (const gqlEndpoint of gqlEndpoints) {
    const name = gqlEndpoint.split("/").pop() ?? "default";
    await generateSchema({
      input: gqlEndpoint,
      output: `the-graph-schema-${name}.graphql`,
      tsconfig: undefined,
      headers: {
        "x-auth-token": accessToken,
      },
    });
    template.push(
      ...[
        `  export const { client: theGraphClient${capitalizeFirstLetter(name)}, graphql: theGraphGraphql${capitalizeFirstLetter(name)} } = createTheGraphClient<{
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
      instances: process.env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS!,
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!, // undefined in browser, by design to not leak the secrets
      subgraphName: "${name}",
    });`,
      ],
      "",
    );

    await writeTemplate(template.join("\n"), "/lib/settlemint", `the-graph-${name}.ts`);
  }
}
