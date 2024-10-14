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
 * Creates a The Graph client for client-side use.
 *
 * @param options - The client options for configuring the The Graph client.
 * @param requestConfig - Optional configuration for GraphQL requests.
 * @returns An object containing the GraphQL client and the initialized graphql function.
 * @throws Will throw an error if the options fail validation.
 *
 * @example
 * const { client, graphql } = createTheGraphClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     DateTime: Date;
 *     JSON: Record<string, unknown>;
 *   };
 * }>({
 *   instance: 'https://your-thegraph-instance.com',
 * });
 */
export function createTheGraphClient<const Setup extends AbstractSetupSchema>(
  options: ClientOptions,
  requestConfig?: RequestConfig,
) {
  const validatedOptions = validate(ClientOptionsSchema, options);

  const graphql = initGraphQLTada<Setup>();
  const fullUrl = new URL(
    validatedOptions.instance,
    process.env.NEXTAUTH_URL ?? window?.location?.origin ?? "http://localhost:3000",
  ).toString();

  return {
    client: new GraphQLClient(fullUrl, requestConfig),
    graphql,
  };
}

export function createTheGraphFallbackClient<const Setup extends AbstractSetupSchema>(
  options: ClientOptions,
  requestConfig?: RequestConfig,
) {
  return createTheGraphClient(options, requestConfig);
}

/**
 * Creates a The Graph client for server-side use with additional authentication.
 *
 * @param options - The server client options for configuring the The Graph client.
 * @param requestConfig - Optional configuration for GraphQL requests.
 * @returns An object containing the GraphQL client and the initialized graphql function.
 * @throws Will throw an error if not called on the server or if the options fail validation.
 *
 * @example
 * const { client, graphql } = createServerTheGraphClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     DateTime: Date;
 *     JSON: Record<string, unknown>;
 *   };
 * }>({
 *   instance: 'https://your-thegraph-instance.com',
 *   accessToken: 'your-access-token',
 * });
 */
export function createServerTheGraphClient<const Setup extends AbstractSetupSchema>(
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

export function createServerTheGraphFallbackClient<const Setup extends AbstractSetupSchema>(
  options: ServerClientOptions,
  requestConfig?: RequestConfig,
): { client: GraphQLClient; graphql: initGraphQLTada<Setup> } {
  return createServerTheGraphClient(options, requestConfig);
}

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
