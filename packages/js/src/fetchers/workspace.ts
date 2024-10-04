import { graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

const getWorkspacesAndApplications = graphql(`
  query getWorkspacesAndApplications {
    workspaces {
      id
      name
      applications {
        id
        name
      }
    }
  }
`);

const getWorkspace = graphql(`
  query getWorkspace($id: ID!) {
    workspace(workspaceId: $id) {
      id
      name
      applications {
        id
        name
      }
    }
  }
`);

export const workspaceList = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async () => {
    const { workspaces } = await gqlClient.request(getWorkspacesAndApplications);
    return workspaces;
  };
};

export const workspaceRead = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (workspaceId: Id) => {
    const id = validate(IdSchema, workspaceId);
    const { workspace } = await gqlClient.request(getWorkspace, { id });
    return workspace;
  };
};
