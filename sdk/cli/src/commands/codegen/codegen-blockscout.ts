import { rm, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { writeTemplate } from "@/commands/codegen/utils/write-template";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { generateSchema } from "@gql.tada/cli-utils";
import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import { graphqlFetchWithRetry } from "@settlemint/sdk-utils/http";
import { installDependencies, isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
import { note } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

const PACKAGE_NAME = "@settlemint/sdk-blockscout";

export async function codegenBlockscout(env: DotEnv) {
  const endpoint = env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    return;
  }

  const accessToken = await getApplicationOrPersonalAccessToken({
    env,
    instance: env.SETTLEMINT_INSTANCE,
    prefer: "application",
  });
  if (!accessToken) {
    return;
  }

  const introspectionJsonPath = resolve(process.cwd(), "__blockscout-introspection__.json");

  try {
    // gql.tada has an introspection query which exceeds the max complexity configured in blockscout
    // This query is the same one that blockscout uses on its playground for introspection
    const data = await graphqlFetchWithRetry(endpoint, {
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
    await writeFile(introspectionJsonPath, JSON.stringify(data));
  } catch (err) {
    const error = err as Error;
    note(`GraphQL endpoint '${endpoint}' is not reachable: ${error.message}`, "warn");
    return;
  }

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

  const template = `import { createBlockscoutClient } from "${PACKAGE_NAME}";
import type { introspection } from "@schemas/blockscout-env";
import { createLogger, requestLogger } from '@settlemint/sdk-utils/logging';

const logger = createLogger({ level: process.env.NODE_ENV === 'production' ? 'warn' : 'info' });

export const { client: blockscoutClient, graphql: blockscoutGraphql } = createBlockscoutClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    /** 40 hex characters (160 bits/20 bytes) derived from the public key, prefixed with 0x */
    AddressHash: string;
    /** Unpadded big-endian hexadecimal number where each byte pair maps to underlying binary */
    Data: string;
    /** ISO8601 formatted UTC datetime string */
    DateTime: string;
    /** String representation of a signed double-precision decimal value */
    Decimal: string;
    /** 32-byte KECCAK-256 hash */
    FullHash: string;
    /** Arbitrary JSON string data as UTF-8 */
    Json: string;
    /** 16 hex character (128 bits/8 bytes) nonce from Proof-of-Work */
    NonceHash: string;
    /** Smallest fractional unit of Ether, represented as a string for integer math */
    Wei: string;
  };
}>({
  instance: process.env.SETTLEMINT_BLOCKSCOUT_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
}, {
  fetch: requestLogger(logger, "blockscout", fetch) as typeof fetch,
});

export const blockscoutUiEndpoint = process.env.SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT!;`;

  await writeTemplate(template, "/lib/settlemint", "blockscout.ts");

  const projectDir = await projectRoot();
  // Install the package only if it's not already installed
  if (!(await isPackageInstalled(PACKAGE_NAME, projectDir))) {
    await installDependencies(PACKAGE_NAME, projectDir);
  }
}
