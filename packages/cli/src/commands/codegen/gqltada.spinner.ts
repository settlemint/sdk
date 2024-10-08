import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { generateOutput, generateSchema } from "@gql.tada/cli-utils";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import { spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { getTsconfig } from "get-tsconfig";

/**
 * Writes environment variables to .env files with a spinner for visual feedback.
 *
 * @param env - Partial environment variables to be written.
 * @param environment - The name of the environment (e.g., "development", "production").
 * @returns A promise that resolves when the environment variables are written.
 * @throws If there's an error writing the environment files.
 *
 * @example
 * await writeEnvSpinner(
 *   { SETTLEMINT_INSTANCE: "https://example.com", SETTLEMINT_ACCESS_TOKEN: "token123" },
 *   "development"
 * );
 */
export async function gqltadaSpinner(env: DotEnv) {
  const { hasura, portal, thegraph, thegraphFallback } = await spinner({
    startMessage: "Testing configured GraphQL schema",
    task: async () => {
      return codegenTsconfig(env);
    },
    stopMessage: "Tested GraphQL schemas",
  });

  const promises = [];
  if (hasura) {
    promises.push(codegenHasura(env));
  }
  if (portal) {
    promises.push(codegenPortal(env));
  }
  if (thegraph) {
    promises.push(codegenTheGraph(env));
  }
  if (thegraphFallback) {
    promises.push(codegenTheGraphFallback(env));
  }
  await Promise.all(promises);

  await generateOutput({
    output: undefined,
    tsconfig: undefined,
  });
}

/**
 * Tests a GraphQL endpoint with exponential retry.
 *
 * @param env - The environment variables.
 * @param gqlEndpoint - The GraphQL endpoint URL.
 * @param isHasura - Whether the endpoint is a Hasura endpoint.
 * @param maxRetries - Maximum number of retry attempts (default: 3).
 * @returns A boolean indicating whether the endpoint is accessible.
 */
async function testGqlEndpoint(env: DotEnv, gqlEndpoint?: string, isHasura = false, maxRetries = 3): Promise<boolean> {
  if (!gqlEndpoint) {
    return false;
  }
  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(gqlEndpoint, {
        method: "POST",
        headers: {
          "x-auth-token": accessToken,
          ...(isHasura ? { "x-hasura-admin-secret": env.SETTLEMINT_HASURA_ADMIN_SECRET ?? "" } : {}),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              __schema {
                types {
                  name
                }
              }
            }
          `,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.errors) {
        throw new Error("GraphQL errors in response");
      }

      return true; // Success
    } catch (error) {
      if (attempt === maxRetries - 1) {
        return false;
      }

      // Exponential backoff
      const delay = 2 ** attempt * 1000; // 1s, 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return false; // This line should never be reached, but TypeScript needs it
}

async function codegenTsconfig(env: DotEnv) {
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

async function codegenHasura(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_HASURA_ENDPOINT;
  if (!gqlEndpoint) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
  const adminSecret = env.SETTLEMINT_HASURA_ADMIN_SECRET!;

  await generateSchema({
    input: gqlEndpoint,
    output: "hasura-schema.graphql",
    tsconfig: undefined,
    headers: {
      "x-hasura-admin-secret": adminSecret,
      "x-auth-token": accessToken,
    },
  });

  const clientTemplate = `import { createServerHasuraClient } from "@settlemint/sdk-hasura";
import type { introspection } from "../../hasura-env.d.ts";

export const { client: hasuraClient, graphql: hasuraGraphql } = createServerHasuraClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
  };
}>({
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
  adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET!,
});`;

  await writeTemplate(clientTemplate, "/lib/settlemint", "hasura.ts");
}

async function codegenPortal(env: DotEnv) {
  const gqlEndpoint = env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
  if (!gqlEndpoint) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  await generateSchema({
    input: gqlEndpoint,
    output: "portal-schema.graphql",
    tsconfig: undefined,
    headers: {
      "x-auth-token": accessToken,
    },
  });

  const clientTemplate = `import { createServerPortalClient } from "@settlemint/sdk-portal";
import type { introspection } from "../../portal-env.d.ts";

export const { client: portalClient, graphql: portalGraphql } = createServerPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
  };
}>({
  instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
});`;

  await writeTemplate(clientTemplate, "/lib/settlemint", "portal.ts");
}

async function codegenTheGraph(env: DotEnv) {
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

  const clientTemplate = `import { createServerTheGraphClient } from "@settlemint/sdk-thegraph";
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

  await writeTemplate(clientTemplate, "/lib/settlemint", "the-graph.ts");
}

async function codegenTheGraphFallback(env: DotEnv) {
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

  const clientTemplate = `import { createServerTheGraphClient } from "@settlemint/sdk-thegraph";
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

  await writeTemplate(clientTemplate, "/lib/settlemint", "the-graph-fallback.ts");
}

async function writeTemplate(template: string, directory: string, filename: string) {
  const projectDir = await projectRoot();
  const codegenDir = join(projectDir, directory);
  mkdirSync(codegenDir, { recursive: true });
  const filePath = join(codegenDir, filename);
  writeFileSync(filePath, template, "utf8");
}
