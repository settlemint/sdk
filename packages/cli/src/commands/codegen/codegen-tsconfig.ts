import { writeFileSync } from "node:fs";
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
      thegraphFallback: false,
    };
  }

  const [hasura, portal, thegraph, thegraphFallback] = await Promise.all([
    testGqlEndpoint(env, env.SETTLEMINT_HASURA_ENDPOINT, true),
    testGqlEndpoint(env, env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT),
    testGqlEndpoint(env, env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT),
    testGqlEndpoint(env, env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK),
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
            },
          ]
        : []),
      ...(thegraph
        ? [
            {
              name: "thegraph",
              schema: "the-graph-schema.graphql",
              tadaOutputLocation: "the-graph-env.d.ts",
              tadaTurboLocation: "the-graph-cache.d.ts",
            },
          ]
        : []),
      ...(thegraphFallback
        ? [
            {
              name: "thegraph-fallback",
              schema: "the-graph-fallback-schema.graphql",
              tadaOutputLocation: "the-graph-fallback-env.d.ts",
              tadaTurboLocation: "the-graph-fallback-cache.d.ts",
            },
          ]
        : []),
      ...(portal
        ? [
            {
              name: "portal",
              schema: "portal-schema.graphql",
              tadaOutputLocation: "portal-env.d.ts",
              tadaTurboLocation: "portal-cache.d.ts",
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

  writeFileSync(tsconfig.path, JSON.stringify(tsconfig.config, null, 2), "utf8");

  return {
    hasura: hasura,
    portal: portal,
    thegraph: thegraph,
    thegraphFallback: thegraphFallback,
  };
}
