import { applicationRead } from "@/graphql/application.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment containing core storage fields.
 */
const StorageFragment = graphql(`
  fragment Storage on Storage {
    __typename
    id
    uniqueName
    name
    status
    healthStatus
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
 * Type representing a storage entity.
 */
export type Storage = ResultOf<typeof StorageFragment>;

/**
 * Query to fetch storages for an application.
 */
const getStorages = graphql(
  `
    query GetStorages($applicationUniqueName: String!) {
      storagesByUniqueName(applicationUniqueName: $applicationUniqueName) {
        items {
          ...Storage
        }
      }
    }
  `,
  [StorageFragment],
);

/**
 * Query to fetch a specific storage.
 */
const getStorage = graphql(
  `
    query GetStorage($uniqueName: String!) {
      storageByUniqueName(uniqueName: $uniqueName) {
        ...Storage
      }
    }
  `,
  [StorageFragment],
);

/**
 * Mutation to create a new storage.
 */
const createStorage = graphql(
  `
    mutation CreateStorage(
      $applicationId: ID!
      $name: String!
      $storageProtocol: StorageProtocol!
      $provider: String!
      $region: String!
      $size: ClusterServiceSize
      $type: ClusterServiceType
    ) {
      createStorage(
        applicationId: $applicationId
        name: $name
        storageProtocol: $storageProtocol
        provider: $provider
        region: $region
        size: $size
        type: $type
      ) {
        ...Storage
      }
    }
  `,
  [StorageFragment],
);

/**
 * Arguments required to create a storage.
 */
export type CreateStorageArgs = Omit<VariablesOf<typeof createStorage>, "applicationId"> & {
  applicationUniqueName: string;
};

/**
 * Mutation to restart a storage.
 */
const restartStorage = graphql(
  `
    mutation RestartStorage($uniqueName: String!) {
      restartStorageByUniqueName(uniqueName: $uniqueName) {
        ...Storage
      }
    }
  `,
  [StorageFragment],
);

/**
 * Creates a function to list storages for an application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches storages for an application
 * @throws If the application cannot be found or the request fails
 */
export const storageList = (gqlClient: GraphQLClient): ((applicationUniqueName: string) => Promise<Storage[]>) => {
  return async (applicationUniqueName: string) => {
    const {
      storagesByUniqueName: { items },
    } = await gqlClient.request(getStorages, { applicationUniqueName });
    return items;
  };
};

/**
 * Creates a function to fetch a specific storage.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single storage by unique name
 * @throws If the storage cannot be found or the request fails
 */
export const storageRead = (gqlClient: GraphQLClient): ((storageUniqueName: string) => Promise<Storage>) => {
  return async (storageUniqueName: string) => {
    const { storageByUniqueName: storage } = await gqlClient.request(getStorage, { uniqueName: storageUniqueName });
    return storage;
  };
};

/**
 * Creates a function to create a new storage.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates new storage with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const storageCreate = (gqlClient: GraphQLClient): ((args: CreateStorageArgs) => Promise<Storage>) => {
  return async (args: CreateStorageArgs) => {
    const { applicationUniqueName, ...otherArgs } = args;
    const application = await applicationRead(gqlClient)(applicationUniqueName);
    const { createStorage: storage } = await gqlClient.request(createStorage, {
      ...otherArgs,
      applicationId: application.id,
    });
    return storage;
  };
};

/**
 * Creates a function to restart a storage.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that restarts storage by unique name
 * @throws If the storage cannot be found or the restart fails
 */
export const storageRestart =
  (gqlClient: GraphQLClient) =>
  async (storageUniqueName: string): Promise<Storage> => {
    const { restartStorageByUniqueName: storage } = await gqlClient.request(restartStorage, {
      uniqueName: storageUniqueName,
    });
    return storage;
  };
