import { applicationRead } from "@/graphql/application.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";
import { blockchainNodeRead } from "./blockchain-node.js";
import { loadBalancerRead } from "./load-balancer.js";
import { storageRead } from "./storage.js";

/**
 * GraphQL fragment containing core middleware fields.
 */
const MiddlewareFragment = graphql(`
  fragment Middleware on Middleware {
    __typename
    id
    uniqueName
    name
    status
    interface
    entityVersion
    serviceUrl
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
      specVersion
    }
  }
`);

/**
 * Type representing a middleware entity.
 */
export type Middleware = ResultOf<typeof MiddlewareFragment>;

/**
 * Query to fetch middlewares for an application.
 */
const getMiddlewares = graphql(
  `
    query GetMiddlewares($applicationUniqueName: String!) {
      middlewaresByUniqueName(applicationUniqueName: $applicationUniqueName) {
        items {
          ...Middleware
        }
      }
    }
  `,
  [MiddlewareFragment],
);

/**
 * Query to fetch a specific middleware.
 */
const getMiddleware = graphql(
  `
    query GetMiddleware($uniqueName: String!) {
      middlewareByUniqueName(uniqueName: $uniqueName) {
        ...Middleware
      }
    }
  `,
  [MiddlewareFragment],
);

/**
 * Query to fetch a specific middleware with subgraphs.
 */
const getGraphMiddlewareSubgraphs = graphql(
  `
    query GetMiddleware($uniqueName: String!, $noCache: Boolean) {
      middlewareByUniqueName(uniqueName: $uniqueName) {
        ...Middleware
        ... on HAGraphMiddleware {
          subgraphs(noCache: $noCache) {
            name
            graphqlQueryEndpoint {
              displayValue
              id
            }
          }
        }
      }
    }
  `,
  [MiddlewareFragment],
);

/**
 * Type representing a middleware entity with subgraphs.
 */
export type MiddlewareWithSubgraphs = ResultOf<typeof getGraphMiddlewareSubgraphs>["middlewareByUniqueName"];

/**
 * Mutation to create a new middleware.
 */
const createMiddleware = graphql(
  `
    mutation CreateMiddleware(
      $applicationId: ID!
      $name: String!
      $provider: String!
      $region: String!
      $size: ClusterServiceSize
      $type: ClusterServiceType
      $interface: MiddlewareType!
      $storageId: ID
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

/**
 * Arguments required to create a middleware.
 */
export type CreateMiddlewareArgs = Omit<
  VariablesOf<typeof createMiddleware>,
  "applicationId" | "blockchainNodeId" | "loadBalancerId" | "storageId"
> & {
  applicationUniqueName: string;
  blockchainNodeUniqueName?: string;
  loadBalancerUniqueName?: string;
  storageUniqueName?: string;
};

/**
 * Mutation to restart a middleware.
 */
const restartMiddleware = graphql(
  `
    mutation RestartMiddleware($uniqueName: String!) {
      restartMiddlewareByUniqueName(uniqueName: $uniqueName) {
        ...Middleware
      }
    }
  `,
  [MiddlewareFragment],
);

/**
 * Creates a function to list middlewares for an application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches middlewares for an application
 * @throws If the application cannot be found or the request fails
 */
export const middlewareList = (
  gqlClient: GraphQLClient,
): ((applicationUniqueName: string) => Promise<Middleware[]>) => {
  return async (applicationUniqueName: string): Promise<Middleware[]> => {
    const {
      middlewaresByUniqueName: { items },
    } = await gqlClient.request(getMiddlewares, { applicationUniqueName });
    return items;
  };
};

/**
 * Creates a function to fetch a specific middleware.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single middleware by unique name
 * @throws If the middleware cannot be found or the request fails
 */
export const middlewareRead = (gqlClient: GraphQLClient): ((middlewareUniqueName: string) => Promise<Middleware>) => {
  return async (middlewareUniqueName: string): Promise<Middleware> => {
    const { middlewareByUniqueName: middleware } = await gqlClient.request(getMiddleware, {
      uniqueName: middlewareUniqueName,
    });
    return middleware;
  };
};

/**
 * Creates a function to fetch a specific middleware.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single middleware by unique name
 * @throws If the middleware cannot be found or the request fails
 */
export const graphMiddlewareSubgraphs = (
  gqlClient: GraphQLClient,
): ((middlewareUniqueName: string, noCache?: boolean) => Promise<MiddlewareWithSubgraphs>) => {
  return async (middlewareUniqueName: string, noCache = false): Promise<MiddlewareWithSubgraphs> => {
    const { middlewareByUniqueName: middleware } = await gqlClient.request(getGraphMiddlewareSubgraphs, {
      uniqueName: middlewareUniqueName,
      noCache,
    });
    return middleware;
  };
};

/**
 * Creates a function to create a new middleware.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates new middleware with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const middlewareCreate = (gqlClient: GraphQLClient): ((args: CreateMiddlewareArgs) => Promise<Middleware>) => {
  return async (args: CreateMiddlewareArgs): Promise<Middleware> => {
    const { applicationUniqueName, blockchainNodeUniqueName, loadBalancerUniqueName, storageUniqueName, ...otherArgs } =
      args;
    const [application, blockchainNode, loadBalancer, storage] = await Promise.all([
      applicationRead(gqlClient)(applicationUniqueName),
      blockchainNodeUniqueName ? blockchainNodeRead(gqlClient)(blockchainNodeUniqueName) : Promise.resolve(undefined),
      loadBalancerUniqueName ? loadBalancerRead(gqlClient)(loadBalancerUniqueName) : Promise.resolve(undefined),
      storageUniqueName ? storageRead(gqlClient)(storageUniqueName) : Promise.resolve(undefined),
    ]);
    const { createMiddleware: middleware } = await gqlClient.request(createMiddleware, {
      ...otherArgs,
      applicationId: application.id,
      blockchainNodeId: blockchainNode?.id,
      loadBalancerId: loadBalancer?.id,
      storageId: storage?.id,
    });
    return middleware;
  };
};

/**
 * Creates a function to restart a middleware.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that restarts middleware by unique name
 * @throws If the middleware cannot be found or the restart fails
 */
export const middlewareRestart =
  (gqlClient: GraphQLClient) =>
  async (middlewareUniqueName: string): Promise<Middleware> => {
    const { restartMiddlewareByUniqueName: middleware } = await gqlClient.request(restartMiddleware, {
      uniqueName: middlewareUniqueName,
    });
    return middleware;
  };
