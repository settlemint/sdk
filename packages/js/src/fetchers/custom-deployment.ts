import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * Fragment for the CustomDeployment type.
 */
const CustomDeploymentFragment = graphql(`
  fragment CustomDeployment on CustomDeployment {
    id
    name
    status
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
 * Represents a custom deployment with its details.
 */
export type CustomDeployment = ResultOf<typeof CustomDeploymentFragment>;

/**
 * GraphQL query to fetch custom deployments for a given application.
 */
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

/**
 * GraphQL query to fetch a specific custom deployment by its ID.
 */
const getCustomDeployment = graphql(
  `
query getCustomDeployment($id: ID!) {
  customDeployment(entityId: $id) {
    ...CustomDeployment
  }
}
`,
  [CustomDeploymentFragment],
);

const editCustomDeployment = graphql(
  `
mutation EditCustomDeployment($entityId: ID!, $imageTag: String) {
  editCustomDeployment(entityId: $entityId, imageTag: $imageTag) {
    ...CustomDeployment
  }
}
`,
  [CustomDeploymentFragment],
);

/**
 * Creates a function to list custom deployments for a given application.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes an application ID and returns a list of custom deployments.
 * @throws Will throw an error if the application ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const deployments = await client.customDeployment.list('applicationId');
 */
export const customdeploymentList = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((applicationId: Id) => Promise<CustomDeployment[]>) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId);
    const {
      customDeployments: { items },
    } = await gqlClient.request(getCustomDeployments, { id });
    return items;
  };
};

/**
 * Creates a function to read a specific custom deployment.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes a custom deployment ID and returns the deployment details.
 * @throws Will throw an error if the custom deployment ID is invalid.
 *
 * @example
 * const client = createSettleMintClient({ ... });
 * const deployment = await client.customDeployment.read('deploymentId');
 */
export const customdeploymentRead = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((customdeploymentId: Id) => Promise<CustomDeployment>) => {
  return async (customdeploymentId: Id) => {
    const id = validate(IdSchema, customdeploymentId);
    const { customDeployment } = await gqlClient.request(getCustomDeployment, { id });
    return customDeployment;
  };
};

export const customdeploymentUpdate = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((customdeploymentId: Id, imageTag: string) => Promise<CustomDeployment>) => {
  return async (customdeploymentId: Id, imageTag: string) => {
    const id = validate(IdSchema, customdeploymentId);
    const { editCustomDeployment: cd } = await gqlClient.request(editCustomDeployment, { entityId: id, imageTag });
    return cd;
  };
};
