import type { Insights, IntegrationTool, Middleware, SettlemintClient, Storage } from "@settlemint/sdk-js";
import { type DotEnv, retryWhenFailed } from "@settlemint/sdk-utils";

export async function getGraphEndpoint(
  settlemint: SettlemintClient,
  service: Middleware | undefined,
  graphName?: string,
): Promise<Partial<DotEnv>> {
  if (!service || service.__typename !== "HAGraphMiddleware") {
    return {};
  }

  const theGraphMiddleware = await retryWhenFailed(async () => {
    const middleware = await settlemint.middleware.graphSubgraphs(service.uniqueName, !!graphName);
    if (!middleware || middleware.__typename !== "HAGraphMiddleware") {
      throw new Error(`Middleware '${service.uniqueName}' is not a graph middleware`);
    }
    if (
      graphName &&
      !middleware.subgraphs.find(({ graphqlQueryEndpoint }) => graphqlQueryEndpoint?.id.endsWith(graphName))
    ) {
      throw new Error(`Subgraph '${graphName}' not found in middleware '${service.uniqueName}'`);
    }
    return middleware;
  });

  const isStarterKit = (id: string) => id?.toLowerCase().endsWith("-starterkits");
  const endpoints = theGraphMiddleware.subgraphs
    .filter((subgraph) => {
      // If there's only one subgraph, keep it regardless if it's a starterkit
      if (theGraphMiddleware.subgraphs.length === 1) {
        return true;
      }
      // Otherwise filter out starterkits
      return !isStarterKit(subgraph.graphqlQueryEndpoint?.id);
    })
    .map(({ graphqlQueryEndpoint }) => graphqlQueryEndpoint?.displayValue);

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
