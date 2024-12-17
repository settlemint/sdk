import { writeFile } from "node:fs/promises";
import { testGqlEndpoint } from "@/commands/codegen/test-gql-endpoint";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { getTsconfig } from "get-tsconfig";

export async function codegenTsconfig(env: DotEnv) {
  const tsconfig = getTsconfig();
  if (!tsconfig?.config) {
    return {
      hasura: false,
      portal: false,
      thegraph: false,
      blockscout: false,
    };
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
  if (!accessToken) {
    return {
      hasura: false,
      portal: false,
      thegraph: false,
      blockscout: false,
    };
  }

  const [hasura, portal, thegraph, blockscout] = await Promise.all([
    testGqlEndpoint(accessToken, env.SETTLEMINT_HASURA_ADMIN_SECRET, env.SETTLEMINT_HASURA_ENDPOINT, true),
    testGqlEndpoint(accessToken, undefined, env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT),
    testGqlEndpoint(accessToken, undefined, env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?.[0]),
    testGqlEndpoint(accessToken, undefined, env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT),
  ]);

  if (!tsconfig.config.compilerOptions) {
    tsconfig.config.compilerOptions = {};
  }
  if (!tsconfig.config.compilerOptions.plugins) {
    tsconfig.config.compilerOptions.plugins = [];
  }

  const tadaConfig = {
    name: "@0no-co/graphqlsp",
    schemas: [
      ...(hasura
        ? [
            {
              name: "hasura",
              schema: "hasura-schema.graphql",
              tadaOutputLocation: "hasura-env.d.ts",
              tadaTurboLocation: "hasura-cache.d.ts",
              trackFieldUsage: false,
            },
          ]
        : []),
      ...(thegraph && Array.isArray(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS)
        ? env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS.map((endpoint) => {
            const name = endpoint.split("/").pop() ?? "default";
            return {
              name: `thegraph-${name}`,
              schema: `the-graph-schema-${name}.graphql`,
              tadaOutputLocation: `the-graph-env-${name}.d.ts`,
              tadaTurboLocation: `the-graph-cache-${name}.d.ts`,
              trackFieldUsage: false,
            };
          })
        : []),
      ...(portal
        ? [
            {
              name: "portal",
              schema: "portal-schema.graphql",
              tadaOutputLocation: "portal-env.d.ts",
              tadaTurboLocation: "portal-cache.d.ts",
              trackFieldUsage: false,
            },
          ]
        : []),
      ...(blockscout
        ? [
            {
              name: "blockscout",
              schema: "blockscout-schema.graphql",
              tadaOutputLocation: "blockscout-env.d.ts",
              tadaTurboLocation: "blockscout-cache.d.ts",
              trackFieldUsage: false,
            },
          ]
        : []),
    ],
  };

  const graphqlspPlugin = tsconfig.config.compilerOptions.plugins.find((plugin) => plugin.name === "@0no-co/graphqlsp");
  if (graphqlspPlugin) {
    tsconfig.config.compilerOptions.plugins = tsconfig.config.compilerOptions.plugins.filter(
      (plugin) => plugin.name !== "@0no-co/graphqlsp",
    );
  }
  tsconfig.config.compilerOptions.plugins.push(tadaConfig);

  if (!tsconfig.config.compilerOptions.paths) {
    tsconfig.config.compilerOptions.paths = {};
  }
  tsconfig.config.compilerOptions.paths["@schemas/*"] = ["./*.d.ts"];

  await writeFile(tsconfig.path, JSON.stringify(tsconfig.config, null, 2), "utf8");

  return {
    hasura,
    portal,
    thegraph,
    blockscout,
  };
}
