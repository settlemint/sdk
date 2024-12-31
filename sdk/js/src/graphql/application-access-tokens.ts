import { applicationRead } from "@/graphql/application.js";
import type { ClientOptions } from "@/helpers/client-options.schema.js";
import { type VariablesOf, graphql } from "@/helpers/graphql.js";
import type { GraphQLClient } from "graphql-request";

const createApplicationAccessToken = graphql(
  `
    mutation CreateApplicationAccessToken(
      $applicationId: ID!,
      $blockchainNetworkScope: BlockchainNetworkScopeInputType!,
      $blockchainNodeScope: BlockchainNodeScopeInputType!,
      $customDeploymentScope: CustomDeploymentScopeInputType!,
      $insightsScope: InsightsScopeInputType!,
      $integrationScope: IntegrationScopeInputType!,
      $loadBalancerScope: LoadBalancerScopeInputType!,
      $middlewareScope: MiddlewareScopeInputType!,
      $name: String!,
      $privateKeyScope: PrivateKeyScopeInputType!,
      $smartContractSetScope: SmartContractSetScopeInputType!,
      $storageScope: StorageScopeInputType!,
      $validityPeriod: AccessTokenValidityPeriod!
    ) {
      createApplicationAccessToken(
        applicationId: $applicationId,
        blockchainNetworkScope: $blockchainNetworkScope,
        blockchainNodeScope: $blockchainNodeScope,
        customDeploymentScope: $customDeploymentScope,
        insightsScope: $insightsScope,
        integrationScope: $integrationScope,
        loadBalancerScope: $loadBalancerScope,
        middlewareScope: $middlewareScope,
        name: $name,
        privateKeyScope: $privateKeyScope,
        smartContractSetScope: $smartContractSetScope,
        storageScope: $storageScope,
        validityPeriod: $validityPeriod
      ) {
        token
      }
    }
  `,
  [],
);

export type CreateApplicationAccessTokenArgs = Omit<
  VariablesOf<typeof createApplicationAccessToken>,
  "applicationId"
> & { applicationUniqueName: string };

/**
 * Creates a new application.
 *
 * @param gqlClient - The GraphQL client instance used to execute the mutation.
 * @param options - Configuration options for the client.
 * @returns A function that accepts the arguments for creating an application and returns a promise resolving to the created application.
 */
export const applicationAccessTokenCreate = (gqlClient: GraphQLClient, options: ClientOptions) => {
  return async (args: CreateApplicationAccessTokenArgs): Promise<string> => {
    const { applicationUniqueName, ...otherArgs } = args;
    const application = await applicationRead(gqlClient, options)(applicationUniqueName);
    const { createApplicationAccessToken: applicationAccessToken } = await gqlClient.request(
      createApplicationAccessToken,
      {
        ...otherArgs,
        applicationId: application.id,
      },
    );
    if (!applicationAccessToken.token) {
      throw new Error("Failed to create application access token");
    }
    return applicationAccessToken.token;
  };
};
