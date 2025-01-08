import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";

/**
 * Query to fetch Foundry environment configuration for a blockchain node.
 */
const getFoundryEnvConfig = graphql(
  `
    query GetFoundryEnvConfig($blockchainNodeUniqueName: String!) {
      foundryEnvConfigByUniqueName(blockchainNodeUniqueName: $blockchainNodeUniqueName)
    }
  `,
);

/**
 * Variables for the Foundry environment config query.
 */
export type GetFoundryEnvConfigVariables = VariablesOf<typeof getFoundryEnvConfig>;

/**
 * Result type for the Foundry environment config query.
 */
export type GetFoundryEnvConfigResult = ResultOf<typeof getFoundryEnvConfig>;

/**
 * Creates a function to fetch Foundry environment configuration.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches Foundry environment configuration for a blockchain node
 * @throws If the blockchain node cannot be found or the request fails
 */
export const getEnv = (gqlClient: GraphQLClient) => {
  return async (blockchainNodeUniqueName: string): Promise<Record<string, string>> => {
    const { foundryEnvConfigByUniqueName } = await gqlClient.request(getFoundryEnvConfig, { blockchainNodeUniqueName });
    return foundryEnvConfigByUniqueName as Record<string, string>;
  };
};
