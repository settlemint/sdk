import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { generate } from "@graphql-codegen/cli";
import { findProjectRoot } from "@settlemint/sdk-config/path";

interface CreateGqlClientOptions {
  settleMintDir: string;
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
  const { settleMintDir, framework, type, gqlUrl, personalAccessToken } = options;

  // Create directory structure
  const typeQueriesDir = join(findProjectRoot(process.cwd()), "graphql", type);
  mkdirSync(join(settleMintDir, type, "gql"), { recursive: true });
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

  writeFileSync(
    `${typeQueriesDir}/apollo.config.js`,
    `module.exports = {
    client: {
      includes: ["./**/*.graphql", "./*.graphql"],
      service: {
        name: "settlemint-${type}",
        localSchemaFile: "../../.settlemint/${type}/gql/schema.graphql",
      },
    },
  };`,
  );

  await generate(
    {
      errorsOnly: true,
      silent: true,
      ignoreNoDocuments: true,
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
      config: {
        scalars: {
          ID: "string",
          BigInt: "string",
          BigDecimal: "string",
          date: "Date | string",
          Bytes: "string",
          Int8: "number",
          Upload: "Blob",
          Timestamp: "number",
          DateTime: "string",
          JSONObject: "Record<string, unknown>",
          JSON: "Record<string, unknown>",
        },
        strictScalars: false,
        avoidOptionals: true,
        constEnums: true,
        enumsAsTypes: true,
        nonOptionalTypename: true,
        enumsAsConst: true,
        useTypeImports: true,
        inlineFragmentTypes: "combine",
        exportFragmentSpreadSubTypes: true,
        useExplicitTyping: true,
        useConsts: true,
        withRefetchFn: true,
        pureMagicComment: true,
        includeDirectives: true,
        immutableTypes: true,
        allowEnumStringTypes: true,
      },
      generates: {
        [`${join(settleMintDir, type, "gql", "schema.graphql")}`]: {
          plugins: ["schema-ast"],
        },
        [`${join(settleMintDir, type, "gql", "sdk.ts")}`]: {
          plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
        },
      },
    },
    true,
  );

  return {
    importLine: `import { getSdk as ${type}GqlSdk } from './${type}/gql/sdk';`,
    sdkLine: {
      [type]: {
        gql: `${type}GqlSdk(sdkGenerator.createGraphqlClient("${type}")),`,
      },
    },
  };
}
