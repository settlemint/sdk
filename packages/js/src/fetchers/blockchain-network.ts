import { graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

const BlockchainNetworkFragment = graphql(`
  fragment BlockchainNetwork on BlockchainNetwork {
    id
    name
  }
`);

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

export const blockchainNetworkList = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId ?? options?.applicationId);
    const {
      blockchainNetworks: { items },
    } = await gqlClient.request(getBlockchainNetworks, { id });
    return items;
  };
};

export const blockchainNetworkRead = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (blockchainNetworkId: Id) => {
    const id = validate(IdSchema, blockchainNetworkId ?? options?.blockchainNetworkId);
    const { blockchainNetwork } = await gqlClient.request(getBlockchainNetwork, { id });
    return blockchainNetwork;
  };
};
