import { rm, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { writeTemplate } from "@/commands/codegen/write-template";
import { generateSchema } from "@gql.tada/cli-utils";
import type { DotEnv } from "@settlemint/sdk-utils";

export async function codegenBlockscout(env: DotEnv) {
  const endpoint = env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    return;
  }

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  // gql.tada has an introspection query which exceeds the max complexity configured in blockscout
  // This query is the same one that blockscout uses on its playground for introspection
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "x-auth-token": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query IntrospectionQuery {
          __schema {
            queryType { name }
            mutationType { name }
            types {
              ...FullType
            }
            directives {
              name
              description
              locations
              args {
                ...InputValue
              }
            }
          }
        }

        fragment FullType on __Type {
          kind
          name
          description
          fields(includeDeprecated: true) {
            name
            description
            args {
              ...InputValue
            }
            type {
              ...TypeRef
            }
            isDeprecated
            deprecationReason
          }
          inputFields {
            ...InputValue
          }
          interfaces {
            ...TypeRef
          }
          enumValues(includeDeprecated: true) {
            name
            description
            isDeprecated
            deprecationReason
          }
          possibleTypes {
            ...TypeRef
          }
        }

        fragment InputValue on __InputValue {
          name
          description
          type { ...TypeRef }
          defaultValue
        }

        fragment TypeRef on __Type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                        ofType {
                          kind
                          name
                          ofType {
                            kind
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
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

  const introspectionJsonPath = resolve(process.cwd(), "__blockscout-introspection__.json");
  await writeFile(introspectionJsonPath, JSON.stringify(data.data));

  try {
    await generateSchema({
      input: basename(introspectionJsonPath),
      output: "blockscout-schema.graphql",
      tsconfig: undefined,
      headers: undefined,
    });
  } finally {
    await rm(introspectionJsonPath);
  }

  const template = `import { createBlockscoutClient } from "@settlemint/sdk-blockscout";
import type { introspection } from "@schemas/blockscout-env";

export const { client: blockscoutClient, graphql: blockscoutGraphql } = createBlockscoutClient<{
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
  instance: process.env.SETTLEMINT_BLOCKSCOUT_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!, // undefined in browser, by design to not leak the secrets
});

export const blockscoutUiEndpoint = process.env.SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT!;`;

  await writeTemplate(template, "/lib/settlemint", "blockscout.ts");
}
