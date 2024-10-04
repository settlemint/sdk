import { graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

const PrivateKeyFragment = graphql(`
  fragment PrivateKey on PrivateKey {
    id
    name
  }
`);

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

const getBlockchainNetwork = graphql(
  `
query getPrivateKey($id: ID!) {
  privateKey(entityId: $id) {
    ...PrivateKey
  }
}
`,
  [PrivateKeyFragment],
);

export const privateKeyList = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId ?? options?.applicationId);
    const {
      privateKeys: { items },
    } = await gqlClient.request(getPrivateKeys, { id });
    return items;
  };
};

export const privatekeyRead = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (privatekeyId: Id) => {
    const id = validate(IdSchema, privatekeyId ?? options?.privateKeyId);
    const { privateKey } = await gqlClient.request(getBlockchainNetwork, { id });
    return privateKey;
  };
};
