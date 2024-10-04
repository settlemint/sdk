import { graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

const BlockchainNodeFragment = graphql(`
  fragment BlockchainNode on BlockchainNode {
    id
    name
  }
`);

const getBlockchainNodes = graphql(
  `
query getBlockchainNodes($id: ID!) {
blockchainNodes(applicationId: $id) {
  items {
    ...BlockchainNode
  }
}
}`,
  [BlockchainNodeFragment],
);

const getBlockchainNetwork = graphql(
  `
query getBlockchainNode($id: ID!) {
  blockchainNode(entityId: $id) {
    ...BlockchainNode
  }
}
`,
  [BlockchainNodeFragment],
);

export const blockchainNodeList = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId ?? options?.applicationId);
    const {
      blockchainNodes: { items },
    } = await gqlClient.request(getBlockchainNodes, { id });
    return items;
  };
};

export const blockchainNodeRead = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (blockchainNodeId: Id) => {
    const id = validate(IdSchema, blockchainNodeId ?? options?.blockchainNodeId);
    const { blockchainNode } = await gqlClient.request(getBlockchainNetwork, { id });
    return blockchainNode;
  };
};
