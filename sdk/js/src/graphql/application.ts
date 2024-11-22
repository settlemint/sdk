import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment for the Application type.
 * This fragment is used to fetch the basic details of an application.
 */
export const ApplicationFragment = graphql(`
  fragment Application on Application {
    id
    name
    workspace { id }
  }
`);

/**
 * Represents an application with its details.
 * This type is derived from the ApplicationFragment.
 */
export type Application = ResultOf<typeof ApplicationFragment>;

const listApplications = graphql(
  `
  query ListApplications($workspaceId: ID!) {
    workspace (workspaceId: $workspaceId) {
      applications {
        ...Application
      }
    }
  }
  `,
  [ApplicationFragment],
);

const readApplication = graphql(
  `
  query ReadApplication($id: ID!) {
    application(applicationId: $id) {
      ...Application
    }
  }
  `,
  [ApplicationFragment],
);

const createApplication = graphql(
  `
  mutation CreateApplication(
    $name: String!
    $workspaceId: ID!
  ) {
    createApplication(
      name: $name
      workspaceId: $workspaceId
    ) {
      ...Application
    }
  }
  `,
  [ApplicationFragment],
);

const deleteApplication = graphql(
  `
  mutation DeleteApplication($id: ID!) {
    deleteApplication(id: $id) {
      ...Application
    }
  }
  `,
  [ApplicationFragment],
);

export type CreateApplicationArgs = VariablesOf<typeof createApplication>;

/**
 * Lists all applications in a workspace.
 *
 * @param gqlClient - The GraphQL client instance used to execute the query.
 * @param options - Configuration options for the client.
 * @returns A function that accepts the workspace ID and returns a promise resolving to an array of applications.
 */
export const applicationList = (gqlClient: GraphQLClient, options: ClientOptions) => {
  return async (workspaceId: Id): Promise<Application[]> => {
    const id = validate(IdSchema, workspaceId);
    const {
      workspace: { applications },
    } = await gqlClient.request(listApplications, { workspaceId: id });
    return applications;
  };
};

/**
 * Reads a specific application by ID.
 *
 * @param gqlClient - The GraphQL client instance used to execute the query.
 * @param options - Configuration options for the client.
 * @returns A function that accepts the application ID and returns a promise resolving to the application details.
 */
export const applicationRead = (gqlClient: GraphQLClient, options: ClientOptions) => {
  return async (applicationId: Id): Promise<Application> => {
    const id = validate(IdSchema, applicationId);
    const { application } = await gqlClient.request(readApplication, { id });
    return application;
  };
};

/**
 * Creates a new application.
 *
 * @param gqlClient - The GraphQL client instance used to execute the mutation.
 * @param options - Configuration options for the client.
 * @returns A function that accepts the arguments for creating an application and returns a promise resolving to the created application.
 */
export const applicationCreate = (gqlClient: GraphQLClient, options: ClientOptions) => {
  return async (args: CreateApplicationArgs): Promise<Application> => {
    const { createApplication: application } = await gqlClient.request(createApplication, args);
    return application;
  };
};

/**
 * Deletes an existing application.
 *
 * @param gqlClient - The GraphQL client instance used to execute the mutation.
 * @param options - Configuration options for the client.
 * @returns A function that accepts the ID of the application to delete and returns a promise resolving to the deleted application.
 */
export const applicationDelete = (gqlClient: GraphQLClient, options: ClientOptions) => {
  return async (applicationId: Id): Promise<Application> => {
    const id = validate(IdSchema, applicationId);
    const { deleteApplication: application } = await gqlClient.request(deleteApplication, { id });
    return application;
  };
};
