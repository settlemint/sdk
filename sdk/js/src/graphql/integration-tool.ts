import { applicationRead } from "@/graphql/application.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment containing core integration fields.
 */
const IntegrationFragment = graphql(`
  fragment Integration on Integration {
    __typename
    id
    uniqueName
    name
    status
    integrationType
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

type IntegrationToolGraphql = ResultOf<typeof IntegrationFragment>;

/**
 * Type representing an integration tool entity.
 */
export interface IntegrationTool
  extends Pick<
    IntegrationToolGraphql,
    "id" | "uniqueName" | "name" | "status" | "integrationType" | "endpoints" | "credentials"
  > {
  __typename: IntegrationToolGraphql["__typename"];
}

/**
 * Query to fetch integrations for an application.
 */
const getIntegrations = graphql(
  `
    query GetIntegrations($applicationUniqueName: String!) {
      integrationsByUniqueName(applicationUniqueName: $applicationUniqueName) {
        items {
          ...Integration
        }
      }
    }
  `,
  [IntegrationFragment],
);

/**
 * Query to fetch a specific integration.
 */
const getIntegration = graphql(
  `
    query GetIntegration($uniqueName: String!) {
      integrationByUniqueName(uniqueName: $uniqueName) {
        ...Integration
      }
    }
  `,
  [IntegrationFragment],
);

/**
 * Mutation to create a new integration.
 */
const createIntegration = graphql(
  `
    mutation CreateIntegration(
      $applicationId: ID!
      $name: String!
      $integrationType: IntegrationType!
      $provider: String!
      $region: String!
      $size: ClusterServiceSize
      $type: ClusterServiceType
    ) {
      createIntegration(
        applicationId: $applicationId
        name: $name
        integrationType: $integrationType
        provider: $provider
        region: $region
        size: $size
        type: $type
      ) {
        ...Integration
      }
    }
  `,
  [IntegrationFragment],
);

/**
 * Arguments required to create an integration tool.
 */
export type CreateIntegrationToolArgs = Omit<VariablesOf<typeof createIntegration>, "applicationId"> & {
  applicationUniqueName: string;
};

/**
 * Mutation to restart an integration.
 */
const restartIntegrationTool = graphql(
  `
    mutation RestartIntegrationTool($uniqueName: String!) {
      restartIntegrationByUniqueName(uniqueName: $uniqueName) {
        ...Integration
      }
    }
  `,
  [IntegrationFragment],
);

/**
 * Creates a function to list integration tools for an application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches integration tools for an application
 * @throws If the application cannot be found or the request fails
 */
export const integrationToolList = (
  gqlClient: GraphQLClient,
): ((applicationUniqueName: string) => Promise<IntegrationTool[]>) => {
  return async (applicationUniqueName: string) => {
    const {
      integrationsByUniqueName: { items },
    } = await gqlClient.request(getIntegrations, { applicationUniqueName });
    return items;
  };
};

/**
 * Creates a function to fetch a specific integration tool.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single integration tool by unique name
 * @throws If the integration tool cannot be found or the request fails
 */
export const integrationToolRead = (
  gqlClient: GraphQLClient,
): ((integrationUniqueName: string) => Promise<IntegrationTool>) => {
  return async (integrationUniqueName: string) => {
    const { integrationByUniqueName } = await gqlClient.request(getIntegration, { uniqueName: integrationUniqueName });
    return integrationByUniqueName;
  };
};

/**
 * Creates a function to create a new integration tool.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates new integration tool with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const integrationToolCreate = (
  gqlClient: GraphQLClient,
): ((args: CreateIntegrationToolArgs) => Promise<IntegrationTool>) => {
  return async (args: CreateIntegrationToolArgs) => {
    const { applicationUniqueName, ...otherArgs } = args;
    const application = await applicationRead(gqlClient)(applicationUniqueName);
    const { createIntegration: integration } = await gqlClient.request(createIntegration, {
      ...otherArgs,
      applicationId: application.id,
    });
    return integration;
  };
};

/**
 * Creates a function to restart an integration tool.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that restarts integration tool by unique name
 * @throws If the integration tool cannot be found or the restart fails
 */
export const integrationToolRestart =
  (gqlClient: GraphQLClient) =>
  async (integrationUniqueName: string): Promise<IntegrationTool> => {
    const { restartIntegrationByUniqueName: integration } = await gqlClient.request(restartIntegrationTool, {
      uniqueName: integrationUniqueName,
    });
    return integration;
  };
