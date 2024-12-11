import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { Id } from "@settlemint/sdk-utils";
import { IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";
import type { ClientOptions } from "../helpers/client-options.schema.js";

/**
 * GraphQL query to fetch Foundry environment configuration.
 */
const getFoundryEnvConfig = graphql(`
  query getFoundryEnvConfig($blockchainNodeId: String!) {
    foundryEnvConfig(blockchainNodeId: $blockchainNodeId)
  }
`);

/**
 * Variables for the Foundry environment config query.
 */
export type GetFoundryEnvConfigVariables = VariablesOf<typeof getFoundryEnvConfig>;

/**
 * Result type for the Foundry environment config query.
 */
export type GetFoundryEnvConfigResult = ResultOf<typeof getFoundryEnvConfig>;

export function getEnv(gqlClient: GraphQLClient, options: ClientOptions) {
  return async (blockchainNodeId: Id) => {
    validate(IdSchema, blockchainNodeId);
    const { foundryEnvConfig } = await gqlClient.request(getFoundryEnvConfig, { blockchainNodeId });
    return foundryEnvConfig as Record<string, string>;
  };
}
