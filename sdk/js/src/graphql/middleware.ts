import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment for the Middleware type.
 */
const MiddlewareFragment = graphql(`
  fragment Middleware on Middleware {
    __typename
    id
    name
    status
    interface
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
    ... on HAGraphMiddleware {
      subgraphs {
        name
        graphqlQueryEndpoint {
          displayValue
          id
        }
      }
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
 * GraphQL mutation to create a middleware.
 */
const createMiddleware = graphql(
  `
  mutation createMiddleware(
    $applicationId: ID!
    $name: String!
    $provider: String!
    $region: String!
    $size: ClusterServiceSize
    $type: ClusterServiceType
    $interface: MiddlewareType!
    $storageId: ID
    $smartContractSetId: ID
    $blockchainNodeId: ID
    $loadBalancerId: ID
    $abis: [SmartContractPortalMiddlewareAbiInputDto!]
    $includePredeployedAbis: [String!]
  ) {
    createMiddleware(
      applicationId: $applicationId
      name: $name
      provider: $provider
      region: $region
      size: $size
      type: $type
      interface: $interface
      storageId: $storageId
      smartContractSetId: $smartContractSetId
      blockchainNodeId: $blockchainNodeId
      loadBalancerId: $loadBalancerId
      abis: $abis
      includePredeployedAbis: $includePredeployedAbis
    ) {
      ...Middleware
    }
  }
`,
  [MiddlewareFragment],
);

export type CreateMiddlewareArgs = VariablesOf<typeof createMiddleware>;

const restartMiddleware = graphql(
  `
  mutation RestartMiddleware($id: ID!) {
    restartMiddleware(entityId: $id) {
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
  options: ClientOptions,
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
  options: ClientOptions,
): ((middlewareId: Id) => Promise<Middleware>) => {
  return async (middlewareId: Id) => {
    const id = validate(IdSchema, middlewareId);
    const { middleware } = await gqlClient.request(getMiddleware, { id });
    return middleware;
  };
};

/**
 * Creates a function to create a new middleware.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes middleware creation arguments and returns a promise resolving to the created middleware.
 */
export const middlewareCreate = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((args: CreateMiddlewareArgs) => Promise<Middleware>) => {
  return async (args: CreateMiddlewareArgs) => {
    validate(IdSchema, args.applicationId);
    const { createMiddleware: middleware } = await gqlClient.request(createMiddleware, args);
    return middleware;
  };
};

export const middlewareRestart =
  (gqlClient: GraphQLClient, _options: ClientOptions) =>
  async (middlewareId: Id): Promise<Middleware> => {
    const id = validate(IdSchema, middlewareId);
    const { restartMiddleware: middleware } = await gqlClient.request(restartMiddleware, { id });
    return middleware;
  };
