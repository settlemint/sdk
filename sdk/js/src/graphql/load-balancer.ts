import { type ResultOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment containing core load balancer fields.
 */
const LoadBalancerFragment = graphql(`
  fragment LoadBalancer on LoadBalancer {
    id
    uniqueName
    name
    status
    healthStatus
    provider
    region
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
    return loadBalancer;
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
    return items;
  };
};
