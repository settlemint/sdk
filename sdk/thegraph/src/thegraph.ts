import { runsOnServer } from "@settlemint/sdk-utils/runtime";
import { ApplicationAccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import { type AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";

/**
 * Type definition for GraphQL client configuration options
 */
export type RequestConfig = ConstructorParameters<typeof GraphQLClient>[1];

/**
 * Schema for validating client options for the TheGraph client.
 * Defines two possible runtime configurations:
 * 1. Server-side with instance URLs, access token and subgraph name
 * 2. Browser-side with just subgraph name
 */
export const ClientOptionsSchema = z.discriminatedUnion("runtime", [
  z.object({
    instances: z.array(UrlOrPathSchema),
    runtime: z.literal("server"),
    accessToken: ApplicationAccessTokenSchema,
    subgraphName: z.string(),
  }),
  z.object({
    runtime: z.literal("browser"),
    subgraphName: z.string(),
  }),
]);

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
  if (options.runtime === "server") {
    const instance = options.instances.find((instance) => instance.endsWith(`/${options.subgraphName}`));
    if (!instance) {
      throw new Error(`Instance for subgraph ${options.subgraphName} not found`);
    }
    return new URL(instance).toString();
  }
  return new URL(
    `/proxy/thegraph/graphql/${encodeURIComponent(options.subgraphName)}`,
    window?.location?.origin ?? "http://localhost:3000",
  ).toString();
}

/**
 * Creates a TheGraph GraphQL client with proper type safety using gql.tada
 *
 * @param options - Configuration options for the client:
 *                 - For server-side: instance URLs, access token and subgraph name
 *                 - For browser-side: just subgraph name
 * @param clientOptions - Optional GraphQL client configuration options
 * @returns An object containing:
 *          - client: The configured GraphQL client instance
 *          - graphql: The initialized gql.tada function for type-safe queries
 * @throws Will throw an error if the options fail validation against ClientOptionsSchema
 * @example
 * import { createTheGraphClient } from '@settlemint/sdk-thegraph';
 * import type { introspection } from '@schemas/the-graph-env-starterkits';
 *
 * // Server-side usage
 * const { client, graphql } = createTheGraphClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     DateTime: Date;
 *     JSON: Record<string, unknown>;
 *     Bytes: string;
 *     Int8: string;
 *     BigInt: string;
 *     BigDecimal: string;
 *     Timestamp: string;
 *   };
 * }>({
 *   instances: JSON.parse(process.env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS || '[]'),
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
 *   subgraphName: 'starterkits'
 * });
 *
 * // Browser-side usage
 * const { client, graphql } = createTheGraphClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     DateTime: Date;
 *     JSON: Record<string, unknown>;
 *     Bytes: string;
 *     Int8: string;
 *     BigInt: string;
 *     BigDecimal: string;
 *     Timestamp: string;
 *   };
 * }>({
 *   subgraphName: 'starterkits'
 * });
 *
 * // Making GraphQL queries
 * const query = graphql(`
 *   query SearchAssets {
 *     assets {
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
  options: Omit<ClientOptions, "runtime"> & Record<string, unknown>,
  clientOptions?: RequestConfig,
): {
  client: GraphQLClient;
  graphql: initGraphQLTada<Setup>;
} {
  const validatedOptions = validate(ClientOptionsSchema, {
    ...options,
    runtime: runsOnServer ? "server" : "browser",
  });
  const graphql = initGraphQLTada<Setup>();
  const fullUrl = getFullUrl(validatedOptions);

  return {
    client: new GraphQLClient(fullUrl, {
      ...clientOptions,
      ...(validatedOptions.runtime === "server" && {
        headers: {
          "x-auth-token": validatedOptions.accessToken,
        },
      }),
    }),
    graphql,
  };
}

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
