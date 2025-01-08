import { type ResultOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment containing core load balancer fields.
 */
const LoadBalancerFragment = graphql(`
  fragment LoadBalancer on LoadBalancer {
    id
    uniqueName
  }
`);

type LoadBalancerGraphql = ResultOf<typeof LoadBalancerFragment>;

/**
 * Type representing a load balancer entity.
 */
export interface LoadBalancer extends Pick<LoadBalancerGraphql, "id" | "uniqueName"> {}

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
