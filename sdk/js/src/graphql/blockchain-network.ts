import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";
import { setNetworkDefaults } from "../defaults/blockchain-network-defaults.js";

/**
 * Fragment for the BlockchainNetwork type.
 */
const BlockchainNetworkFragment = graphql(`
  fragment BlockchainNetwork on BlockchainNetwork {
    __typename
    id
    uniqueName
    name
    status
    blockchainNodes {
      ... on BlockchainNode {
        id
        name
      }
    }
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
 * GraphQL mutation to create a blockchain network.
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
export type CreateBlockchainNetworkArgs = VariablesOf<typeof createBlockchainNetwork>;

/**
 * GraphQL mutation to delete a blockchain network.
 */
const deleteBlockchainNetwork = graphql(
  `
  mutation deleteBlockchainNetwork($blockchainNetworkId: ID!) {
    deleteBlockchainNetwork(entityId: $blockchainNetworkId) {
      ...BlockchainNetwork
    }
  }
`,
  [BlockchainNetworkFragment],
);

const restartBlockchainNetwork = graphql(
  `
  mutation RestartBlockchainNetwork($id: ID!) {
    restartBlockchainNetwork(entityId: $id) {
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

/**
 * Creates a function to create a blockchain network.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes creation arguments and returns the created blockchain network.
 */
export const blockchainNetworkCreate = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((args: CreateBlockchainNetworkArgs) => Promise<BlockchainNetwork>) => {
  return async (args: CreateBlockchainNetworkArgs) => {
    const blockchainNetworkArgs = setNetworkDefaults(args);
    validate(IdSchema, blockchainNetworkArgs.applicationId);
    const { createBlockchainNetwork: blockchainNetwork } = await gqlClient.request(
      createBlockchainNetwork,
      blockchainNetworkArgs,
    );
    return blockchainNetwork;
  };
};

/**
 * Creates a function to delete a blockchain network.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes a network ID and returns a boolean indicating success.
 */
export const blockchainNetworkDelete = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((blockchainNetworkId: Id) => Promise<BlockchainNetwork>) => {
  return async (networkId: Id) => {
    const id = validate(IdSchema, networkId);
    const { deleteBlockchainNetwork: blockchainNetwork } = await gqlClient.request(deleteBlockchainNetwork, {
      blockchainNetworkId: id,
    });
    return blockchainNetwork;
  };
};

export const blockchainNetworkRestart =
  (gqlClient: GraphQLClient, _options: ClientOptions) =>
  async (networkId: Id): Promise<BlockchainNetwork> => {
    const id = validate(IdSchema, networkId);
    const { restartBlockchainNetwork: blockchainNetwork } = await gqlClient.request(restartBlockchainNetwork, { id });
    return blockchainNetwork;
  };
