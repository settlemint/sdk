import { GraphQLClient } from "graphql-request";

type GraphQLClientType = "portal" | "thegraph" | "hasura";

/**
 * Creates a GraphQL client for the specified type.
 *
 * This function generates a new GraphQL client instance based on the provided client type.
 * It uses the SETTLEMINT_APP_URL environment variable to construct the GraphQL endpoint URL.
 *
 * @param type - The type of GraphQL client to create.
 * @returns A new GraphQL client instance.
 * @throws {Error} If an invalid GraphQL client type is provided.
 * @throws {Error} If the SETTLEMINT_APP_URL environment variable is not defined.
 *
 * @example
 * ```typescript
 * const portalClient = createGraphqlClient('portal');
 * const thegraphClient = createGraphqlClient('thegraph');
 * const hasuraClient = createGraphqlClient('hasura');
 * ```
 */
export function createGraphqlClient(type: GraphQLClientType): GraphQLClient {
  if (!["portal", "thegraph", "hasura"].includes(type)) {
    throw new Error(`Invalid GraphQL client type: ${type}`);
  }

  if (!process.env.SETTLEMINT_APP_URL) {
    throw new Error("SETTLEMINT_APP_URL environment variable is not defined");
  }

  return new GraphQLClient(`${process.env.SETTLEMINT_APP_URL}/proxy/${type}/graphql`);
}
