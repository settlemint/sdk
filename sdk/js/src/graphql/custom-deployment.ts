import { applicationRead } from "@/graphql/application.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";

/**
 * Fragment containing core custom deployment fields.
 */
const CustomDeploymentFragment = graphql(`
  fragment CustomDeployment on CustomDeployment {
    id
    uniqueName
    name
    status
    healthStatus
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
 * Type representing a custom deployment entity.
 */
export type CustomDeployment = ResultOf<typeof CustomDeploymentFragment>;

/**
 * Query to fetch custom deployments for an application.
 */
const getCustomDeployments = graphql(
  `
    query getCustomDeployments($applicationUniqueName: String!) {
      customDeploymentsByUniqueName(applicationUniqueName: $applicationUniqueName) {
        items {
          ...CustomDeployment
        }
      }
    }
  `,
  [CustomDeploymentFragment],
);

/**
 * Query to fetch a specific custom deployment.
 */
const getCustomDeployment = graphql(
  `
    query getCustomDeployment($uniqueName: String!) {
      customDeploymentByUniqueName(uniqueName: $uniqueName) {
        ...CustomDeployment
      }
    }
  `,
  [CustomDeploymentFragment],
);

/**
 * Mutation to edit a custom deployment.
 */
const editCustomDeployment = graphql(
  `
    mutation EditCustomDeployment($uniqueName: String!, $imageTag: String) {
      editCustomDeploymentByUniqueName(uniqueName: $uniqueName, imageTag: $imageTag) {
        ...CustomDeployment
      }
    }
  `,
  [CustomDeploymentFragment],
);

/**
 * Mutation to create a custom deployment.
 */
const createCustomDeployment = graphql(
  `
    mutation CreateCustomDeployment(
      $applicationId: ID!
      $name: String!
      $imageTag: String!
      $imageName: String!
      $imageRepository: String!
      $environmentVariables: JSON
      $port: Int!
      $provider: String!
      $region: String!
    ) {
      createCustomDeployment(
        applicationId: $applicationId
        name: $name
        imageTag: $imageTag
        imageName: $imageName
        imageRepository: $imageRepository
        port: $port
        environmentVariables: $environmentVariables
        provider: $provider
        region: $region
      ) {
        ...CustomDeployment
      }
    }
  `,
  [CustomDeploymentFragment],
);

/**
 * Arguments required to create a custom deployment.
 */
export type CreateCustomDeploymentArgs = Omit<VariablesOf<typeof createCustomDeployment>, "applicationId"> & {
  applicationUniqueName: string;
};

/**
 * Mutation to restart a custom deployment.
 */
const restartCustomDeployment = graphql(
  `
    mutation RestartCustomDeployment($uniqueName: String!) {
      restartCustomDeploymentByUniqueName(uniqueName: $uniqueName) {
        ...CustomDeployment
      }
    }
  `,
  [CustomDeploymentFragment],
);

/**
 * Creates a function to list custom deployments for an application.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches custom deployments for an application
 * @throws If the application cannot be found or the request fails
 */
export const customdeploymentList = (
  gqlClient: GraphQLClient,
): ((applicationUniqueName: string) => Promise<CustomDeployment[]>) => {
  return async (applicationUniqueName: string) => {
    const {
      customDeploymentsByUniqueName: { items },
    } = await gqlClient.request(getCustomDeployments, { applicationUniqueName });
    return items;
  };
};

/**
 * Creates a function to fetch a specific custom deployment.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that fetches a single custom deployment by unique name
 * @throws If the custom deployment cannot be found or the request fails
 */
export const customdeploymentRead = (
  gqlClient: GraphQLClient,
): ((customDeploymentUniqueName: string) => Promise<CustomDeployment>) => {
  return async (customDeploymentUniqueName: string) => {
    const { customDeploymentByUniqueName: customDeployment } = await gqlClient.request(getCustomDeployment, {
      uniqueName: customDeploymentUniqueName,
    });
    return customDeployment;
  };
};

/**
 * Creates a function to update a custom deployment.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that updates a custom deployment with a new image tag
 * @throws If the custom deployment cannot be found or the update fails
 */
export const customdeploymentUpdate = (
  gqlClient: GraphQLClient,
): ((customDeploymentUniqueName: string, imageTag: string) => Promise<CustomDeployment>) => {
  return async (customDeploymentUniqueName: string, imageTag: string) => {
    const { editCustomDeploymentByUniqueName: cd } = await gqlClient.request(editCustomDeployment, {
      uniqueName: customDeploymentUniqueName,
      imageTag,
    });
    return cd;
  };
};

/**
 * Creates a function to create a new custom deployment.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that creates a new custom deployment with the provided configuration
 * @throws If the creation fails or validation errors occur
 */
export const customdeploymentCreate = (
  gqlClient: GraphQLClient,
): ((args: CreateCustomDeploymentArgs) => Promise<CustomDeployment>) => {
  return async (args: CreateCustomDeploymentArgs) => {
    const { applicationUniqueName, ...otherArgs } = args;
    const application = await applicationRead(gqlClient)(applicationUniqueName);
    const { createCustomDeployment: customDeployment } = await gqlClient.request(createCustomDeployment, {
      ...otherArgs,
      applicationId: application.id,
    });
    return customDeployment;
  };
};

/**
 * Creates a function to restart a custom deployment.
 *
 * @param gqlClient - The GraphQL client instance
 * @returns Function that restarts a custom deployment by unique name
 * @throws If the custom deployment cannot be found or the restart fails
 */
export const customDeploymentRestart =
  (gqlClient: GraphQLClient) =>
  async (customDeploymentUniqueName: string): Promise<CustomDeployment> => {
    const { restartCustomDeploymentByUniqueName: customDeployment } = await gqlClient.request(restartCustomDeployment, {
      uniqueName: customDeploymentUniqueName,
    });
    return customDeployment;
  };
