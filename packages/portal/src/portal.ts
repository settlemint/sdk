import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { validate } from "@settlemint/sdk-utils/validation";
import { type AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import { GraphQLClient } from "graphql-request";
import {
  type ClientOptions,
  ClientOptionsSchema,
  type ServerClientOptions,
  ServerClientOptionsSchema,
} from "./helpers/client-options.schema.js";

export type RequestConfig = ConstructorParameters<typeof GraphQLClient>[1];

/**
 * Creates a Portal client for client-side use.
 *
 * @param options - The client options for configuring the Portal client.
 * @param requestConfig - Optional configuration for GraphQL requests.
 * @returns An object containing the GraphQL client and the initialized graphql function.
 * @throws Will throw an error if the options fail validation.
 *
 * @example
 * const { client, graphql } = createPortalClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     DateTime: Date;
 *     JSON: Record<string, unknown>;
 *   };
 * }>({
 *   instance: 'https://your-portal-instance.com',
 * });
 */
export function createPortalClient<const Setup extends AbstractSetupSchema>(
  options: ClientOptions,
  requestConfig?: RequestConfig,
): { client: GraphQLClient; graphql: initGraphQLTada<Setup> } {
  const validatedOptions = validate(ClientOptionsSchema, options);

  const graphql = initGraphQLTada<Setup>();
  const fullUrl = new URL(validatedOptions.instance, window.location.origin).toString();

  return {
    client: new GraphQLClient(fullUrl, requestConfig),
    graphql,
  };
}

/**
 * Creates a Portal client for server-side use with additional authentication.
 *
 * @param options - The server client options for configuring the Portal client.
 * @param requestConfig - Optional configuration for GraphQL requests.
 * @returns An object containing the GraphQL client and the initialized graphql function.
 * @throws Will throw an error if not called on the server or if the options fail validation.
 *
 * @example
 * const { client, graphql } = createServerPortalClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     DateTime: Date;
 *     JSON: Record<string, unknown>;
 *   };
 * }>({
 *   instance: 'https://your-portal-instance.com',
 *   accessToken: 'your-access-token',
 *   adminSecret: 'your-admin-secret',
 * });
 */
export function createServerPortalClient<const Setup extends AbstractSetupSchema>(
  options: ServerClientOptions,
  requestConfig?: RequestConfig,
): { client: GraphQLClient; graphql: initGraphQLTada<Setup> } {
  ensureServer();
  const validatedOptions = validate(ServerClientOptionsSchema, options);

  const graphql = initGraphQLTada<Setup>();

  return {
    client: new GraphQLClient(validatedOptions.instance, {
      ...requestConfig,
      headers: {
        ...requestConfig?.headers,
        "x-auth-token": validatedOptions.accessToken,
      },
    }),
    graphql,
  };
}

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
