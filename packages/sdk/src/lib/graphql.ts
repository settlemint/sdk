import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { generate } from "@graphql-codegen/cli";
import { findProjectRoot } from "./path";

interface CreateGqlClientOptions {
  framework: string;
  gqlUrl: string;
  personalAccessToken: string;
}

interface CreateDefaultGqlClientOptions extends CreateGqlClientOptions {
  type: "portal" | "thegraph";
}

interface CreateHasuraGqlClientOptions extends CreateGqlClientOptions {
  type: "hasura";
  hasuraAdminSecret: string;
}

/**
 * Creates a Portal REST client based on the OpenAPI specification.
 * This function generates TypeScript types and a client for the Portal REST API.
 *
 * @param portalRest - The base URL of the Portal REST API
 * @param personalAccessToken - The personal access token for authentication
 */
export async function createGqlClient(options: CreateDefaultGqlClientOptions | CreateHasuraGqlClientOptions) {
  const { framework, type, gqlUrl, personalAccessToken } = options;

  // Create directory structure
  const root = findProjectRoot(process.cwd());
  const settleMintDir = join(root, ".settlemint");
  const typeDir = join(settleMintDir, type);
  const typeGqlDir = join(typeDir, "gql");
  const typeCodegenDir = join(typeGqlDir, "codegen");
  const typeQueriesDir = join(root, "graphql", type);
  mkdirSync(typeCodegenDir, { recursive: true });
  mkdirSync(typeQueriesDir, { recursive: true });

  if (type === "thegraph") {
    const hasBeenDeployedResult = await fetch(gqlUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": personalAccessToken,
      },
      body: JSON.stringify({ operationName: null, variables: {}, query: "{_meta { deployment }}" }),
      mode: "cors",
    });

    const hasBeenDeployedJson = (await hasBeenDeployedResult.json()) as {
      data?: { _meta: { deployment: string } };
      errors?: string[];
    };
    const hasNotBeenDeployed = (hasBeenDeployedJson?.errors?.length ?? 0) > 0;

    if (hasNotBeenDeployed) {
      return;
    }
  }

  if (framework === "nextjs") {
    writeFileSync(
      `${typeGqlDir}/index.ts`,
      `import { GraphQLClient } from "graphql-request";

export const ${type} = new GraphQLClient(\`\${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/${type}/graphql\`);`,
    );
  } else {
    writeFileSync(
      `${typeGqlDir}/index.ts`,
      `import { GraphQLClient } from "graphql-request";

if(globalThis.window?.document !== undefined){
  throw new Error('You cannot use this SDK in a browser environment as it would expose your secrets.')
}

if(!process.env.SETTLEMINT_PAT_TOKEN){
  throw new Error("SETTLEMINT_PAT_TOKEN environment variable is required");
}

${
  type === "hasura"
    ? `
if(!process.env.SETTLEMINT_HASURA_GQL_ADMIN_SECRET){
  throw new Error("SETTLEMINT_HASURA_GQL_ADMIN_SECRET environment variable is required");
}`
    : ""
}

export const ${type} = new GraphQLClient('${gqlUrl}', {
  headers: {
    "x-auth-token": process.env.SETTLEMINT_PAT_TOKEN,
    ${type === "hasura" ? '"x-hasura-admin-secret": process.env.SETTLEMINT_HASURA_GQL_ADMIN_SECRET,' : ""}
  },
});`,
    );
  }

  if (type === "portal") {
    writeFileSync(
      `${typeQueriesDir}/get-all-pending-and-recently-processed-transactions.graphql`,
      `query GetAllPendingAndRecentlyProcessedTransactions {
  getPendingAndRecentlyProcessedTransactions {
    records {
      address
      createdAt
      from
      functionName
      metadata
      transactionHash
      updatedAt
      receipt {
        type
        transactionIndex
        transactionHash
        to
        root
        status
        logsBloom
        logs
        gasUsed
        from
        effectiveGasPrice
        cumulativeGasUsed
        contractAddress
        blockNumber
        blockHash
        blobGasUsed
        blobGasPrice
      }
    }
  }
}`,
    );
  }

  await generate(
    {
      errorsOnly: true,
      silent: true,
      ignoreNoDocuments: true,
      generates: {
        [`${typeCodegenDir}/`]: {
          preset: "client",
          schema: [
            {
              [gqlUrl]: {
                headers: {
                  "x-auth-token": personalAccessToken,
                  ...(type === "hasura" ? { "x-hasura-admin-secret": options.hasuraAdminSecret } : {}),
                },
              },
            },
          ],
          documents: [`${typeQueriesDir}/*.graphql`, `${typeQueriesDir}/**/*.graphql`],
          presetConfig: {
            useTypeImports: true,
            nonOptionalTypename: true,
            dedupeFragments: true,
            avoidOptionals: true,
            fragmentMasking: false,
          },
          config: {
            scalars: {
              BigInt: "string",
              BigDecimal: "string",
              date: "Date | string",
              Bytes: "string",
              Int8: "number",
              Upload: "Blob",
              Timestamp: "number",
            },
            strictScalars: false,
          },
        },
      },
    },
    true,
  );
}
