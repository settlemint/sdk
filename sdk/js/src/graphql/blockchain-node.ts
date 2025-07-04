import type { GraphQLClient } from "graphql-request";
import { applicationRead } from "@/graphql/application.js";
import { graphql, type ResultOf, type VariablesOf } from "@/helpers/graphql.js";
import { blockchainNetworkRead } from "./blockchain-network.js";

/**
 * Fragment containing core blockchain node fields.
 */
const BlockchainNodeFragment = graphql(`
  fragment BlockchainNode on BlockchainNode {
    __typename
    id
    uniqueName
    name
    status
    healthStatus
    provider
    region
    isEvm
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
        uniqueName
        ... on BesuQBFTBlockchainNetwork {
          chainId
        }
        ... on BesuIbftv2BlockchainNetwork {
          chainId
        }
        ... on GethPoWBlockchainNetwork {
          chainId
        }
        ... on GethPoSRinkebyBlockchainNetwork {
          chainId
        }
        ... on GethVenidiumBlockchainNetwork {
          chainId
        }
        ... on GethGoerliBlockchainNetwork {
          chainId
        }
        ... on AvalancheBlockchainNetwork {
          chainId
        }
        ... on AvalancheFujiBlockchainNetwork {
          chainId
        }
        ... on BscPoWBlockchainNetwork {
          chainId
        }
        ... on BscPoWTestnetBlockchainNetwork {
          chainId
        }
        ... on PolygonBlockchainNetwork {
          chainId
        }
        ... on PolygonMumbaiBlockchainNetwork {
          chainId
        }
        ... on PolygonEdgePoABlockchainNetwork {
          chainId
        }
        ... on QuorumQBFTBlockchainNetwork {
          chainId
        }
        ... on GethCliqueBlockchainNetwork {
          chainId
        }
      }
    }
    privateKeys {
      ... on PrivateKey {
        id
        name
        privateKeyType
        address
      }
    }
  }
`);

/**
 * Type representing a blockchain node entity.
 */
export type BlockchainNode = ResultOf<typeof BlockchainNodeFragment>;

/**
 * Query to fetch blockchain nodes for an application.
 */
const getBlockchainNodes = graphql(
  `
    query getBlockchainNodes($applicationUniqueName: String!) {
      blockchainNodesByUniqueName(applicationUniqueName: $applicationUniqueName) {
        items {
          ...BlockchainNode
        }
      }
    }
  `,
  [BlockchainNodeFragment],
);

/**
 * Query to fetch a specific blockchain node.
 */
const getBlockchainNode = graphql(
  `
    query getBlockchainNode($uniqueName: String!) {
      blockchainNodeByUniqueName(uniqueName: $uniqueName) {
        ...BlockchainNode
      }
    }
  `,
  [BlockchainNodeFragment],
);

/**
 * Mutation to create a blockchain node.
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
        nodeType: $nodeType
        keyMaterial: $keyMaterial
      ) {
        ...BlockchainNode
      }
    }
  `,
  [BlockchainNodeFragment],
);

/**
 * Arguments required to create a blockchain node.
 */
export type CreateBlockchainNodeArgs = Omit<
  VariablesOf<typeof createBlockchainNode>,
  "applicationId" | "blockchainNetworkId"
> & {
  applicationUniqueName: string;
  blockchainNetworkUniqueName: string;
};

/**
 * Mutation to restart a blockchain node.
 */
const restartBlockchainNode = graphql(
  `
    mutation RestartBlockchainNode($uniqueName: String!) {
      restartBlockchainNodeByUniqueName(uniqueName: $uniqueName) {
        ...BlockchainNode
      }
    }
  `,
  [BlockchainNodeFragment],
);

/**
 * Mutation to pause a blockchain node.
 */
const pauseBlockchainNode = graphql(
  `
    mutation PauseBlockchainNode($uniqueName: String!) {
      pauseBlockchainNodeByUniqueName(uniqueName: $uniqueName) {
        ...BlockchainNode
      }
    }
  `,
  [BlockchainNodeFragment],
);

/**
 * Mutation to resume a blockchain node.
 */
const resumeBlockchainNode = graphql(
  `
    mutation ResumeBlockchainNode($uniqueName: String!) {
      resumeBlockchainNodeByUniqueName(uniqueName: $uniqueName) {
        ...BlockchainNode
      }
    }
  `,
  [BlockchainNodeFragment],
);

/**
 * Creates a function to list blockchain nodes for an application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches blockchain nodes for an application
 * @throws If the application cannot be found or the request fails
 */
export const blockchainNodeList = (gqlClient: GraphQLClient) => {
  return async (applicationUniqueName: string): Promise<BlockchainNode[]> => {
    const {
      blockchainNodesByUniqueName: { items },
    } = await gqlClient.request(getBlockchainNodes, { applicationUniqueName });
    return items;
  };
};

/**
 * Creates a function to fetch a specific blockchain node.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single blockchain node by unique name
 * @throws If the blockchain node cannot be found or the request fails
 */
export const blockchainNodeRead = (gqlClient: GraphQLClient) => {
  return async (blockchainNodeUniqueName: string): Promise<BlockchainNode> => {
    const { blockchainNodeByUniqueName } = await gqlClient.request(getBlockchainNode, {
      uniqueName: blockchainNodeUniqueName,
    });
    return blockchainNodeByUniqueName;
  };
};

/**
 * Creates a function to create a new blockchain node.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates a new blockchain node with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const blockchainNodeCreate = (gqlClient: GraphQLClient) => {
  return async (args: CreateBlockchainNodeArgs): Promise<BlockchainNode> => {
    const { applicationUniqueName, blockchainNetworkUniqueName, ...otherArgs } = args;
    const [application, blockchainNetwork] = await Promise.all([
      applicationRead(gqlClient)(applicationUniqueName),
      blockchainNetworkRead(gqlClient)(blockchainNetworkUniqueName),
    ]);
    const { createBlockchainNode: blockchainNode } = await gqlClient.request(createBlockchainNode, {
      ...otherArgs,
      applicationId: application.id,
      blockchainNetworkId: blockchainNetwork.id,
    });
    return blockchainNode;
  };
};

/**
 * Creates a function to restart a blockchain node.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that restarts a blockchain node by unique name
 * @throws If the blockchain node cannot be found or the restart fails
 */
export const blockchainNodeRestart =
  (gqlClient: GraphQLClient) =>
  async (blockchainNodeUniqueName: string): Promise<BlockchainNode> => {
    const { restartBlockchainNodeByUniqueName: blockchainNode } = await gqlClient.request(restartBlockchainNode, {
      uniqueName: blockchainNodeUniqueName,
    });
    return blockchainNode;
  };

/**
 * Creates a function to pause a blockchain node.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that pauses a blockchain node by unique name
 * @throws If the blockchain node cannot be found or the pause fails
 */
export const blockchainNodePause =
  (gqlClient: GraphQLClient) =>
  async (blockchainNodeUniqueName: string): Promise<BlockchainNode> => {
    const { pauseBlockchainNodeByUniqueName: blockchainNode } = await gqlClient.request(pauseBlockchainNode, {
      uniqueName: blockchainNodeUniqueName,
    });
    return blockchainNode;
  };

/**
 * Creates a function to resume a blockchain node.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that resumes a blockchain node by unique name
 * @throws If the blockchain node cannot be found or the resume fails
 */
export const blockchainNodeResume =
  (gqlClient: GraphQLClient) =>
  async (blockchainNodeUniqueName: string): Promise<BlockchainNode> => {
    const { resumeBlockchainNodeByUniqueName: blockchainNode } = await gqlClient.request(resumeBlockchainNode, {
      uniqueName: blockchainNodeUniqueName,
    });
    return blockchainNode;
  };
