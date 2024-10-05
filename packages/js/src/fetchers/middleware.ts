import { type ResultOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas.js";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment for the Middleware type.
 */
const MiddlewareFragment = graphql(`
  fragment Middleware on Middleware {
    id
    name
    endpoints {
      id
      label
      displayValue
    }
    credentials {
      id
      label
      displayValue
    }
  }
`);

/**
 * Represents middleware with its details.
 */
export type Middleware = ResultOf<typeof MiddlewareFragment>;

/**
 * GraphQL query to fetch middlewares for a given application.
 */
const getMiddlewares = graphql(
  `
query getMiddlewares($id: ID!) {
  middlewares(applicationId: $id) {
    items {
      ...Middleware
    }
  }
}`,
  [MiddlewareFragment],
);

/**
 * GraphQL query to fetch a specific middleware by its ID.
 */
const getMiddleware = graphql(
  `
query getMiddleware($id: ID!) {
  middleware(entityId: $id) {
    ...Middleware
  }
}
`,
  [MiddlewareFragment],
);

/**
 * Creates a function to list middlewares for a given application.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an application ID and returns a list of middlewares.
 * @throws Will throw an error if the application ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const middlewares = await client.middleware.list('applicationId');
 */
export const middlewareList = (
  gqlClient: GraphQLClient,
  options: SettleMintClientOptions,
): ((applicationId: Id) => Promise<Middleware[]>) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      middlewares: { items },
    } = await gqlClient.request(getMiddlewares, { id });
    return items;
  };
};

/**
 * Creates a function to read a specific middleware.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes a middleware ID and returns the middleware details.
 * @throws Will throw an error if the middleware ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const middleware = await client.middleware.read('middlewareId');
 */
export const middlewareRead = (
  gqlClient: GraphQLClient,
  options: SettleMintClientOptions,
): ((middlewareId: Id) => Promise<Middleware>) => {
  return async (middlewareId: Id) => {
    const id = validate(IdSchema, middlewareId);
    const { middleware } = await gqlClient.request(getMiddleware, { id });
    return middleware;
  };
};
