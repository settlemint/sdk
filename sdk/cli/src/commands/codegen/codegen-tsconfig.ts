import { writeFile } from "node:fs/promises";
import { testGqlEndpoint } from "@/commands/codegen/utils/test-gql-endpoint";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { note } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { getTsconfig } from "get-tsconfig";

export async function codegenTsconfig(env: DotEnv, thegraphSubgraphNames?: string[]) {
  const tsconfig = getTsconfig();
  if (!tsconfig?.config) {
    return {
      hasura: false,
      portal: false,
      thegraph: false,
      blockscout: false,
    };
  }

  const accessToken = await getApplicationOrPersonalAccessToken({
    env,
    instance: env.SETTLEMINT_INSTANCE,
    prefer: "application",
  });
  if (!accessToken) {
    note("No access token found, skipping codegen for hasura, portal, thegraph and blockscout", "warn");
    return {
      hasura: false,
      portal: false,
      thegraph: false,
      blockscout: false,
    };
  }

  const theGraphEndpoints = (env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS ?? []).filter((gqlEndpoint) => {
    const name = gqlEndpoint.split("/").pop();
    return name && (!thegraphSubgraphNames || thegraphSubgraphNames.includes(name));
  });

  const [hasura, portal, blockscout] = await Promise.all([
    testGqlEndpoint({
      accessToken,
      hasuraAdminSecret: env.SETTLEMINT_HASURA_ADMIN_SECRET,
      gqlEndpoint: env.SETTLEMINT_HASURA_ENDPOINT,
      isHasura: true,
    }),
    testGqlEndpoint({
      accessToken,
      gqlEndpoint: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
    }),
    testGqlEndpoint({
      accessToken,
      gqlEndpoint: env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT,
    }),
  ]);
  const thegraph = await Promise.all(
    theGraphEndpoints.map(async (endpoint) => {
      const success = await testGqlEndpoint({
        accessToken,
        gqlEndpoint: endpoint,
      });
      return { success, endpoint };
    }),
  );

  if (!tsconfig.config.compilerOptions) {
    tsconfig.config.compilerOptions = {};
  }
  if (!tsconfig.config.compilerOptions.plugins) {
    tsconfig.config.compilerOptions.plugins = [];
  }

  const tadaConfig = {
    name: "gql.tada/ts-plugin",
    trackFieldUsage: false,
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
      ...thegraph
        .filter((endpoint) => endpoint.success)
        .map(({ endpoint }) => {
          const name = endpoint.split("/").pop()!;
          return {
            name: `thegraph-${name}`,
            schema: `the-graph-schema-${name}.graphql`,
            tadaOutputLocation: `the-graph-env-${name}.d.ts`,
            tadaTurboLocation: `the-graph-cache-${name}.d.ts`,
          };
        }),
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
      ...(blockscout
        ? [
            {
              name: "blockscout",
              schema: "blockscout-schema.graphql",
              tadaOutputLocation: "blockscout-env.d.ts",
              tadaTurboLocation: "blockscout-cache.d.ts",
            },
          ]
        : []),
    ],
  };

  type Plugin = (typeof tsconfig.config.compilerOptions.plugins)[number];
  const isGraphqlTadaPlugin = (plugin: Plugin) =>
    plugin.name === "gql.tada/ts-plugin" || plugin.name === "@0no-co/graphqlsp";
  const hasGraphqlspPlugin = tsconfig.config.compilerOptions.plugins.some(isGraphqlTadaPlugin);
  if (hasGraphqlspPlugin) {
    tsconfig.config.compilerOptions.plugins = tsconfig.config.compilerOptions.plugins.filter(
      (plugin) => !isGraphqlTadaPlugin(plugin),
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
    thegraph: thegraph.filter((endpoint) => endpoint.success).length > 0,
    blockscout,
  };
}
