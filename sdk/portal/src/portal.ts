import { runsOnServer } from "@settlemint/sdk-utils/runtime";
import { ApplicationAccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import { type AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";

/**
 * Configuration options for the GraphQL client, excluding 'url' and 'exchanges'.
 */
export type RequestConfig = ConstructorParameters<typeof GraphQLClient>[1];

/**
 * Schema for validating Portal client configuration options.
 * Discriminates between server and browser runtime environments.
 */
export const ClientOptionsSchema = z.discriminatedUnion("runtime", [
  z.object({
    instance: UrlOrPathSchema,
    runtime: z.literal("server"),
    accessToken: ApplicationAccessTokenSchema,
    cache: z.enum(["default", "force-cache", "no-cache", "no-store", "only-if-cached", "reload"]).optional(),
  }),
  z.object({
    runtime: z.literal("browser"),
    cache: z.enum(["default", "force-cache", "no-cache", "no-store", "only-if-cached", "reload"]).optional(),
  }),
]);

/**
 * Type representing the validated client options.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Constructs the Portal GraphQL endpoint URL based on runtime environment.
 *
 * @param options - The validated client options
 * @returns The complete GraphQL endpoint URL
 */
function getFullUrl(options: ClientOptions): string {
  return options.runtime === "server"
    ? new URL(options.instance).toString()
    : new URL("/proxy/portal/graphql", window?.location?.origin ?? "http://localhost:3000").toString();
}

/**
 * Gets the headers configuration based on runtime options
 *
 * @param options - The validated client options
 * @returns Headers configuration object or empty object
 */
function getHeaders(options: ClientOptions): Record<string, unknown> {
  if (options.runtime === "server") {
    return {
      headers: {
        "x-auth-token": options.accessToken,
      },
    };
  }
  return {};
}

/**
 * Creates a Portal GraphQL client with the provided configuration.
 *
 * @param options - Configuration options for the Portal client
 * @param clientOptions - Additional GraphQL client configuration options
 * @returns An object containing the configured GraphQL client and graphql helper function
 * @throws If the provided options fail validation
 *
 * @example
 * import { createPortalClient } from '@settlemint/sdk-portal';
 * import type { introspection } from "@schemas/portal-env";
 *
 * // Server-side usage
 * export const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     // Change unknown to the type you are using to store metadata
 *     JSON: unknown;
 *   };
 * }>({
 *   instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
 *   runtime: "server",
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
 * });
 *
 * // Browser-side usage
 * export const { client: portalBrowserClient, graphql: portalBrowserGraphql } = createPortalClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     // Change unknown to the type you are using to store metadata
 *     JSON: unknown;
 *   };
 * }>({});
 *
 * // Making GraphQL queries
 * const query = graphql(`
 *   query GetPendingTransactions {
 *     getPendingTransactions {
 *       count
 *     }
 *   }
 * `);
 *
 * const result = await client.request(query);
 */
export function createPortalClient<const Setup extends AbstractSetupSchema>(
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
      ...getHeaders(validatedOptions),
    }),
    graphql,
  };
}

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
