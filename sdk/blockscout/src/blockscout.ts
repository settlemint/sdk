import { runsOnServer } from "@settlemint/sdk-utils/runtime";
import { ApplicationAccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import { type AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";

/**
 * Options for configuring the GraphQL client, excluding 'url' and other configuration options.
 */
export type RequestConfig = ConstructorParameters<typeof GraphQLClient>[1];

/**
 * Schema for validating client options for the Blockscout client.
 * Defines two possible runtime configurations:
 * 1. Server-side with instance URL and access token
 * 2. Browser-side with no additional configuration needed
 */
export const ClientOptionsSchema = z.discriminatedUnion("runtime", [
  z.object({
    instance: UrlOrPathSchema,
    runtime: z.literal("server"),
    accessToken: ApplicationAccessTokenSchema,
  }),
  z.object({
    runtime: z.literal("browser"),
  }),
]);

/**
 * Type definition for client options derived from the ClientOptionsSchema.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Constructs the full URL for the Blockscout GraphQL API based on the provided options.
 * For server-side runtime, uses the provided instance URL.
 * For browser-side runtime, constructs a proxy URL using window location.
 *
 * @param options - The client options for configuring the Blockscout client
 * @returns The complete GraphQL API URL as a string
 */
function getFullUrl(options: ClientOptions): string {
  return options.runtime === "server"
    ? new URL(options.instance).toString()
    : new URL("/proxy/blockscout/graphql", window?.location?.origin ?? "http://localhost:3000").toString();
}

/**
 * Creates a Blockscout GraphQL client with proper type safety using gql.tada
 *
 * @param options - Configuration options for the client:
 *                 - For server-side: instance URL and access token
 *                 - For browser-side: no additional configuration needed
 * @param clientOptions - Optional GraphQL client configuration options
 * @returns An object containing:
 *          - client: The configured GraphQL client instance
 *          - graphql: The initialized gql.tada function for type-safe queries
 * @throws Will throw an error if the options fail validation against ClientOptionsSchema
 */
export function createBlockscoutClient<const Setup extends AbstractSetupSchema>(
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
