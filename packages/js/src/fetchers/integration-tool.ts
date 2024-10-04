import { graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

const IntegrationFragment = graphql(`
  fragment Integration on Integration {
    id
    name
  }
`);

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

const getBlockchainNetwork = graphql(
  `
query getIntegration($id: ID!) {
  integration(entityId: $id) {
    ...Integration
  }
}
`,
  [IntegrationFragment],
);

export const integrationToolList = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId ?? options?.applicationId);
    const {
      integrations: { items },
    } = await gqlClient.request(getIntegrations, { id });
    return items;
  };
};

export const integrationToolRead = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (integrationId: Id) => {
    const id = validate(IdSchema, integrationId ?? options?.integrationId);
    const { integration } = await gqlClient.request(getBlockchainNetwork, { id });
    return integration;
  };
};
