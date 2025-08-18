import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";
import { graphql, type ResultOf, type VariablesOf } from "@/helpers/graphql.js";

/**
 * GraphQL fragment containing core workspace fields.
 */
const WorkspaceFragment = graphql(
  `
    fragment Workspace on Workspace {
      id
      uniqueName
      name
      applications {
        id
        uniqueName
        name
      }
    }
  `,
);

/**
 * Type representing a workspace entity.
 */
export type Workspace = ResultOf<typeof WorkspaceFragment>;

/**
 * Query to fetch all workspaces and their applications.
 */
const getWorkspacesAndApplications = graphql(
  `
    query getWorkspacesAndApplications {
      workspaces {
        ...Workspace
        childWorkspaces {
          ...Workspace
        }
      }
    }
  `,
  [WorkspaceFragment],
);

/**
 * Query to fetch a specific workspace by unique name.
 */
const getWorkspace = graphql(
  `
    query getWorkspace($uniqueName: String!) {
      workspaceByUniqueName(uniqueName: $uniqueName) {
        ...Workspace
      }
    }
  `,
  [WorkspaceFragment],
);

/**
 * Mutation to create a new workspace.
 */
const createWorkspace = graphql(
  `
    mutation CreateWorkspace(
      $addressLine1: String
      $addressLine2: String
      $city: String
      $companyName: String
      $country: String
      $name: String!
      $parentId: String
      $paymentMethodId: String
      $postalCode: String
      $taxIdType: String
      $taxIdValue: String
    ) {
      createWorkspace(
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        city: $city
        companyName: $companyName
        country: $country
        name: $name
        parentId: $parentId
        paymentMethodId: $paymentMethodId
        postalCode: $postalCode
        taxIdType: $taxIdType
        taxIdValue: $taxIdValue
      ) {
        ...Workspace
      }
    }
  `,
  [WorkspaceFragment],
);

export type CreateWorkspaceArgs = VariablesOf<typeof createWorkspace>;

/**
 * Mutation to delete a workspace.
 */
const deleteWorkspace = graphql(
  `
    mutation deleteWorkspace($uniqueName: String!) {
      deleteWorkspaceByUniqueName(uniqueName: $uniqueName) {
        ...Workspace
      }
    }
  `,
  [WorkspaceFragment],
);

/**
 * Mutation to add credits to a workspace.
 */
const addCredits = graphql(
  `
    mutation addCredits($workspaceId: String!, $amount: Float!) {
      addCredits(workspaceId: $workspaceId, amount: $amount)
    }
  `,
);

/**
 * Creates a function to list all workspaces and their applications.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that returns all workspaces sorted by name
 * @throws If the request fails
 */
export const workspaceList = (gqlClient: GraphQLClient): (() => Promise<Workspace[]>) => {
  return async () => {
    const { workspaces } = await gqlClient.request(getWorkspacesAndApplications);
    const allWorkspaces = workspaces.reduce<Workspace[]>((acc, workspace) => {
      acc.push(workspace);
      if (workspace.childWorkspaces) {
        acc.push(...workspace.childWorkspaces);
      }
      return acc;
    }, []);
    return allWorkspaces.sort((a, b) => a.name.localeCompare(b.name));
  };
};

/**
 * Creates a function to read a specific workspace by unique name.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single workspace by unique name
 * @throws If the workspace cannot be found or the request fails
 */
export const workspaceRead = (gqlClient: GraphQLClient): ((workspaceUniqueName: string) => Promise<Workspace>) => {
  return async (workspaceUniqueName: string) => {
    const { workspaceByUniqueName } = await gqlClient.request(getWorkspace, { uniqueName: workspaceUniqueName });
    return workspaceByUniqueName;
  };
};

/**
 * Creates a function to create a new workspace.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates a new workspace with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const workspaceCreate = (gqlClient: GraphQLClient) => {
  return async (createWorkspaceArgs: CreateWorkspaceArgs) => {
    const { createWorkspace: workspace } = await gqlClient.request(createWorkspace, createWorkspaceArgs);
    return workspace;
  };
};

/**
 * Creates a function to delete a workspace.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that deletes a workspace by unique name
 * @throws If the workspace cannot be found or the deletion fails
 */
export const workspaceDelete = (gqlClient: GraphQLClient) => {
  return async (workspaceUniqueName: string) => {
    const { deleteWorkspaceByUniqueName: workspace } = await gqlClient.request(deleteWorkspace, {
      uniqueName: workspaceUniqueName,
    });
    return workspace;
  };
};

/**
 * Creates a function to add credits to a workspace.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that adds credits to a workspace
 * @throws If the workspace ID is invalid or amount is not positive
 */
export const workspaceAddCredits = (gqlClient: GraphQLClient) => {
  return async (workspaceId: Id, amount: number) => {
    const id = validate(IdSchema, workspaceId);
    if (amount <= 0) {
      throw new Error("Credit amount must be a positive number");
    }
    const { addCredits: result } = await gqlClient.request(addCredits, { workspaceId: id, amount });
    return result;
  };
};
