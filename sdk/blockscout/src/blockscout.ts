import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { ApplicationAccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import { type AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";

/**
 * Type definition for GraphQL client configuration options
 */
export type RequestConfig = ConstructorParameters<typeof GraphQLClient>[1];

/**
 * Schema for validating client options for the Blockscout client.
 */
export const ClientOptionsSchema = z.object({
  instance: UrlOrPathSchema,
  accessToken: ApplicationAccessTokenSchema,
});

/**
 * Type definition for client options derived from the ClientOptionsSchema
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Creates a Blockscout GraphQL client with proper type safety using gql.tada
 *
 * @param options - Configuration options for the client
 * @param clientOptions - Optional GraphQL client configuration options
 * @returns An object containing the GraphQL client and initialized gql.tada function
 * @throws Will throw an error if the options fail validation
 * @example
 * import { createBlockscoutClient } from '@settlemint/sdk-blockscout';
 * import type { introspection } from "@schemas/blockscout-env";
 * import { createLogger, requestLogger } from '@settlemint/sdk-utils/logging';
 *
 * const logger = createLogger();
 *
 * const { client, graphql } = createBlockscoutClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     AddressHash: string;
 *     Data: string;
 *     DateTime: string;
 *     Decimal: string;
 *     FullHash: string;
 *     Json: string;
 *     NonceHash: string;
 *     Wei: string;
 *   };
 * }>({
 *   instance: process.env.SETTLEMINT_BLOCKSCOUT_ENDPOINT,
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN
 * }, {
 *   fetch: requestLogger(logger, "blockscout", fetch) as typeof fetch,
 * });
 *
 * // Making GraphQL queries
 * const query = graphql(`
 *   query GetTransaction($hash: String!) {
 *     transaction(hash: $hash) {
 *       hash
 *       blockNumber
 *       value
 *       gasUsed
 *     }
 *   }
 * `);
 *
 * const result = await client.request(query, {
 *   hash: "0x123abc..."
 * });
 */
export function createBlockscoutClient<const Setup extends AbstractSetupSchema>(
  options: ClientOptions,
  clientOptions?: RequestConfig,
): {
  client: GraphQLClient;
  graphql: initGraphQLTada<Setup>;
} {
  ensureServer();
  const validatedOptions = validate(ClientOptionsSchema, options);
  const graphql = initGraphQLTada<Setup>();
  const fullUrl = new URL(validatedOptions.instance).toString();

  return {
    client: new GraphQLClient(fullUrl, {
      ...clientOptions,
      headers: {
        ...(clientOptions?.headers ?? {}),
        "x-auth-token": validatedOptions.accessToken,
      },
    }),
    graphql,
  };
}

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
