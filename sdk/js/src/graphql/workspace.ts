import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment containing core application fields.
 */
export const ApplicationFragment = graphql(`
  fragment Application on Application {
    id
    uniqueName
    name
    workspace {
      id
      uniqueName
    }
  }
`);

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
        ...Application
      }
    }
  `,
  [ApplicationFragment],
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
        applications {
          ...Application
        }
        childWorkspaces {
          ...Workspace
        }
      }
    }
  `,
  [WorkspaceFragment, ApplicationFragment],
);

/**
 * Query to fetch a specific workspace by unique name.
 */
const getWorkspace = graphql(
  `
    query getWorkspace($uniqueName: String!) {
      workspaceByUniqueName(uniqueName: $uniqueName) {
        ...Workspace
        applications {
          ...Application
        }
      }
    }
  `,
  [WorkspaceFragment, ApplicationFragment],
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
        applications {
          ...Application
        }
      }
    }
  `,
  [WorkspaceFragment, ApplicationFragment],
);

export type CreateWorkspaceArgs = VariablesOf<typeof createWorkspace>;

/**
 * Mutation to delete a workspace.
 */
const deleteWorkspace = graphql(
  `
    mutation deleteWorkspace($id: ID!) {
      deleteWorkspace(workspaceId: $id) {
        ...Workspace
        applications {
          ...Application
        }
      }
    }
  `,
  [WorkspaceFragment, ApplicationFragment],
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
 * @param options - Client configuration options
 * @returns Function that returns all workspaces sorted by name
 * @throws If the request fails
 */
export const workspaceList = (gqlClient: GraphQLClient, options: ClientOptions): (() => Promise<Workspace[]>) => {
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
 * @param options - Client configuration options
 * @returns Function that fetches a single workspace by unique name
 * @throws If the workspace cannot be found or the request fails
 */
export const workspaceRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((workspaceUniqueName: string) => Promise<Workspace>) => {
  return async (workspaceUniqueName: string) => {
    const { workspaceByUniqueName } = await gqlClient.request(getWorkspace, { uniqueName: workspaceUniqueName });
    return workspaceByUniqueName;
  };
};

/**
 * Creates a function to create a new workspace.
 *
 * @param gqlClient - The GraphQL client instance
 * @param options - Client configuration options
 * @returns Function that creates a new workspace with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const workspaceCreate = (gqlClient: GraphQLClient, options: ClientOptions) => {
  return async (createWorkspaceArgs: CreateWorkspaceArgs) => {
    const { createWorkspace: workspace } = await gqlClient.request(createWorkspace, createWorkspaceArgs);
    return workspace;
  };
};

/**
 * Creates a function to delete a workspace.
 *
 * @param gqlClient - The GraphQL client instance
 * @param options - Client configuration options
 * @returns Function that deletes a workspace by unique name
 * @throws If the workspace cannot be found or the deletion fails
 */
export const workspaceDelete = (gqlClient: GraphQLClient, options: ClientOptions) => {
  return async (workspaceUniqueName: string) => {
    // TODO: dedicated mutation on platform
    const workspaceToDelete = await workspaceRead(gqlClient, options)(workspaceUniqueName);
    const { deleteWorkspace: workspace } = await gqlClient.request(deleteWorkspace, { id: workspaceToDelete.id });
    return workspace;
  };
};

/**
 * Creates a function to add credits to a workspace.
 *
 * @param gqlClient - The GraphQL client instance
 * @param options - Client configuration options
 * @returns Function that adds credits to a workspace
 * @throws If the workspace ID is invalid or amount is not positive
 */
export const workspaceAddCredits = (gqlClient: GraphQLClient, options: ClientOptions) => {
  return async (workspaceId: Id, amount: number) => {
    const id = validate(IdSchema, workspaceId);
    if (amount <= 0) {
      throw new Error("Credit amount must be a positive number");
    }
    const { addCredits: result } = await gqlClient.request(addCredits, { workspaceId: id, amount });
    return result;
  };
};
