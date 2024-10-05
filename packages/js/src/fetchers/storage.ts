import { graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

const StorageFragment = graphql(`
  fragment Storage on Storage {
    id
    name
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
  }
`);

const getStorages = graphql(
  `
query getStorages($id: ID!) {
  storages(applicationId: $id) {
    items {
      ...Storage
    }
  }
}`,
  [StorageFragment],
);

const getBlockchainNetwork = graphql(
  `
query getStorage($id: ID!) {
  storage(entityId: $id) {
    ...Storage
  }
}
`,
  [StorageFragment],
);

export const storageList = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      storages: { items },
    } = await gqlClient.request(getStorages, { id });
    return items;
  };
};

export const storageRead = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (storageId: Id) => {
    const id = validate(IdSchema, storageId);
    const { storage } = await gqlClient.request(getBlockchainNetwork, { id });
    return storage;
  };
};
