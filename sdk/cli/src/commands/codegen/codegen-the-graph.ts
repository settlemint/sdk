import { generateSchema } from "@gql.tada/cli-utils";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import { installDependencies, isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
import { note } from "@settlemint/sdk-utils/terminal";
import { type DotEnv, LOCAL_INSTANCE, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";
import { getVariableName } from "@/commands/codegen/utils/get-variable-name";
import { writeTemplate } from "@/commands/codegen/utils/write-template";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getSubgraphName } from "@/utils/subgraph/subgraph-name";

const PACKAGE_NAME = "@settlemint/sdk-thegraph";

export async function codegenTheGraph(env: DotEnv, subgraphNames?: string[]) {
  const gqlEndpoints = env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS;
  if (!Array.isArray(gqlEndpoints) || gqlEndpoints.length === 0) {
    return;
  }

  const instance = env.SETTLEMINT_INSTANCE;
  const accessToken =
    instance === STANDALONE_INSTANCE || instance === LOCAL_INSTANCE
      ? undefined
      : await getApplicationOrPersonalAccessToken({
          env,
          instance: env.SETTLEMINT_INSTANCE,
          prefer: "application",
        });

  const template = [
    `import { createTheGraphClient } from "${PACKAGE_NAME}";`,
    "import { createLogger, requestLogger, type LogLevel } from '@settlemint/sdk-utils/logging';",
  ];

  const toGenerate = gqlEndpoints.filter((gqlEndpoint) => {
    const name = getSubgraphName(gqlEndpoint);
    if (!name) {
      return false;
    }
    if (subgraphNames && !subgraphNames.includes(name)) {
      note(`[SKIPPED] Generating TheGraph subgraph ${name}`);
      return false;
    }
    const introspectionVariable = getVariableName(`${name}Introspection`);
    template.push(`import type { introspection as ${introspectionVariable} } from "@schemas/the-graph-env-${name}"`);
    return true;
  });

  template.push("", "const logger = createLogger({ level: process.env.SETTLEMINT_LOG_LEVEL as LogLevel });");

  for (const gqlEndpoint of toGenerate) {
    const name = getSubgraphName(gqlEndpoint)!;
    if (!name) {
      continue;
    }
    const introspectionVariable = getVariableName(`${name}Introspection`);
    note(`Generating TheGraph subgraph ${name}`);
    await generateSchema({
      input: gqlEndpoint,
      output: `the-graph-schema-${name}.graphql`,
      tsconfig: undefined,
      headers: accessToken
        ? {
            "x-auth-token": accessToken,
          }
        : {},
    });
    const nameSuffix = capitalizeFirstLetter(name);
    const graphqlClientVariable = getVariableName(`theGraphClient${nameSuffix}`);
    const graphqlVariable = getVariableName(`theGraphGraphql${nameSuffix}`);
    template.push(
      ...[
        `
export const { client: ${graphqlClientVariable}, graphql: ${graphqlVariable} } = createTheGraphClient<{
  introspection: ${introspectionVariable};
  disableMasking: true;
  // https://thegraph.com/docs/en/subgraphs/developing/creating/ql-schema/#built-in-scalar-types
  scalars: {
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: string;
  };
  }>({
  instances: JSON.parse(process.env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS || '[]'),
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
  subgraphName: "${name}",
  cache: "force-cache",
}, {
  fetch: requestLogger(logger, "the-graph-${name}", fetch) as typeof fetch,
});`,
      ],
    );
  }

  if (env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH) {
    const isDefaulSubgraphGenerated = toGenerate.some((gqlEndpoint) => {
      const name = getSubgraphName(gqlEndpoint);
      return name === env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH;
    });
    if (isDefaulSubgraphGenerated) {
      const nameSuffix = capitalizeFirstLetter(env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH);
      const graphqlClientVariable = getVariableName(`theGraphClient${nameSuffix}`);
      const graphqlVariable = getVariableName(`theGraphGraphql${nameSuffix}`);
      template.push(`
export const theGraphClient = ${graphqlClientVariable};
export const theGraphGraphql = ${graphqlVariable};
`);
    }
  }

  await writeTemplate(template.join("\n"), "/lib/settlemint", "the-graph.ts");

  const projectDir = await projectRoot();
  // Install the package only if it's not already installed
  if (!(await isPackageInstalled(PACKAGE_NAME, projectDir))) {
    await installDependencies(PACKAGE_NAME, projectDir);
  }
}
