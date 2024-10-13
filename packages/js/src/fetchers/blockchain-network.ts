import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * Fragment for the BlockchainNetwork type.
 */
const BlockchainNetworkFragment = graphql(`
  fragment BlockchainNetwork on BlockchainNetwork {
    id
    name
    status
  }
`);

/**
 * Represents a blockchain network with its id and name.
 */
export type BlockchainNetwork = ResultOf<typeof BlockchainNetworkFragment>;

/**
 * GraphQL query to fetch blockchain networks for a given application.
 */
const getBlockchainNetworks = graphql(
  `
query getBlockchainNetworks($id: ID!) {
blockchainNetworks(applicationId: $id) {
  items {
    ...BlockchainNetwork
  }
}
}`,
  [BlockchainNetworkFragment],
);

/**
 * GraphQL query to fetch a specific blockchain network by its ID.
 */
const getBlockchainNetwork = graphql(
  `
query getBlockchainNetwork($id: ID!) {
  blockchainNetwork(entityId: $id) {
    ...BlockchainNetwork
  }
}
`,
  [BlockchainNetworkFragment],
);

/**
 * Creates a function to list blockchain networks for a given application.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an application ID and returns a list of blockchain networks.
 * @throws Will throw an error if the application ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const networks = await client.blockchainNetwork.list('applicationId');
 */
export const blockchainNetworkList = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((applicationId: Id) => Promise<BlockchainNetwork[]>) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      blockchainNetworks: { items },
    } = await gqlClient.request(getBlockchainNetworks, { id });
    return items;
  };
};

/**
 * Creates a function to read a specific blockchain network.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes a blockchain network ID and returns the network details.
 * @throws Will throw an error if the blockchain network ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const network = await client.blockchainNetwork.read('networkId');
 */
export const blockchainNetworkRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((blockchainNetworkId: Id) => Promise<BlockchainNetwork>) => {
  return async (blockchainNetworkId: Id) => {
    const id = validate(IdSchema, blockchainNetworkId);
    const { blockchainNetwork } = await gqlClient.request(getBlockchainNetwork, { id });
    return blockchainNetwork;
  };
};
