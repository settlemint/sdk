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
 * Schema for validating client options for the Hasura client.
 */
export const ClientOptionsSchema = z.object({
  instance: UrlOrPathSchema,
  accessToken: ApplicationAccessTokenSchema,
  adminSecret: z.string(),
  cache: z.enum(["default", "force-cache", "no-cache", "no-store", "only-if-cached", "reload"]).optional(),
});

/**
 * Type definition for client options derived from the ClientOptionsSchema.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Creates a Hasura GraphQL client with proper type safety using gql.tada
 *
 * @param options - Configuration options for the client
 * @param clientOptions - Optional GraphQL client configuration options
 * @returns An object containing:
 *          - client: The configured GraphQL client instance
 *          - graphql: The initialized gql.tada function for type-safe queries
 * @throws Will throw an error if the options fail validation against ClientOptionsSchema
 * @example
 * import { createHasuraClient } from '@settlemint/sdk-hasura';
 * import type { introspection } from "@schemas/hasura-env";
 *
 * const { client, graphql } = createHasuraClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     timestamp: string;
 *     timestampz: string;
 *     uuid: string;
 *     date: string;
 *     time: string;
 *     jsonb: string;
 *     numeric: string;
 *     interval: string;
 *     geometry: string;
 *     geography: string;
 *   };
 * }>({
 *   instance: process.env.SETTLEMINT_HASURA_ENDPOINT,
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
 *   adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET,
 * });
 *
 * // Making GraphQL queries
 * const query = graphql(`
 *   query GetUsers {
 *     users {
 *       id
 *       name
 *       email
 *     }
 *   }
 * `);
 *
 * const result = await client.request(query);
 */
export function createHasuraClient<const Setup extends AbstractSetupSchema>(
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
        "x-hasura-admin-secret": validatedOptions.adminSecret,
      },
    }),
    graphql,
  };
}

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
