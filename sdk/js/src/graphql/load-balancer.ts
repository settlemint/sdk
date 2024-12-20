import type { ClientOptions } from "@/helpers/client-options.schema.js";
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
 * Creates a function to fetch a specific load balancer.
 *
 * @param gqlClient - The GraphQL client instance
 * @param options - Client configuration options
 * @returns Function that fetches a single load balancer by unique name
 * @throws If the load balancer cannot be found or the request fails
 */
export const loadBalancerRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((loadBalancerUniqueName: string) => Promise<LoadBalancer>) => {
  return async (loadBalancerUniqueName: string) => {
    const { loadBalancerByUniqueName: loadBalancer } = await gqlClient.request(getLoadBalancer, {
      uniqueName: loadBalancerUniqueName,
    });
    return loadBalancer;
  };
};
