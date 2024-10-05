import { type ResultOf, graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment for the PrivateKey type.
 */
const PrivateKeyFragment = graphql(`
  fragment PrivateKey on PrivateKey {
    id
    name
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
  options: SettleMintClientOptions,
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
  options: SettleMintClientOptions,
): ((privatekeyId: Id) => Promise<PrivateKey>) => {
  return async (privatekeyId: Id) => {
    const id = validate(IdSchema, privatekeyId);
    const { privateKey } = await gqlClient.request(getPrivateKey, { id });
    return privateKey;
  };
};
