import { applicationRead } from "@/graphql/application.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";
import { blockchainNodeRead } from "./blockchain-node.js";
import { getPlatformConfig } from "./platform.js";

/**
 * GraphQL fragment containing core private key fields.
 */
const PrivateKeyFragment = graphql(`
  fragment PrivateKey on PrivateKey {
    __typename
    id
    uniqueName
    name
    privateKeyType
    status
  }
`);

/**
 * Type representing a private key entity.
 */
export type PrivateKey = ResultOf<typeof PrivateKeyFragment>;

/**
 * Query to fetch private keys for an application.
 */
const getPrivateKeys = graphql(
  `
    query GetPrivateKeys($applicationUniqueName: String!) {
      privateKeysByUniqueName(applicationUniqueName: $applicationUniqueName) {
        items {
          ...PrivateKey
        }
      }
    }
  `,
  [PrivateKeyFragment],
);

/**
 * Query to fetch a specific private key.
 */
const getPrivateKey = graphql(
  `
    query GetPrivateKey($uniqueName: String!) {
      privateKeyByUniqueName(uniqueName: $uniqueName) {
        ...PrivateKey
      }
    }
  `,
  [PrivateKeyFragment],
);

/**
 * Mutation to create a new private key.
 */
const createPrivateKey = graphql(
  `
    mutation CreatePrivateKey(
      $applicationId: ID!
      $name: String!
      $privateKeyType: PrivateKeyType!
      $provider: String!
      $region: String!
      $size: ClusterServiceSize
      $type: ClusterServiceType
      $blockchainNodes: [ID!]
    ) {
      createPrivateKey(
        applicationId: $applicationId
        name: $name
        privateKeyType: $privateKeyType
        provider: $provider
        region: $region
        size: $size
        type: $type
        blockchainNodes: $blockchainNodes
      ) {
        ...PrivateKey
      }
    }
  `,
  [PrivateKeyFragment],
);

/**
 * Arguments required to create a private key.
 */
export type CreatePrivateKeyArgs = Omit<
  VariablesOf<typeof createPrivateKey>,
  "applicationId" | "blockchainNodes" | "region" | "provider" | "size" | "type"
> & {
  applicationUniqueName: string;
  blockchainNodeUniqueNames?: string[];
};

/**
 * Mutation to restart a private key.
 */
const restartPrivateKey = graphql(
  `
    mutation RestartPrivateKey($uniqueName: String!) {
      restartPrivateKeyByUniqueName(uniqueName: $uniqueName) {
        ...PrivateKey
      }
    }
  `,
  [PrivateKeyFragment],
);

/**
 * Creates a function to list private keys for an application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches private keys for an application
 * @throws If the application cannot be found or the request fails
 */
export const privateKeyList = (
  gqlClient: GraphQLClient,
): ((applicationUniqueName: string) => Promise<PrivateKey[]>) => {
  return async (applicationUniqueName: string) => {
    const {
      privateKeysByUniqueName: { items },
    } = await gqlClient.request(getPrivateKeys, { applicationUniqueName });
    return items;
  };
};

/**
 * Creates a function to fetch a specific private key.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single private key by unique name
 * @throws If the private key cannot be found or the request fails
 */
export const privatekeyRead = (gqlClient: GraphQLClient): ((privateKeyUniqueName: string) => Promise<PrivateKey>) => {
  return async (privateKeyUniqueName: string) => {
    const { privateKeyByUniqueName: privateKey } = await gqlClient.request(getPrivateKey, {
      uniqueName: privateKeyUniqueName,
    });
    return privateKey;
  };
};

/**
 * Creates a function to create a new private key.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates new private key with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const privateKeyCreate = (gqlClient: GraphQLClient): ((args: CreatePrivateKeyArgs) => Promise<PrivateKey>) => {
  return async (args: CreatePrivateKeyArgs) => {
    const { applicationUniqueName, blockchainNodeUniqueNames, ...otherArgs } = args;
    const application = await applicationRead(gqlClient)(applicationUniqueName);
    const blockchainNodes = blockchainNodeUniqueNames
      ? await Promise.all(blockchainNodeUniqueNames.map((uniqueName) => blockchainNodeRead(gqlClient)(uniqueName)))
      : [];
    const platformConfig = await getPlatformConfig(gqlClient)();
    const defaultProvider = platformConfig.deploymentEngineTargets.find(
      (target) => !target.disabled && target.clusters.some((cluster) => !cluster.disabled),
    );
    const defaultRegion = defaultProvider?.clusters.find((cluster) => !cluster.disabled);
    const { createPrivateKey: privateKey } = await gqlClient.request(createPrivateKey, {
      ...otherArgs,
      applicationId: application.id,
      blockchainNodes: blockchainNodes.map((node) => node?.id),
      provider: defaultProvider?.id ?? "gke",
      region: defaultRegion?.id?.split("-")[1] ?? "europe",
      size: "SMALL",
      type: "SHARED",
    });
    return privateKey;
  };
};

/**
 * Creates a function to restart a private key.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that restarts private key by unique name
 * @throws If the private key cannot be found or the restart fails
 */
export const privateKeyRestart =
  (gqlClient: GraphQLClient) =>
  async (privateKeyUniqueName: string): Promise<PrivateKey> => {
    const { restartPrivateKeyByUniqueName: privateKey } = await gqlClient.request(restartPrivateKey, {
      uniqueName: privateKeyUniqueName,
    });
    return privateKey;
  };
