import { generateSchema } from "@gql.tada/cli-utils";
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
  let adminSecret: string | undefined = undefined;
  const accessToken = options.env.SETTLEMINT_ACCESS_TOKEN;

  switch (options.type) {
    case "HASURA":
      gqlEndpoint = options.env.SETTLEMINT_HASURA_ENDPOINT;
      output = "hasura.schema.graphql";
      adminSecret = options.env.SETTLEMINT_HASURA_ADMIN_SECRET;
      break;
    case "PORTAL":
      gqlEndpoint = options.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
      output = "portal.schema.graphql";
      break;
    case "THEGRAPH":
      gqlEndpoint = options.env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT;
      output = "thegraph.schema.graphql";
      break;
    case "THEGRAPH_FALLBACK":
      gqlEndpoint = options.env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK;
      output = "thegraph-fallback.schema.graphql";
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
