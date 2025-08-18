import type {
  BlockchainNode,
  CustomDeployment,
  Insights,
  IntegrationTool,
  LoadBalancer,
  Middleware,
  PrivateKey,
  SettlemintClient,
  Storage,
} from "@settlemint/sdk-js";
import { retryWhenFailed } from "@settlemint/sdk-utils/retry";
import { spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { DEFAULT_SUBGRAPH_NAME } from "@/constants/default-subgraph";
import { isAnyHasura } from "@/prompts/cluster-service/hasura.prompt";
import { isAnyHAGraphMiddleware } from "@/prompts/cluster-service/thegraph.prompt";
import { getSubgraphName } from "./subgraph/subgraph-name";

export async function getGraphEnv(
  settlemint: SettlemintClient,
  service: Middleware | undefined,
  graphName?: string,
): Promise<Partial<DotEnv>> {
  if (!service || !isAnyHAGraphMiddleware(service)) {
    return {};
  }

  const theGraphMiddleware = await spinner({
    startMessage: "Fetching TheGraph subgraph endpoints",
    stopMessage: "Fetched TheGraph subgraph endpoints",
    task: () =>
      retryWhenFailed(async () => {
        const middleware = await settlemint.middleware.graphSubgraphs(service.uniqueName, !!graphName);
        if (!middleware || !isAnyHAGraphMiddleware(middleware)) {
          throw new Error(`Middleware '${service.uniqueName}' is not a graph middleware`);
        }
        if (
          graphName &&
          !middleware.subgraphs.find(({ graphqlQueryEndpoint }) => graphqlQueryEndpoint?.id.endsWith(graphName))
        ) {
          throw new Error(`Subgraph '${graphName}' not found in middleware '${service.uniqueName}'`);
        }
        return middleware;
      }),
  });

  const endpoints = theGraphMiddleware.subgraphs.map(({ graphqlQueryEndpoint }) => graphqlQueryEndpoint?.displayValue);
  const hasKitSubgraph = endpoints
    .map((endpoint) => getSubgraphName(endpoint))
    .some((endpoint) => endpoint === DEFAULT_SUBGRAPH_NAME);

  return {
    SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: endpoints,
    SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: hasKitSubgraph ? DEFAULT_SUBGRAPH_NAME : undefined,
  };
}

export function getIpfsEnv(service: Storage | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "IPFSStorage") {
    return {};
  }

  return {
    SETTLEMINT_IPFS_API_ENDPOINT: service?.endpoints.find(
      (endpoint) => endpoint.id.endsWith("-api") && !endpoint.id.endsWith("-cluster-api"),
    )?.displayValue,
    SETTLEMINT_IPFS_PINNING_ENDPOINT: service?.endpoints.find((endpoint) =>
      endpoint.id.endsWith("-cluster-pinning-api"),
    )?.displayValue,
    SETTLEMINT_IPFS_GATEWAY_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.endsWith("-gateway"))
      ?.displayValue,
  };
}

export function getPortalEnv(service: Middleware | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "SmartContractPortalMiddleware") {
    return {};
  }

  return {
    SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: service.endpoints.find((endpoint) => endpoint.id.endsWith("-graphql"))
      ?.displayValue,
    SETTLEMINT_PORTAL_REST_ENDPOINT: service.endpoints.find((endpoint) => endpoint.id.endsWith("-rest"))?.displayValue,
    SETTLEMINT_PORTAL_WS_ENDPOINT: service.endpoints.find((endpoint) => endpoint.id.endsWith("-ws"))?.displayValue,
  };
}

export function getHasuraEnv(service: IntegrationTool | undefined): Partial<DotEnv> {
  if (!service || !isAnyHasura(service)) {
    return {};
  }

  return {
    SETTLEMINT_HASURA_ENDPOINT: service.endpoints.find((endpoint) => endpoint.id.endsWith("-graphql"))?.displayValue,
    SETTLEMINT_HASURA_ADMIN_SECRET: service.credentials.find((credential) => credential.id.endsWith("-admin-secret"))
      ?.displayValue,
    SETTLEMINT_HASURA_DATABASE_URL: service.endpoints.find((endpoint) => endpoint.id.endsWith("-postgresql"))
      ?.displayValue,
  };
}

export function getBlockscoutEnv(service: Insights | undefined): Partial<DotEnv> {
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

export function getMinioEnv(service: Storage | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "MinioStorage") {
    return {};
  }

  return {
    SETTLEMINT_MINIO_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.endsWith("-s3-api"))?.displayValue,
    SETTLEMINT_MINIO_ACCESS_KEY: service?.credentials.find((credential) => credential.id.endsWith("access-key"))
      ?.displayValue,
    SETTLEMINT_MINIO_SECRET_KEY: service?.credentials.find((credential) => credential.id.endsWith("secret-key"))
      ?.displayValue,
  };
}

export function getBlockchainNodeEnv(service: Pick<BlockchainNode, "endpoints"> | undefined | null): Partial<DotEnv> {
  if (!service) {
    return {};
  }

  return {
    SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT: service.endpoints.find((endpoint) =>
      endpoint.id.endsWith("-json-rpc"),
    )?.displayValue,
  };
}

export function getBlockchainNodeOrLoadBalancerEnv(
  service: Pick<BlockchainNode, "endpoints"> | Pick<LoadBalancer, "endpoints"> | undefined,
): Partial<DotEnv> {
  if (!service) {
    return {};
  }

  return {
    SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT: service.endpoints.find((endpoint) =>
      endpoint.id.endsWith("-json-rpc"),
    )?.displayValue,
  };
}

export function getCustomDeploymentEnv(service: CustomDeployment | undefined): Partial<DotEnv> {
  if (!service) {
    return {};
  }
  return {
    SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT: service?.endpoints.find((endpoint) => endpoint.id.endsWith("-internal"))
      ?.displayValue,
  };
}

export function getHdPrivateKeyEnv(service: PrivateKey | undefined): Partial<DotEnv> {
  if (!service || service.__typename !== "HdEcdsaP256PrivateKey") {
    return {};
  }
  return {
    SETTLEMINT_HD_PRIVATE_KEY_FORWARDER_ADDRESS: service?.trustedForwarderAddress ?? undefined,
  };
}
