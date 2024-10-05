import { graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

const InsightsFragment = graphql(`
  fragment Insights on Insights {
    id
    name
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

const getInsightss = graphql(
  `
query getInsights($id: ID!) {
  insightsList(applicationId: $id) {
    items {
      ...Insights
    }
  }
}`,
  [InsightsFragment],
);

const getBlockchainNetwork = graphql(
  `
query getInsights($id: ID!) {
  insights(entityId: $id) {
    ...Insights
  }
}
`,
  [InsightsFragment],
);

export const insightsList = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      insightsList: { items },
    } = await gqlClient.request(getInsightss, { id });
    return items;
  };
};

export const insightsRead = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (insightsId: Id) => {
    const id = validate(IdSchema, insightsId);
    const { insights } = await gqlClient.request(getBlockchainNetwork, { id });
    return insights;
  };
};
