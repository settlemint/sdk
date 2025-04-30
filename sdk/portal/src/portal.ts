import { ensureServer } from "@settlemint/sdk-utils/runtime";
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
 */
export const ClientOptionsSchema = z.object({
  instance: UrlOrPathSchema,
  accessToken: ApplicationAccessTokenSchema,
  cache: z.enum(["default", "force-cache", "no-cache", "no-store", "only-if-cached", "reload"]).optional(),
});

/**
 * Type representing the validated client options.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Creates a Portal GraphQL client with the provided configuration.
 *
 * @param options - Configuration options for the Portal client
 * @param clientOptions - Additional GraphQL client configuration options
 * @returns An object containing the configured GraphQL client and graphql helper function
 * @throws If the provided options fail validation
 *
 * @example
 * {@includeCode ../../../test/portal.e2e.test.ts#imports,example}
 */
export function createPortalClient<const Setup extends AbstractSetupSchema>(
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
      headers: { ...(clientOptions?.headers ?? {}), "x-auth-token": validatedOptions.accessToken },
    }),
    graphql,
  };
}

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
