import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { generateSchema } from "@gql.tada/cli-utils";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

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
  const tadaConfig = {
    name: "@0no-co/graphqlsp",
    schemas: [
      {
        name: "hasura",
        schema: "hasura-schema.graphql",
        tadaOutputLocation: "hasura-env.d.ts",
      },
      {
        name: "thegraph",
        schema: "thegraph-schema.graphql",
        tadaOutputLocation: "thegraph-env.d.ts",
      },
      {
        name: "thegraph-fallback",
        schema: "thegraph-fallback-schema.graphql",
        tadaOutputLocation: "thegraph-fallback-env.d.ts",
      },
      {
        name: "portal",
        schema: "portal-schema.graphql",
        tadaOutputLocation: "portal-env.d.ts",
      },
    ],
  };

  const projectDir = await projectRoot();
  const tsconfigFile = join(projectDir, "tsconfig.json");
  const tsconfigContent = readFileSync(tsconfigFile, "utf8");
  const tsconfig: {
    compilerOptions: {
      plugins?: {
        name: string;
        schemas: {
          name: string;
          schema: string;
          tadaOutputLocation: string;
        }[];
      }[];
    };
  } = JSON.parse(tsconfigContent);
  // Find the existing @0no-co/graphqlsp plugin or create a new one
  if (!tsconfig.compilerOptions.plugins) {
    tsconfig.compilerOptions.plugins = [];
  }
  let graphqlspPlugin = (tsconfig.compilerOptions.plugins ?? []).find((plugin) => plugin.name === "@0no-co/graphqlsp");

  if (!graphqlspPlugin) {
    // If the plugin doesn't exist, create it and add it to the plugins array
    graphqlspPlugin = { name: "@0no-co/graphqlsp", schemas: [] };
    tsconfig.compilerOptions.plugins.push(graphqlspPlugin);
  }

  // Update or add the schemas defined in tadaConfig
  for (const schema of tadaConfig.schemas) {
    const existingSchemaIndex = graphqlspPlugin.schemas.findIndex((s) => s.name === schema.name);
    if (existingSchemaIndex !== -1) {
      // Update existing schema
      graphqlspPlugin.schemas[existingSchemaIndex] = schema;
    } else {
      // Add new schema
      graphqlspPlugin.schemas.push(schema);
    }
  }

  // Write the updated tsconfig back to the file
  writeFileSync(tsconfigFile, JSON.stringify(tsconfig, null, 2), "utf8");

  await gqltadaCodegen({
    type: "HASURA",
    env,
  });
  await gqltadaCodegen({
    type: "PORTAL",
    env,
  });
  await gqltadaCodegen({
    type: "THEGRAPH",
    env,
    allowToFail: true,
  });
  await gqltadaCodegen({
    type: "THEGRAPH_FALLBACK",
    env,
  });
}

async function gqltadaCodegen(options: {
  type: "HASURA" | "PORTAL" | "THEGRAPH" | "THEGRAPH_FALLBACK";
  env: DotEnv;
  allowToFail?: boolean;
}) {
  let gqlEndpoint: string | undefined = undefined;
  let output: string;
  let turboOutput: string;
  let adminSecret: string | undefined = undefined;
  const accessToken = options.env.SETTLEMINT_ACCESS_TOKEN;

  switch (options.type) {
    case "HASURA":
      gqlEndpoint = options.env.SETTLEMINT_HASURA_ENDPOINT;
      output = "hasura-schema.graphql";
      turboOutput = "hasura-cache.d.ts";
      adminSecret = options.env.SETTLEMINT_HASURA_ADMIN_SECRET;
      break;
    case "PORTAL":
      gqlEndpoint = options.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
      output = "portal-schema.graphql";
      turboOutput = "portal-cache.d.ts";
      break;
    case "THEGRAPH":
      gqlEndpoint = options.env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT;
      output = "thegraph-schema.graphql";
      turboOutput = "thegraph-cache.d.ts";
      break;
    case "THEGRAPH_FALLBACK":
      gqlEndpoint = options.env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK;
      output = "thegraph-fallback-schema.graphql";
      turboOutput = "thegraph-fallback-cache.d.ts";
      break;
  }

  if (!gqlEndpoint) {
    return;
  }

  const headers = {
    ...(adminSecret && { "x-hasura-admin-secret": adminSecret }),
    "x-auth-token": accessToken,
    "Content-Type": "application/json",
  };

  try {
    // Test the endpoint with a simple introspection query
    const response = await fetch(gqlEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `
          query {
            __schema {
              queryType {
                name
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch schema: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    await generateSchema({
      input: gqlEndpoint,
      output,
      tsconfig: undefined,
      headers,
    });
  } catch (error) {
    if (options.allowToFail) {
      // ignore
    } else {
      throw error;
    }
  }
}
