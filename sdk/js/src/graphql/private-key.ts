import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment for the PrivateKey type.
 */
const PrivateKeyFragment = graphql(`
  fragment PrivateKey on PrivateKey {
    __typename
    id
    name
    uniqueName
    privateKeyType
    status
  }
`);

/**
 * Represents a private key with its details.
 */
export type PrivateKey = ResultOf<typeof PrivateKeyFragment>;

/**
 * GraphQL query to fetch private keys for a given application.
 */
const getPrivateKeys = graphql(
  `
query getPrivateKeys($id: ID!) {
  privateKeys(applicationId: $id) {
    items {
      ...PrivateKey
    }
  }
}`,
  [PrivateKeyFragment],
);

/**
 * GraphQL query to fetch a specific private key by its ID.
 */
const getPrivateKey = graphql(
  `
query getPrivateKey($id: ID!) {
  privateKey(entityId: $id) {
    ...PrivateKey
  }
}
`,
  [PrivateKeyFragment],
);

/**
 * GraphQL mutation to create a private key.
 */
const createPrivateKey = graphql(
  `
  mutation CreatePrivateKey(
    $applicationId: ID!,
    $name: String!,
    $privateKeyType: PrivateKeyType!,
    $provider: String!
    $region: String!
    $size: ClusterServiceSize
    $type: ClusterServiceType
    $blockchainNodes: [ID!]
  ) {
    createPrivateKey(
      applicationId: $applicationId,
      name: $name,
      privateKeyType: $privateKeyType,
      provider: $provider,
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

export type CreatePrivateKeyArgs = VariablesOf<typeof createPrivateKey>;

const restartPrivateKey = graphql(
  `
  mutation RestartPrivateKey($id: ID!) {
    restartPrivateKey(entityId: $id) {
      ...PrivateKey
    }
  }
`,
  [PrivateKeyFragment],
);

/**
 * Creates a function to list private keys for a given application.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an application ID and returns a list of private keys.
 * @throws Will throw an error if the application ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const privateKeys = await client.privateKey.list('applicationId');
 */
export const privateKeyList = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((applicationId: Id) => Promise<PrivateKey[]>) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      privateKeys: { items },
    } = await gqlClient.request(getPrivateKeys, { id });
    return items;
  };
};

/**
 * Creates a function to read a specific private key.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes a private key ID and returns the private key details.
 * @throws Will throw an error if the private key ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const privateKey = await client.privateKey.read('privateKeyId');
 */
export const privatekeyRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((privatekeyId: Id) => Promise<PrivateKey>) => {
  return async (privatekeyId: Id) => {
    const id = validate(IdSchema, privatekeyId);
    const { privateKey } = await gqlClient.request(getPrivateKey, { id });
    return privateKey;
  };
};

/**
 * Creates a function to create a new private key.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes private key creation arguments and returns a promise resolving to the created private key.
 * @throws Will throw an error if the application ID is invalid.
 *
 */
export const privateKeyCreate = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((args: CreatePrivateKeyArgs) => Promise<PrivateKey>) => {
  return async (args: CreatePrivateKeyArgs) => {
    validate(IdSchema, args.applicationId);
    const { createPrivateKey: privateKey } = await gqlClient.request(createPrivateKey, args);
    return privateKey;
  };
};

export const privateKeyRestart =
  (gqlClient: GraphQLClient, _options: ClientOptions) =>
  async (keyId: Id): Promise<PrivateKey> => {
    const id = validate(IdSchema, keyId);
    const { restartPrivateKey: privateKey } = await gqlClient.request(restartPrivateKey, { id });
    return privateKey;
  };
