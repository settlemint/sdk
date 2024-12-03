import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * GraphQL fragment for the Insights type.
 */
const InsightsFragment = graphql(`
  fragment Insights on Insights {
    __typename
    id
    name
    status
    insightsCategory
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
 * Represents insights with their details.
 */
export type Insights = ResultOf<typeof InsightsFragment>;

/**
 * GraphQL query to fetch insights for a given application.
 */
const getInsights = graphql(
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

/**
 * GraphQL query to fetch a specific insight by its ID.
 */
const getInsight = graphql(
  `
query getInsights($id: ID!) {
  insights(entityId: $id) {
    ...Insights
  }
}
`,
  [InsightsFragment],
);

/**
 * GraphQL mutation to create insights.
 */
const createInsights = graphql(
  `
  mutation createInsights(
    $applicationId: ID!
    $name: String!
    $insightsCategory: InsightsCategory!
    $provider: String!
    $region: String!
    $size: ClusterServiceSize
    $type: ClusterServiceType
    $blockchainNode: ID
    $loadBalancer: ID
  ) {
    createInsights(
      applicationId: $applicationId
      name: $name
      insightsCategory: $insightsCategory
      provider: $provider
      region: $region
      size: $size
      type: $type
      blockchainNode: $blockchainNode
      loadBalancer: $loadBalancer
    ) {
      ...Insights
    }
  }
`,
  [InsightsFragment],
);

/**
 * Arguments for creating insights.
 */
export type CreateInsightsArgs = VariablesOf<typeof createInsights>;

/**
 * Creates a function to list insights for a given application.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an application ID and returns a list of insights.
 * @throws Will throw an error if the application ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const insights = await client.insights.list('applicationId');
 */
export const insightsList = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((applicationId: Id) => Promise<Insights[]>) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      insightsList: { items },
    } = await gqlClient.request(getInsights, { id });
    return items;
  };
};

/**
 * Creates a function to read a specific insight.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an insight ID and returns the insight details.
 * @throws Will throw an error if the insight ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const insight = await client.insights.read('insightId');
 */
export const insightsRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((insightsId: Id) => Promise<Insights>) => {
  return async (insightsId: Id) => {
    const id = validate(IdSchema, insightsId);
    const { insights } = await gqlClient.request(getInsight, { id });
    return insights;
  };
};

/**
 * Creates a function to create new insights.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes insights creation arguments and returns the created insights.
 * @throws Will throw an error if the arguments are invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const insights = await client.insights.create({
 *   applicationId: 'appId',
 *   name: 'My Insights',
 *   provider: 'aws',
 *   region: 'us-east-1',
 *   insightsCategory: 'GRAFANA'
 * });
 */
export const insightsCreate = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((args: CreateInsightsArgs) => Promise<Insights>) => {
  return async (args: CreateInsightsArgs) => {
    validate(IdSchema, args.applicationId);
    const { createInsights: insights } = await gqlClient.request(createInsights, args);
    return insights;
  };
};
