import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment for the Integration type.
 */
const IntegrationFragment = graphql(`
  fragment Integration on Integration {
    id
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

/**
 * Represents integration tools with their details.
 */
export type IntegrationTool = ResultOf<typeof IntegrationFragment>;

/**
 * GraphQL query to fetch integrations for a given application.
 */
const getIntegrations = graphql(
  `
query getIntegrations($id: ID!) {
  integrations(applicationId: $id) {
    items {
      ...Integration
    }
  }
}`,
  [IntegrationFragment],
);

/**
 * GraphQL query to fetch a specific integration by its ID.
 */
const getIntegration = graphql(
  `
query getIntegration($id: ID!) {
  integration(entityId: $id) {
    ...Integration
  }
}
`,
  [IntegrationFragment],
);

/**
 * Creates a function to list integration tools for a given application.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an application ID and returns a list of integration tools.
 * @throws Will throw an error if the application ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const integrationTools = await client.integrationTool.list('applicationId');
 */
export const integrationToolList = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((applicationId: Id) => Promise<IntegrationTool[]>) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      integrations: { items },
    } = await gqlClient.request(getIntegrations, { id });
    return items;
  };
};

/**
 * Creates a function to read a specific integration tool.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an integration tool ID and returns the tool details.
 * @throws Will throw an error if the integration tool ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const integrationTool = await client.integrationTool.read('integrationToolId');
 */
export const integrationToolRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((integrationId: Id) => Promise<IntegrationTool>) => {
  return async (integrationId: Id) => {
    const id = validate(IdSchema, integrationId);
    const { integration } = await gqlClient.request(getIntegration, { id });
    return integration;
  };
};
