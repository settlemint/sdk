import { applicationRead } from "@/graphql/application.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";
import { setNetworkDefaults } from "../defaults/blockchain-network-defaults.js";

/**
 * Fragment containing core blockchain network fields.
 */
const BlockchainNetworkFragment = graphql(`
  fragment BlockchainNetwork on BlockchainNetwork {
    __typename
    id
    uniqueName
    name
    status
    healthStatus
    blockchainNodes {
      ... on BlockchainNode {
        id
        name
        uniqueName
      }
    }
  }
`);

/**
 * Type representing a blockchain network entity.
 */
export type BlockchainNetwork = ResultOf<typeof BlockchainNetworkFragment>;

/**
 * Query to fetch blockchain networks for an application.
 */
const getBlockchainNetworks = graphql(
  `
  query getBlockchainNetworks($applicationUniqueName: String!) {
    blockchainNetworksByUniqueName(applicationUniqueName: $applicationUniqueName) {
      items {
        ...BlockchainNetwork
      }
    }
  }
  `,
  [BlockchainNetworkFragment],
);

/**
 * Query to fetch a specific blockchain network.
 */
const getBlockchainNetwork = graphql(
  `
  query getBlockchainNetwork($uniqueName: String!) {
    blockchainNetworkByUniqueName(uniqueName: $uniqueName) {
      ...BlockchainNetwork
    }
  }
  `,
  [BlockchainNetworkFragment],
);

/**
 * Mutation to create a new blockchain network.
 */
const createBlockchainNetwork = graphql(
  `
  mutation createBlockchainNetwork(
    $applicationId: ID!
    $chainId: Int
    $consensusAlgorithm: ConsensusAlgorithm!
    $contractSizeLimit: Int
    $evmStackSize: Int
    $gasLimit: String
    $gasPrice: Int
    $name: String!
    $nodeName: String!
    $secondsPerBlock: Int
    $provider: String!
    $region: String!
    $size: ClusterServiceSize
    $type: ClusterServiceType
    $batchTimeout: Float
    $maxMessageCount: Int
    $absoluteMaxBytes: Int
    $preferredMaxBytes: Int
    $endorsementPolicy: FabricEndorsementPolicy
    $maxCodeSize: Int
    $txnSizeLimit: Int
    $besuIbft2Genesis: BesuIbft2GenesisInput
    $besuQbftGenesis: BesuQbftGenesisInput
    $quorumGenesis: QuorumGenesisInput
    $externalNodes: [BlockchainNetworkExternalNodeInput!]
    $privateKeyId: ID
  ) {
    createBlockchainNetwork(
      applicationId: $applicationId
      chainId: $chainId
      consensusAlgorithm: $consensusAlgorithm
      contractSizeLimit: $contractSizeLimit
      evmStackSize: $evmStackSize
      gasLimit: $gasLimit
      gasPrice: $gasPrice
      name: $name
      nodeName: $nodeName
      secondsPerBlock: $secondsPerBlock
      provider: $provider
      region: $region
      size: $size
      type: $type
      batchTimeout: $batchTimeout
      maxMessageCount: $maxMessageCount
      absoluteMaxBytes: $absoluteMaxBytes
      preferredMaxBytes: $preferredMaxBytes
      endorsementPolicy: $endorsementPolicy
      maxCodeSize: $maxCodeSize
      txnSizeLimit: $txnSizeLimit
      besuIbft2Genesis: $besuIbft2Genesis
      besuQbftGenesis: $besuQbftGenesis
      quorumGenesis: $quorumGenesis
      externalNodes: $externalNodes
      keyMaterial: $privateKeyId
    ) {
      ...BlockchainNetwork
    }
  }
  `,
  [BlockchainNetworkFragment],
);

/**
 * Arguments required to create a blockchain network.
 */
export type CreateBlockchainNetworkArgs = Omit<VariablesOf<typeof createBlockchainNetwork>, "applicationId"> & {
  applicationUniqueName: string;
};

/**
 * Mutation to delete a blockchain network.
 */
const deleteBlockchainNetwork = graphql(
  `
  mutation deleteBlockchainNetwork($uniqueName: String!) {
    deleteBlockchainNetworkByUniqueName(uniqueName: $uniqueName) {
      ...BlockchainNetwork
    }
  }
  `,
  [BlockchainNetworkFragment],
);

/**
 * Mutation to restart a blockchain network.
 */
const restartBlockchainNetwork = graphql(
  `
  mutation RestartBlockchainNetwork($uniqueName: String!) {
    restartBlockchainNetworkByUniqueName(uniqueName: $uniqueName) {
      ...BlockchainNetwork
    }
  }
  `,
  [BlockchainNetworkFragment],
);

/**
 * Creates a function to list blockchain networks for a given application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches networks for an application
 * @throws If the application cannot be found or the request fails
 */
export const blockchainNetworkList = (gqlClient: GraphQLClient) => {
  return async (applicationUniqueName: string) => {
    const {
      blockchainNetworksByUniqueName: { items },
    } = await gqlClient.request(getBlockchainNetworks, { applicationUniqueName });
    return items;
  };
};

/**
 * Creates a function to fetch a specific blockchain network.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single network by unique name
 * @throws If the network cannot be found or the request fails
 */
export const blockchainNetworkRead = (gqlClient: GraphQLClient) => {
  return async (blockchainNetworkUniqueName: string) => {
    const { blockchainNetworkByUniqueName } = await gqlClient.request(getBlockchainNetwork, {
      uniqueName: blockchainNetworkUniqueName,
    });
    return blockchainNetworkByUniqueName;
  };
};

/**
 * Creates a function to create a new blockchain network.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates a new network with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const blockchainNetworkCreate = (
  gqlClient: GraphQLClient,
): ((args: CreateBlockchainNetworkArgs) => Promise<BlockchainNetwork>) => {
  return async (args: CreateBlockchainNetworkArgs) => {
    const { applicationUniqueName, ...otherArgs } = args;
    const application = await applicationRead(gqlClient)(applicationUniqueName);
    const blockchainNetworkArgs = setNetworkDefaults(otherArgs);
    const { createBlockchainNetwork: blockchainNetwork } = await gqlClient.request(createBlockchainNetwork, {
      ...blockchainNetworkArgs,
      applicationId: application.id,
    });
    return blockchainNetwork;
  };
};

/**
 * Creates a function to delete a blockchain network.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that deletes a network by unique name
 * @throws If the network cannot be found or the deletion fails
 */
export const blockchainNetworkDelete = (gqlClient: GraphQLClient) => {
  return async (blockchainNetworkUniqueName: string) => {
    const { deleteBlockchainNetworkByUniqueName: blockchainNetwork } = await gqlClient.request(
      deleteBlockchainNetwork,
      {
        uniqueName: blockchainNetworkUniqueName,
      },
    );
    return blockchainNetwork;
  };
};

/**
 * Creates a function to restart a blockchain network.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that restarts a network by unique name
 * @throws If the network cannot be found or the restart fails
 */
export const blockchainNetworkRestart =
  (gqlClient: GraphQLClient) =>
  async (blockchainNetworkUniqueName: string): Promise<BlockchainNetwork> => {
    const { restartBlockchainNetworkByUniqueName: blockchainNetwork } = await gqlClient.request(
      restartBlockchainNetwork,
      { uniqueName: blockchainNetworkUniqueName },
    );
    return blockchainNetwork;
  };
