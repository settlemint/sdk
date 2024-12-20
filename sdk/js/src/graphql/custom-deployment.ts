import { applicationRead } from "@/graphql/application.js";
import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type ResultOf, type VariablesOf, graphql } from "@/helpers/graphql.js";
import { type Id, IdSchema, validate } from "@settlemint/sdk-utils/validation";
import type { GraphQLClient } from "graphql-request";

/**
 * Fragment for the CustomDeployment type.
 */
const CustomDeploymentFragment = graphql(`
  fragment CustomDeployment on CustomDeployment {
    id
    uniqueName
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

const createCustomDeployment = graphql(
  `
mutation CreateCustomDeployment(
  $applicationId: ID!,
  $name: String!,
  $imageTag: String!,
  $imageName: String!,
  $imageRepository: String!,
  $environmentVariables: JSON,
  $port: Int!,
  $provider: String!,
  $region: String!
) {
  createCustomDeployment(
    applicationId: $applicationId,
    name: $name,
    imageTag: $imageTag,
    imageName: $imageName,
    imageRepository: $imageRepository,
    port: $port,
    environmentVariables: $environmentVariables,
    provider: $provider,
    region: $region
  ) {
    ...CustomDeployment
  }
}
`,
  [CustomDeploymentFragment],
);

export type CreateCustomDeploymentArgs = Omit<VariablesOf<typeof createCustomDeployment>, "applicationId"> & {
  applicationUniqueName: string;
};

const restartCustomDeployment = graphql(
  `
  mutation RestartCustomDeployment($id: ID!) {
    restartCustomDeployment(entityId: $id) {
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

/**
 * Creates a function to create a new custom deployment.
 *
 * @param gqlClient - The GraphQL client to use for the request.
 * @param options - The SettleMint client options.
 * @returns A function that takes custom deployment creation arguments and returns a promise resolving to the created custom deployment.
 */
export const customdeploymentCreate = (
  gqlClient: GraphQLClient,
  options: ClientOptions,
): ((args: CreateCustomDeploymentArgs) => Promise<CustomDeployment>) => {
  return async (args: CreateCustomDeploymentArgs) => {
    const { applicationUniqueName, ...otherArgs } = args;
    const application = await applicationRead(gqlClient, options)(applicationUniqueName);
    const { createCustomDeployment: customDeployment } = await gqlClient.request(createCustomDeployment, {
      ...otherArgs,
      applicationId: application.id,
    });
    return customDeployment;
  };
};

export const customDeploymentRestart =
  (gqlClient: GraphQLClient, _options: ClientOptions) =>
  async (deploymentId: Id): Promise<CustomDeployment> => {
    const id = validate(IdSchema, deploymentId);
    const { restartCustomDeployment: customDeployment } = await gqlClient.request(restartCustomDeployment, { id });
    return customDeployment;
  };
