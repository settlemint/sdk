import { testGqlEndpoint } from "@/commands/codegen/test-gql-endpoint";
import type { Insights, IntegrationTool, Middleware, SettlemintClient, Storage } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils";

export async function getGraphEndpoint(
  settlemint: SettlemintClient,
  service: Middleware | undefined,
  env: Partial<DotEnv>,
  graphName?: string,
): Promise<Partial<DotEnv>> {
  if (!service || service.__typename !== "HAGraphMiddleware") {
    return { SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: undefined };
  }

  const middleware = await settlemint.middleware.graphSubgraphs(service.uniqueName);
  if (!middleware || middleware.__typename !== "HAGraphMiddleware") {
    return {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: undefined,
    };
  }

  const isStarterKit = (id: string) => id.endsWith("-starterkits");

  const testEndpoint = middleware.subgraphs.find(({ graphqlQueryEndpoint }) =>
    graphName ? graphqlQueryEndpoint?.id.endsWith(graphName) : !isStarterKit(graphqlQueryEndpoint?.id),
  )?.graphqlQueryEndpoint?.displayValue;
  const starterKitEndpoint = middleware.subgraphs.find(({ graphqlQueryEndpoint }) =>
    isStarterKit(graphqlQueryEndpoint?.id),
  )?.graphqlQueryEndpoint?.displayValue;

  const hasEndpoint =
    testEndpoint && env.SETTLEMINT_ACCESS_TOKEN
      ? await testGqlEndpoint({ accessToken: env.SETTLEMINT_ACCESS_TOKEN, gqlEndpoint: testEndpoint })
      : false;

  const endpoints = hasEndpoint
    ? middleware.subgraphs.map(({ graphqlQueryEndpoint }) => graphqlQueryEndpoint?.displayValue)
    : starterKitEndpoint
      ? [starterKitEndpoint]
      : [];

  if (endpoints.length === 0) {
    return {};
  }

  return {
    SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: endpoints,
  };
}

export function getIpfsEndpoints(service: Storage | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "IPFSStorage") {
    return {};
  }

  return {
    SETTLEMINT_IPFS_API_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.includes("api"))?.displayValue,
    SETTLEMINT_IPFS_PINNING_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.includes("cluster-pinning-api"))
      ?.displayValue,
    SETTLEMINT_IPFS_GATEWAY_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.includes("gateway"))
      ?.displayValue,
  };
}

export function getPortalEndpoints(service: Middleware | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "SmartContractPortalMiddleware") {
    return {};
  }

  return {
    SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: service.endpoints.find((endpoint) => endpoint.id.includes("graphql"))
      ?.displayValue,
    SETTLEMINT_PORTAL_REST_ENDPOINT: service.endpoints.find((endpoint) => endpoint.id.includes("rest"))?.displayValue,
  };
}

export function getHasuraEndpoints(service: IntegrationTool | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "Hasura") {
    return {};
  }

  return {
    SETTLEMINT_HASURA_ENDPOINT: service.endpoints.find((endpoint) => endpoint.id.includes("graphql"))?.displayValue,
    SETTLEMINT_HASURA_ADMIN_SECRET: service.credentials.find((credential) => credential.id.includes("admin-secret"))
      ?.displayValue,
    SETTLEMINT_HASURA_DATABASE_URL: service.endpoints.find((endpoint) => endpoint.id.includes("postgresql"))
      ?.displayValue,
  };
}

export function getBlockscoutEndpoints(service: Insights | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "BlockchainExplorer") {
    return {};
  }

  const uiEndpoint = service.endpoints.find((endpoint) => endpoint.id.includes("interface"))?.displayValue;

  return {
    SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT: uiEndpoint
      ? `${new URL("/api/v1/graphql", uiEndpoint).toString()}`
      : undefined,
    SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT: uiEndpoint,
  };
}

export function getMinioEndpoints(service: Storage | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "MinioStorage") {
    return {};
  }

  return {
    SETTLEMINT_MINIO_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.includes("s3-api"))?.displayValue,
    SETTLEMINT_MINIO_ACCESS_KEY: service?.credentials.find((credential) => credential.id.includes("access-key"))
      ?.displayValue,
    SETTLEMINT_MINIO_SECRET_KEY: service?.credentials.find((credential) => credential.id.includes("secret-key"))
      ?.displayValue,
  };
}
