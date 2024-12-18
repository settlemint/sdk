import { writeTemplate } from "@/commands/codegen/write-template";
import { generateSchema } from "@gql.tada/cli-utils";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { note } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export async function codegenTheGraph(env: DotEnv, subgraphNames?: string[]) {
  const gqlEndpoints = env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS;
  if (!Array.isArray(gqlEndpoints) || gqlEndpoints.length === 0) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
  if (!accessToken) {
    return;
  }

  const template = [`import { createTheGraphClient } from "@settlemint/sdk-thegraph";`];

  const toGenerate = gqlEndpoints.filter((gqlEndpoint) => {
    const name = gqlEndpoint.split("/").pop();
    if (!name) {
      return false;
    }
    if (subgraphNames && !subgraphNames.includes(name)) {
      note(`[SKIPPED] Generating TheGraph subgraph ${name}`);
      return false;
    }
    template.push(`import type { introspection as ${name}Introspection } from "@schemas/the-graph-env-${name}"`);
    return true;
  });

  for (const gqlEndpoint of toGenerate) {
    const name = gqlEndpoint.split("/").pop()!;
    note(`Generating TheGraph subgraph ${name}`);
    await generateSchema({
      input: gqlEndpoint,
      output: `the-graph-schema-${name}.graphql`,
      tsconfig: undefined,
      headers: {
        "x-auth-token": accessToken,
      },
    });
    const nameSuffix = toGenerate.length === 1 ? "" : capitalizeFirstLetter(name);
    template.push(
      ...[
        `
export const { client: theGraphClient${nameSuffix}, graphql: theGraphGraphql${nameSuffix} } = createTheGraphClient<{
  introspection: ${name}Introspection;
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
  instances: JSON.parse(process.env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS!),
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!, // undefined in browser, by design to not leak the secrets
  subgraphName: "${name}",
});`,
      ],
    );
  }
  await writeTemplate(template.join("\n"), "/lib/settlemint", "the-graph.ts");
}
