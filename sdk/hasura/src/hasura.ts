import { extractBaseUrlBeforeSegment } from "@settlemint/sdk-utils";
import { appendHeaders } from "@settlemint/sdk-utils/http";
import { type Logger, requestLogger } from "@settlemint/sdk-utils/logging";
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
  accessToken: ApplicationAccessTokenSchema.optional(),
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
 * @param logger - Optional logger to use for logging the requests
 * @returns An object containing:
 *          - client: The configured GraphQL client instance
 *          - graphql: The initialized gql.tada function for type-safe queries
 * @throws Will throw an error if the options fail validation against ClientOptionsSchema
 * @example
 * import { createHasuraClient } from '@settlemint/sdk-hasura';
 * import type { introspection } from "@schemas/hasura-env";
 * import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
 *
 * const logger = createLogger();
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
 * }, {
 *   fetch: requestLogger(logger, "hasura", fetch) as typeof fetch,
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
  logger?: Logger,
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
      headers: appendHeaders(clientOptions?.headers, {
        "x-auth-token": validatedOptions.accessToken,
        "x-hasura-admin-secret": validatedOptions.adminSecret,
      }),
      fetch: (logger ? requestLogger(logger, "hasura", fetch) : fetch) as typeof fetch,
    }),
    graphql,
  };
}

/**
 * Creates a Hasura Metadata client
 *
 * @param options - Configuration options for the client
 * @param logger - Optional logger to use for logging the requests
 * @returns A function that can be used to make requests to the Hasura Metadata API
 * @throws Will throw an error if the options fail validation against ClientOptionsSchema
 * @example
 * import { createHasuraMetadataClient } from '@settlemint/sdk-hasura';
 *
 * const client = createHasuraMetadataClient({
 *   instance: process.env.SETTLEMINT_HASURA_ENDPOINT,
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
 *   adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET,
 * });
 *
 * const result = await client({
 *   type: "pg_get_source_tables",
 *   args: {
 *     source: "default",
 *   },
 * });
 */
export function createHasuraMetadataClient(options: ClientOptions, logger?: Logger) {
  ensureServer();
  const validatedOptions = validate(ClientOptionsSchema, options);
  const baseUrl = extractBaseUrlBeforeSegment(options.instance, "/v1/graphql");
  const queryEndpoint = new URL(`${baseUrl}/v1/metadata`).toString();
  const fetchInstance = logger ? requestLogger(logger, "hasura", fetch) : fetch;

  return async <T>(query: object): Promise<{ ok: boolean; data: T }> => {
    const response = await fetchInstance(queryEndpoint, {
      method: "POST",
      headers: appendHeaders(
        { "Content-Type": "application/json" },
        {
          "x-auth-token": validatedOptions.accessToken,
          "x-hasura-admin-secret": validatedOptions.adminSecret,
        },
      ),
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      return { ok: false, data: (await response.json()) as T };
    }

    return { ok: true, data: (await response.json()) as T };
  };
}

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
export { trackAllTables } from "./utils/track-all-tables.js";
