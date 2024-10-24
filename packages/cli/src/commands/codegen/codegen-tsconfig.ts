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
    };
  }

  const [hasura, portal, thegraph] = await Promise.all([
    testGqlEndpoint(
      env.SETTLEMINT_ACCESS_TOKEN,
      env.SETTLEMINT_HASURA_ADMIN_SECRET,
      env.SETTLEMINT_HASURA_ENDPOINT,
      true,
    ),
    testGqlEndpoint(env.SETTLEMINT_ACCESS_TOKEN, undefined, env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT),
    testGqlEndpoint(env.SETTLEMINT_ACCESS_TOKEN, undefined, env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT),
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

  if (!tsconfig.config.compilerOptions.paths) {
    tsconfig.config.compilerOptions.paths = {};
  }
  tsconfig.config.compilerOptions.paths["@schemas/*"] = ["./*.d.ts"];

  writeFileSync(tsconfig.path, JSON.stringify(tsconfig.config, null, 2), "utf8");

  return {
    hasura: hasura,
    portal: portal,
    thegraph: thegraph,
  };
}
