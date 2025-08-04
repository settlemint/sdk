import { appendHeaders } from "@settlemint/sdk-utils/http";
import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { ApplicationAccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import { type AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import { createTheGraphClientWithPagination } from "./utils/pagination.js";

/**
 * Type definition for GraphQL client configuration options
 */
export type RequestConfig = ConstructorParameters<typeof GraphQLClient>[1];

/**
 * Schema for validating client options for the TheGraph client.
 */
export const ClientOptionsSchema = z.object({
  instances: z.array(UrlOrPathSchema),
  accessToken: ApplicationAccessTokenSchema.optional(),
  subgraphName: z.string(),
  cache: z.enum(["default", "force-cache", "no-cache", "no-store", "only-if-cached", "reload"]).optional(),
});

/**
 * Type definition for client options derived from the ClientOptionsSchema
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Constructs the full URL for TheGraph GraphQL API based on the provided options
 *
 * @param options - The client options for configuring TheGraph client
 * @returns The complete GraphQL API URL as a string
 * @throws Will throw an error if no matching instance is found for the specified subgraph
 */
function getFullUrl(options: ClientOptions): string {
  const instance = options.instances.find((instance) => instance.endsWith(`/${options.subgraphName}`));
  if (!instance) {
    throw new Error(`Instance for subgraph ${options.subgraphName} not found`);
  }
  return new URL(instance).toString();
}

/**
 * Creates a TheGraph GraphQL client with proper type safety using gql.tada
 *
 * @param options - Configuration options for the client including instance URLs,
 *                  access token and subgraph name
 * @param clientOptions - Optional GraphQL client configuration options
 * @returns An object containing:
 *          - client: The configured GraphQL client instance
 *          - graphql: The initialized gql.tada function for type-safe queries
 * @throws Will throw an error if the options fail validation against ClientOptionsSchema
 * @example
 * import { createTheGraphClient } from '@settlemint/sdk-thegraph';
 * import type { introspection } from '@schemas/the-graph-env-kits';
 * import { createLogger, requestLogger } from '@settlemint/sdk-utils/logging';
 *
 * const logger = createLogger();
 *
 * const { client, graphql } = createTheGraphClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     Bytes: string;
 *     Int8: string;
 *     BigInt: string;
 *     BigDecimal: string;
 *     Timestamp: string;
 *   };
 * }>({
 *   instances: JSON.parse(process.env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS || '[]'),
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
 *   subgraphName: 'kits'
 * }, {
 *   fetch: requestLogger(logger, "the-graph-kits", fetch) as typeof fetch,
 * });
 *
 * // Making GraphQL queries
 * const query = graphql(`
 *   query SearchAssets {
 *     assets @fetchAll {
 *       id
 *       name
 *       symbol
 *     }
 *   }
 * `);
 *
 * const result = await client.request(query);
 */
export function createTheGraphClient<const Setup extends AbstractSetupSchema>(
  options: ClientOptions,
  clientOptions?: RequestConfig,
): {
  client: GraphQLClient;
  graphql: initGraphQLTada<Setup>;
} {
  ensureServer();
  const validatedOptions = validate(ClientOptionsSchema, options);
  const graphql = initGraphQLTada<Setup>();
  const fullUrl = getFullUrl(validatedOptions);

  const client = new GraphQLClient(fullUrl, {
    ...clientOptions,
    headers: appendHeaders(clientOptions?.headers, { "x-auth-token": validatedOptions.accessToken }),
  });
  const originalRequest = client.request.bind(client);
  const paginatedClient = createTheGraphClientWithPagination({
    request: originalRequest,
  });
  client.request = paginatedClient.query;
  return {
    client,
    graphql,
  };
}

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
export { createTheGraphClientWithPagination } from "./utils/pagination.js";
