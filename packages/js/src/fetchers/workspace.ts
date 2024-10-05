import { type ResultOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas.js";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment for the Application type.
 */
const ApplicationFragment = graphql(`
  fragment Application on Application {
    id
    name
  }
`);

/**
 * Represents an application with its details.
 */
export type Application = ResultOf<typeof ApplicationFragment>;

/**
 * GraphQL fragment for the Workspace type.
 */
const WorkspaceFragment = graphql(
  `
  fragment Workspace on Workspace {
    id
    name
    applications {
      ...Application
    }
  }
`,
  [ApplicationFragment],
);

/**
 * Represents a workspace with its details and associated applications.
 */
export type Workspace = ResultOf<typeof WorkspaceFragment>;

/**
 * GraphQL query to fetch all workspaces and their applications.
 */
const getWorkspacesAndApplications = graphql(
  `
  query getWorkspacesAndApplications {
    workspaces {
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
 * GraphQL query to fetch a specific workspace and its applications.
 */
const getWorkspace = graphql(
  `
  query getWorkspace($id: ID!) {
    workspace(workspaceId: $id) {
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
 * Creates a function to list all workspaces and their applications.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that returns a promise resolving to an array of workspaces and their applications.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const workspaces = await client.workspace.list();
 */
export const workspaceList = (
  gqlClient: GraphQLClient,
  options: SettleMintClientOptions,
): (() => Promise<Workspace[]>) => {
  return async () => {
    const { workspaces } = await gqlClient.request(getWorkspacesAndApplications);
    return workspaces;
  };
};

/**
 * Creates a function to read a specific workspace and its applications.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes a workspace ID and returns a promise resolving to the workspace details and its applications.
 * @throws Will throw an error if the workspace ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const workspace = await client.workspace.read('workspaceId');
 */
export const workspaceRead = (
  gqlClient: GraphQLClient,
  options: SettleMintClientOptions,
): ((workspaceId: Id) => Promise<Workspace>) => {
  return async (workspaceId: Id) => {
    const id = validate(IdSchema, workspaceId);
    const { workspace } = await gqlClient.request(getWorkspace, { id });
    return workspace;
  };
};
