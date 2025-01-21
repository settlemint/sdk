import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";
import { workspaceRead } from "./workspace.js";

/**
 * GraphQL fragment containing core application fields.
 */
const ApplicationFragment = graphql(`
  fragment Application on Application {
    id
    uniqueName
    name
    workspace {
      id
      uniqueName
      name
    }
  }
`);

/**
 * Type representing an application entity.
 */
export type Application = ResultOf<typeof ApplicationFragment>;

/**
 * Query to fetch applications for a workspace.
 */
const listApplications = graphql(
  `
    query ListApplications($workspaceUniqueName: String!) {
      workspaceByUniqueName(uniqueName: $workspaceUniqueName) {
        applications {
          ...Application
        }
      }
    }
  `,
  [ApplicationFragment],
);

/**
 * Query to fetch a specific application.
 */
const readApplication = graphql(
  `
    query ReadApplication($applicationUniqueName: String!) {
      applicationByUniqueName(uniqueName: $applicationUniqueName) {
        ...Application
      }
    }
  `,
  [ApplicationFragment],
);

/**
 * Mutation to create a new application.
 */
const createApplication = graphql(
  `
    mutation CreateApplication($name: String!, $workspaceId: ID!) {
      createApplication(name: $name, workspaceId: $workspaceId) {
        ...Application
      }
    }
  `,
  [ApplicationFragment],
);

/**
 * Mutation to delete an application.
 */
const deleteApplication = graphql(
  `
    mutation DeleteApplication($uniqueName: String!) {
      deleteApplicationByUniqueName(uniqueName: $uniqueName) {
        ...Application
      }
    }
  `,
  [ApplicationFragment],
);

/**
 * Arguments required to create an application.
 */
export type CreateApplicationArgs = Omit<VariablesOf<typeof createApplication>, "workspaceId"> & {
  workspaceUniqueName: string;
};

/**
 * Creates a function to list applications in a workspace.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches applications for a workspace
 * @throws If the workspace cannot be found or the request fails
 */
export const applicationList = (gqlClient: GraphQLClient) => {
  return async (workspaceUniqueName: string): Promise<Application[]> => {
    const {
      workspaceByUniqueName: { applications },
    } = await gqlClient.request(listApplications, { workspaceUniqueName });
    return applications;
  };
};

/**
 * Creates a function to fetch a specific application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single application by unique name
 * @throws If the application cannot be found or the request fails
 */
export const applicationRead = (gqlClient: GraphQLClient) => {
  return async (applicationUniqueName: string): Promise<Application> => {
    const { applicationByUniqueName: application } = await gqlClient.request(readApplication, {
      applicationUniqueName,
    });
    return application;
  };
};

/**
 * Creates a function to create a new application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates a new application with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const applicationCreate = (gqlClient: GraphQLClient) => {
  return async (args: CreateApplicationArgs): Promise<Application> => {
    const { workspaceUniqueName, ...otherArgs } = args;
    const workspace = await workspaceRead(gqlClient)(workspaceUniqueName);
    const { createApplication: application } = await gqlClient.request(createApplication, {
      ...otherArgs,
      workspaceId: workspace.id,
    });
    return application;
  };
};

/**
 * Creates a function to delete an application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that deletes an application by unique name
 * @throws If the application cannot be found or the deletion fails
 */
export const applicationDelete = (gqlClient: GraphQLClient) => {
  return async (applicationUniqueName: string): Promise<Application> => {
    const { deleteApplicationByUniqueName: application } = await gqlClient.request(deleteApplication, {
      uniqueName: applicationUniqueName,
    });
    return application;
  };
};
