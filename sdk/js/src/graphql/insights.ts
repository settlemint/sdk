import type { GraphQLClient } from "graphql-request";
import { applicationRead } from "@/graphql/application.js";
import { blockchainNodeRead } from "@/graphql/blockchain-node.js";
import { loadBalancerRead } from "@/graphql/load-balancer.js";
import { graphql, type ResultOf, type VariablesOf } from "@/helpers/graphql.js";

/**
 * GraphQL fragment containing core insights fields.
 */
const InsightsFragment = graphql(`
  fragment Insights on Insights {
    __typename
    id
    uniqueName
    name
    status
    healthStatus
    provider
    region
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
 * Type representing an insights entity.
 */
export type Insights = ResultOf<typeof InsightsFragment>;

/**
 * Query to fetch insights for an application.
 */
const getInsights = graphql(
  `
    query GetInsights($applicationUniqueName: String!) {
      insightsListByUniqueName(applicationUniqueName: $applicationUniqueName) {
        items {
          ...Insights
        }
      }
    }
  `,
  [InsightsFragment],
);

/**
 * Query to fetch a specific insight.
 */
const getInsight = graphql(
  `
    query GetInsight($uniqueName: String!) {
      insightsByUniqueName(uniqueName: $uniqueName) {
        ...Insights
      }
    }
  `,
  [InsightsFragment],
);

/**
 * Mutation to create insights.
 */
const createInsights = graphql(
  `
    mutation CreateInsights(
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
 * Arguments required to create insights.
 */
export type CreateInsightsArgs = Omit<
  VariablesOf<typeof createInsights>,
  "applicationId" | "blockchainNode" | "loadBalancer"
> & {
  applicationUniqueName: string;
  blockchainNodeUniqueName?: string;
  loadBalancerUniqueName?: string;
};

/**
 * Mutation to restart insights.
 */
const restartInsights = graphql(
  `
    mutation RestartInsights($uniqueName: String!) {
      restartInsightsByUniqueName(uniqueName: $uniqueName) {
        ...Insights
      }
    }
  `,
  [InsightsFragment],
);

/**
 * Mutation to pause insights.
 */
const pauseInsights = graphql(
  `
    mutation PauseInsights($uniqueName: String!) {
      pauseInsightsByUniqueName(uniqueName: $uniqueName) {
        ...Insights
      }
    }
  `,
  [InsightsFragment],
);

/**
 * Mutation to resume insights.
 */
const resumeInsights = graphql(
  `
    mutation ResumeInsights($uniqueName: String!) {
      resumeInsightsByUniqueName(uniqueName: $uniqueName) {
        ...Insights
      }
    }
  `,
  [InsightsFragment],
);

/**
 * Creates a function to list insights for an application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches insights for an application
 * @throws If the application cannot be found or the request fails
 */
export const insightsList = (gqlClient: GraphQLClient): ((applicationUniqueName: string) => Promise<Insights[]>) => {
  return async (applicationUniqueName: string) => {
    const {
      insightsListByUniqueName: { items },
    } = await gqlClient.request(getInsights, { applicationUniqueName });
    return items;
  };
};

/**
 * Creates a function to fetch a specific insight.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single insight by unique name
 * @throws If the insight cannot be found or the request fails
 */
export const insightsRead = (gqlClient: GraphQLClient): ((insightsUniqueName: string) => Promise<Insights>) => {
  return async (insightsUniqueName: string) => {
    const { insightsByUniqueName: insights } = await gqlClient.request(getInsight, { uniqueName: insightsUniqueName });
    return insights;
  };
};

/**
 * Creates a function to create new insights.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates new insights with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const insightsCreate = (gqlClient: GraphQLClient): ((args: CreateInsightsArgs) => Promise<Insights>) => {
  return async (args: CreateInsightsArgs) => {
    const { applicationUniqueName, blockchainNodeUniqueName, loadBalancerUniqueName, ...otherArgs } = args;
    const [application, blockchainNode, loadBalancer] = await Promise.all([
      applicationRead(gqlClient)(applicationUniqueName),
      blockchainNodeUniqueName ? blockchainNodeRead(gqlClient)(blockchainNodeUniqueName) : Promise.resolve(undefined),
      loadBalancerUniqueName ? loadBalancerRead(gqlClient)(loadBalancerUniqueName) : Promise.resolve(undefined),
    ]);
    const { createInsights: insights } = await gqlClient.request(createInsights, {
      ...otherArgs,
      applicationId: application.id,
      blockchainNode: blockchainNode?.id,
      loadBalancer: loadBalancer?.id,
    });
    return insights;
  };
};

/**
 * Creates a function to restart insights.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that restarts insights by unique name
 * @throws If the insights cannot be found or the restart fails
 */
export const insightsRestart =
  (gqlClient: GraphQLClient) =>
  async (insightsUniqueName: string): Promise<Insights> => {
    const { restartInsightsByUniqueName: insights } = await gqlClient.request(restartInsights, {
      uniqueName: insightsUniqueName,
    });
    return insights;
  };

/**
 * Creates a function to pause insights.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that pauses insights by unique name
 * @throws If the insights cannot be found or the pause fails
 */
export const insightsPause =
  (gqlClient: GraphQLClient) =>
  async (insightsUniqueName: string): Promise<Insights> => {
    const { pauseInsightsByUniqueName: insights } = await gqlClient.request(pauseInsights, {
      uniqueName: insightsUniqueName,
    });
    return insights;
  };

/**
 * Creates a function to resume insights.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that resumes insights by unique name
 * @throws If the insights cannot be found or the resume fails
 */
export const insightsResume =
  (gqlClient: GraphQLClient) =>
  async (insightsUniqueName: string): Promise<Insights> => {
    const { resumeInsightsByUniqueName: insights } = await gqlClient.request(resumeInsights, {
      uniqueName: insightsUniqueName,
    });
    return insights;
  };
