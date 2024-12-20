import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * Fragment for the SmartContractSet type.
 */
const SmartContractSetFragment = graphql(`
  fragment SmartContractSet on SmartContractSet {
    __typename
    id
    uniqueName
    name
    application {
      id
    }
    status
    useCase
    user {
      id
      firstname
      lastname
    }
  }
`);

/**
 * Represents a smart contract set with its details.
 */
export type SmartContractSet = ResultOf<typeof SmartContractSetFragment>;

/**
 * GraphQL query to fetch smart contract sets for a given application.
 */
const getSmartContractSets = graphql(
  `
  query getSmartContractSets($id: ID!) {
    smartContractSets(applicationId: $id) {
      items {
        ...SmartContractSet
      }
    }
  }`,
  [SmartContractSetFragment],
);

/**
 * GraphQL query to fetch a specific smart contract set by its ID.
 */
const getSmartContractSet = graphql(
  `
  query getSmartContractSet($id: ID!) {
    smartContractSet(entityId: $id) {
      ...SmartContractSet
    }
  }`,
  [SmartContractSetFragment],
);

/**
 * GraphQL mutation to create a smart contract set.
 */
const createSmartContractSet = graphql(
  `
  mutation CreateSmartContractSet(
    $applicationId: ID!
    $name: String!
    $blockchainNodeId: ID!
    $useCase: String!
    $userId: ID
    $provider: String!
    $region: String!
    $size: ClusterServiceSize
    $type: ClusterServiceType
  ) {
    createSmartContractSet(
      applicationId: $applicationId,
      name: $name,
      blockchainNodeId: $blockchainNodeId
      useCase: $useCase
      userId: $userId
      provider: $provider,
      region: $region
      size: $size
      type: $type
    ) {
      ...SmartContractSet
    }
  }`,
  [SmartContractSetFragment],
);

export type CreateSmartContractSetArgs = Omit<
  VariablesOf<typeof createSmartContractSet>,
  "applicationId" | "blockchainNodeId"
> & {
  applicationUniqueName: string;
  blockchainNodeUniqueName: string;
};

/**
 * GraphQL mutation to restart a smart contract set.
 */
const restartSmartContractSet = graphql(
  `
  mutation RestartSmartContractSet($entityId: ID!) {
    restartSmartContractSet(entityId: $entityId) {
      ...SmartContractSet
    }
  }`,
  [SmartContractSetFragment],
);

export type RestartSmartContractSetArgs = VariablesOf<typeof restartSmartContractSet>;

/**
 * Creates a function to list smart contract sets for a given application.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an application ID and returns a list of smart contract sets.
 * @throws Will throw an error if the application ID is invalid.
 */
export const smartContractSetList = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((applicationId: Id) => Promise<SmartContractSet[]>) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      smartContractSets: { items },
    } = await gqlClient.request(getSmartContractSets, { id });
    return items;
  };
};

/**
 * Creates a function to read a specific smart contract set.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes a smart contract set ID and returns the smart contract set details.
 * @throws Will throw an error if the smart contract set ID is invalid.
 */
export const smartContractSetRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((smartContractSetId: Id) => Promise<SmartContractSet>) => {
  return async (smartContractSetId: Id) => {
    const id = validate(IdSchema, smartContractSetId);
    const { smartContractSet } = await gqlClient.request(getSmartContractSet, { id });
    return smartContractSet;
  };
};

/**
 * Creates a function to create a new smart contract set.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes smart contract set creation arguments and returns a promise resolving to the created smart contract set.
 */
export const smartContractSetCreate = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((args: CreateSmartContractSetArgs) => Promise<SmartContractSet>) => {
  return async (args: CreateSmartContractSetArgs) => {
    validate(IdSchema, args.applicationId);
    validate(IdSchema, args.blockchainNodeId);
    if (typeof args.userId === "string") {
      validate(IdSchema, args.userId);
    }
    const { createSmartContractSet: smartContractSet } = await gqlClient.request(createSmartContractSet, args);
    return smartContractSet;
  };
};

export const smartContractSetRestart =
  (gqlClient: GraphQLClient, _options: ClientOptions) =>
  async (smartContractSetId: Id): Promise<SmartContractSet> => {
    const id = validate(IdSchema, smartContractSetId);
    const { restartSmartContractSet: smartContractSet } = await gqlClient.request(restartSmartContractSet, {
      entityId: id,
    });
    return smartContractSet;
  };
