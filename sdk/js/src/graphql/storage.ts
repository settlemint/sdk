import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment for the Storage type.
 */
const StorageFragment = graphql(`
  fragment Storage on Storage {
    id
    name
    status
    storageProtocol
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

/**
 * Represents a storage item with its details.
 */
export type Storage = ResultOf<typeof StorageFragment>;

/**
 * GraphQL query to fetch storages for a given application.
 */
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

/**
 * GraphQL query to fetch a specific storage by its ID.
 */
const getStorage = graphql(
  `
query getStorage($id: ID!) {
  storage(entityId: $id) {
    ...Storage
  }
}
`,
  [StorageFragment],
);

/**
 * GraphQL mutation to create a new storage.
 */
const createStorage = graphql(
  `
mutation CreateStorage(
  $applicationId: ID!,
  $name: String!,
  $storageProtocol: StorageProtocol!,
  $provider: String!,
  $region: String!,
  $size: ClusterServiceSize
  $type: ClusterServiceType
) {
  createStorage(
    applicationId: $applicationId,
    name: $name,
    storageProtocol: $storageProtocol,
    provider: $provider,
    region: $region,
    size: $size,
    type: $type
  ) {
    ...Storage
  }
}
`,
  [StorageFragment],
);

export type CreateStorageArgs = VariablesOf<typeof createStorage>;

/**
 * Creates a function to list storage items for a given application.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an application ID and returns a list of storage items.
 * @throws Will throw an error if the application ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const storageItems = await client.storage.list('applicationId');
 */
export const storageList = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((applicationId: Id) => Promise<Storage[]>) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      storages: { items },
    } = await gqlClient.request(getStorages, { id });
    return items;
  };
};

/**
 * Creates a function to read a specific storage item.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes a storage ID and returns the storage item details.
 * @throws Will throw an error if the storage ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const storageItem = await client.storage.read('storageId');
 */
export const storageRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((storageId: Id) => Promise<Storage>) => {
  return async (storageId: Id) => {
    const id = validate(IdSchema, storageId);
    const { storage } = await gqlClient.request(getStorage, { id });
    return storage;
  };
};

/**
 * Creates a function to create a new storage item.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes storage creation arguments and returns a promise resolving to the created storage item.
 * @throws Will throw an error if the application ID is invalid.
 */
export const storageCreate = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((args: CreateStorageArgs) => Promise<Storage>) => {
  return async (args: CreateStorageArgs) => {
    validate(IdSchema, args.applicationId);
    const { createStorage: storage } = await gqlClient.request(createStorage, args);
    return storage;
  };
};
