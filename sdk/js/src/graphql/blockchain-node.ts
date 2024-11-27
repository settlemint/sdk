import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * Fragment for the BlockchainNode type.
 */
const BlockchainNodeFragment = graphql(`
  fragment BlockchainNode on BlockchainNode {
    id
    name
    status
    endpoints {
      id
      label
      displayValue
    }
    credentials {
      id
      label
      displayValue
    }
    blockchainNetwork {
      ... on AbstractClusterService {
        id
        name
      }
    }
  }
`);

/**
 * Represents a blockchain node with its details.
 */
export type BlockchainNode = ResultOf<typeof BlockchainNodeFragment>;

/**
 * GraphQL query to fetch blockchain nodes for a given application.
 */
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

/**
 * GraphQL query to fetch a specific blockchain node by its ID.
 */
const getBlockchainNode = graphql(
  `
query getBlockchainNode($id: ID!) {
  blockchainNode(entityId: $id) {
    ...BlockchainNode
  }
}
`,
  [BlockchainNodeFragment],
);

/**
 * GraphQL mutation to create a blockchain node.
 */
const createBlockchainNode = graphql(
  `
  mutation createBlockchainNode(
    $applicationId: ID!
    $blockchainNetworkId: ID!
    $name: String!
    $provider: String!
    $region: String!
    $size: ClusterServiceSize
    $type: ClusterServiceType
    $requestsCpu: Int
    $requestsMemory: Int
    $limitCpu: Int
    $limitMemory: Int
    $diskSpace: Int
    $nodeType: NodeType
    $keyMaterial: ID
  ) {
    createBlockchainNode(
      applicationId: $applicationId
      blockchainNetworkId: $blockchainNetworkId
      name: $name
      provider: $provider
      region: $region
      size: $size
      type: $type
      requestsCpu: $requestsCpu
      requestsMemory: $requestsMemory
      limitCpu: $limitCpu
      limitMemory: $limitMemory
      diskSpace: $diskSpace
      nodeType: $nodeType
      keyMaterial: $keyMaterial
    ) {
      ...BlockchainNode
    }
  }
`,
  [BlockchainNodeFragment],
);

export type CreateBlockchainNodeArgs = VariablesOf<typeof createBlockchainNode>;

/**
 * Creates a function to list blockchain nodes for a given application.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an application ID and returns a list of blockchain nodes.
 * @throws Will throw an error if the application ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const nodes = await client.blockchainNode.list('applicationId');
 */
export const blockchainNodeList = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((applicationId: Id) => Promise<BlockchainNode[]>) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      blockchainNodes: { items },
    } = await gqlClient.request(getBlockchainNodes, { id });
    return items;
  };
};

/**
 * Creates a function to read a specific blockchain node.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes a blockchain node ID and returns the node details.
 * @throws Will throw an error if the blockchain node ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const node = await client.blockchainNode.read('nodeId');
 */
export const blockchainNodeRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((blockchainNodeId: Id) => Promise<BlockchainNode>) => {
  return async (blockchainNodeId: Id) => {
    const id = validate(IdSchema, blockchainNodeId);
    const { blockchainNode } = await gqlClient.request(getBlockchainNode, { id });
    return blockchainNode;
  };
};

/**
 * Creates a function to create a new blockchain node.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes blockchain node creation arguments and returns a promise resolving to the created blockchain node.
 */
export const blockchainNodeCreate = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((args: CreateBlockchainNodeArgs) => Promise<BlockchainNode>) => {
  return async (args: CreateBlockchainNodeArgs) => {
    validate(IdSchema, args.applicationId);
    validate(IdSchema, args.blockchainNetworkId);
    const { createBlockchainNode: blockchainNode } = await gqlClient.request(createBlockchainNode, args);
    return blockchainNode;
  };
};
