import type { GraphQLClient } from "graphql-request";
import { applicationRead } from "@/graphql/application.js";
import { blockchainNetworkRead } from "@/graphql/blockchain-network.js";
import { graphql, type ResultOf, type VariablesOf } from "@/helpers/graphql.js";
import { blockchainNodeRead } from "./blockchain-node.js";

/**
 * GraphQL fragment containing core load balancer fields.
 */
const LoadBalancerFragment = graphql(`
  fragment LoadBalancer on LoadBalancer {
    __typename
    id
    uniqueName
    name
    status
    healthStatus
    provider
    region
    endpoints {
      id
      label
      displayValue
    }
  }
`);

/**
 * Type representing a load balancer entity.
 */
export type LoadBalancer = ResultOf<typeof LoadBalancerFragment>;

/**
 * Query to fetch a specific load balancer.
 */
const getLoadBalancer = graphql(
  `
    query GetLoadBalancer($uniqueName: String!) {
      loadBalancerByUniqueName(uniqueName: $uniqueName) {
        ...LoadBalancer
      }
    }
  `,
  [LoadBalancerFragment],
);

/**
 * Query to fetch all load balancers for an application.
 */
const getLoadBalancers = graphql(
  `
    query getLoadBalancers($applicationUniqueName: String!) {
      loadBalancersByUniqueName(applicationUniqueName: $applicationUniqueName) {
        items {
          ...LoadBalancer
        }
      }
    }
  `,
  [LoadBalancerFragment],
);

/**
 * Mutation to create a load balancer.
 */
const createLoadBalancer = graphql(
  `
    mutation createLoadBalancer(
      $applicationId: ID!
      $blockchainNetworkId: ID!
      $name: String!
      $provider: String!
      $region: String!
      $size: ClusterServiceSize
      $type: ClusterServiceType
      $connectedNodes: [ID!]!
    ) {
      createLoadBalancer(
        applicationId: $applicationId
        blockchainNetworkId: $blockchainNetworkId
        name: $name
        provider: $provider
        region: $region
        size: $size
        type: $type
        connectedNodes: $connectedNodes
      ) {
        ...LoadBalancer
      }
    }
  `,
  [LoadBalancerFragment],
);

/**
 * Arguments required to create a load balancer.
 */
export type CreateLoadBalancerArgs = Omit<
  VariablesOf<typeof createLoadBalancer>,
  "applicationId" | "blockchainNetworkId" | "connectedNodes"
> & {
  applicationUniqueName: string;
  blockchainNetworkUniqueName: string;
  connectedNodesUniqueNames: string[];
};

/**
 * Mutation to restart a load balancer.
 */
const restartLoadBalancer = graphql(
  `
    mutation RestartLoadBalancer($uniqueName: String!) {
      restartLoadBalancerByUniqueName(uniqueName: $uniqueName) {
        ...LoadBalancer
      }
    }
  `,
  [LoadBalancerFragment],
);

/**
 * Mutation to pause a load balancer.
 */
const pauseLoadBalancer = graphql(
  `
    mutation PauseLoadBalancer($uniqueName: String!) {
      pauseLoadBalancerByUniqueName(uniqueName: $uniqueName) {
        ...LoadBalancer
      }
    }
  `,
  [LoadBalancerFragment],
);

/**
 * Mutation to resume a load balancer.
 */
const resumeLoadBalancer = graphql(
  `
    mutation ResumeLoadBalancer($uniqueName: String!) {
      resumeLoadBalancerByUniqueName(uniqueName: $uniqueName) {
        ...LoadBalancer
      }
    }
  `,
  [LoadBalancerFragment],
);

/**
 * Creates a function to fetch a specific load balancer.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single load balancer by unique name
 * @throws If the load balancer cannot be found or the request fails
 */
export const loadBalancerRead = (
  gqlClient: GraphQLClient,
): ((loadBalancerUniqueName: string) => Promise<LoadBalancer>) => {
  return async (loadBalancerUniqueName: string): Promise<LoadBalancer> => {
    const { loadBalancerByUniqueName: loadBalancer } = await gqlClient.request(getLoadBalancer, {
      uniqueName: loadBalancerUniqueName,
    });
    return loadBalancer as LoadBalancer;
  };
};

/**
 * Creates a function to list load balancers for an application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches load balancers for an application
 * @throws If the application cannot be found or the request fails
 */
export const loadBalancerList = (gqlClient: GraphQLClient) => {
  return async (applicationUniqueName: string): Promise<LoadBalancer[]> => {
    const {
      loadBalancersByUniqueName: { items },
    } = await gqlClient.request(getLoadBalancers, { applicationUniqueName });
    return items as LoadBalancer[];
  };
};

/**
 * Creates a function to create a load balancer.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates a load balancer
 * @throws If the load balancer cannot be created or the request fails
 */
export const loadBalancerCreate = (gqlClient: GraphQLClient) => {
  return async (args: CreateLoadBalancerArgs): Promise<LoadBalancer> => {
    const { applicationUniqueName, blockchainNetworkUniqueName, connectedNodesUniqueNames, ...otherArgs } = args;
    const [application, blockchainNetwork, connectedNodes] = await Promise.all([
      applicationRead(gqlClient)(applicationUniqueName),
      blockchainNetworkRead(gqlClient)(blockchainNetworkUniqueName),
      Promise.all(connectedNodesUniqueNames.map((uniqueName) => blockchainNodeRead(gqlClient)(uniqueName))),
    ]);
    const { createLoadBalancer: loadBalancer } = await gqlClient.request(createLoadBalancer, {
      ...otherArgs,
      applicationId: application.id,
      blockchainNetworkId: blockchainNetwork.id,
      connectedNodes: connectedNodes.map((node) => node.id),
    });
    return loadBalancer as LoadBalancer;
  };
};

/**
 * Creates a function to restart a load balancer.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that restarts a load balancer
 * @throws If the load balancer cannot be restarted or the request fails
 */
export const loadBalancerRestart =
  (gqlClient: GraphQLClient) =>
  async (loadBalancerUniqueName: string): Promise<LoadBalancer> => {
    const { restartLoadBalancerByUniqueName: loadBalancer } = await gqlClient.request(restartLoadBalancer, {
      uniqueName: loadBalancerUniqueName,
    });
    return loadBalancer as LoadBalancer;
  };

/**
 * Creates a function to pause a load balancer.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that pauses a load balancer
 * @throws If the load balancer cannot be paused or the request fails
 */
export const loadBalancerPause =
  (gqlClient: GraphQLClient) =>
  async (loadBalancerUniqueName: string): Promise<LoadBalancer> => {
    const { pauseLoadBalancerByUniqueName: loadBalancer } = await gqlClient.request(pauseLoadBalancer, {
      uniqueName: loadBalancerUniqueName,
    });
    return loadBalancer as LoadBalancer;
  };

/**
 * Creates a function to resume a load balancer.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that resumes a load balancer
 * @throws If the load balancer cannot be resumed or the request fails
 */
export const loadBalancerResume =
  (gqlClient: GraphQLClient) =>
  async (loadBalancerUniqueName: string): Promise<LoadBalancer> => {
    const { resumeLoadBalancerByUniqueName: loadBalancer } = await gqlClient.request(resumeLoadBalancer, {
      uniqueName: loadBalancerUniqueName,
    });
    return loadBalancer as LoadBalancer;
  };
