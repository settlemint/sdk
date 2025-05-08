import { type ResultOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL query to fetch platform configuration.
 */
const getPlatformConfigQuery = graphql(
  `
    query platformConfig {
      config {
        smartContractSets {
          id
          sets {
            id
            name
            featureflagged
            image {
              repository
              tag
              registry
            }
          }
        }
        deploymentEngineTargets {
          id
          name
          disabled
          clusters {
            id
            name
            disabled
          }
        }
        preDeployedAbis
        sdkVersion
        kits {
          id
          name
          description
          npmPackageName
        }
      }
    }
  `,
  [],
);

/**
 * Type representing the platform configuration.
 */
export type PlatformConfig = ResultOf<typeof getPlatformConfigQuery>["config"];

/**
 * Creates a function to fetch the platform configuration.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches the platform configuration
 * @throws If the request fails
 */
export const getPlatformConfig = (gqlClient: GraphQLClient) => {
  return async (): Promise<PlatformConfig> => {
    const { config } = await gqlClient.request(getPlatformConfigQuery);
    return config;
  };
};
