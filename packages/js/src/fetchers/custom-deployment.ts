import { graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

const CustomDeploymentFragment = graphql(`
  fragment CustomDeployment on CustomDeployment {
    id
    name
  }
`);

const getCustomDeployments = graphql(
  `
query getCustomDeployments($id: ID!) {
  customDeployments(applicationId: $id) {
    items {
      ...CustomDeployment
    }
  }
}`,
  [CustomDeploymentFragment],
);

const getBlockchainNetwork = graphql(
  `
query getCustomDeployment($id: ID!) {
  customDeployment(entityId: $id) {
    ...CustomDeployment
  }
}
`,
  [CustomDeploymentFragment],
);

export const customdeploymentList = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      customDeployments: { items },
    } = await gqlClient.request(getCustomDeployments, { id });
    return items;
  };
};

export const customdeploymentRead = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (customdeploymentId: Id) => {
    const id = validate(IdSchema, customdeploymentId);
    const { customDeployment } = await gqlClient.request(getBlockchainNetwork, { id });
    return customDeployment;
  };
};
