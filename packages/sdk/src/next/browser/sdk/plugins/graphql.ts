import { config } from "@/cli/lib/config/config";
import { isClientSide } from "@/common/is-clientside";
import { activeServerConfig } from "@/next/node/config/config";
import { GraphQLClient } from "graphql-request";

interface GraphQLClientConfig {
  url: string;
  headers: Record<string, string>;
}

type GraphQLClientType = "portal" | "thegraph" | "hasura";

/**
 * Creates a GraphQL client for interacting with various endpoints.
 *
 * @param type The type of GraphQL endpoint: "portal", "thegraph", or "hasura".
 * @returns A GraphQLClient instance for making API requests.
 * @throws Error if required environment variables are missing or if the client type is invalid.
 */
export function createGraphqlClient(type: GraphQLClientType): GraphQLClient {
  if (isClientSide()) {
    return createClientSideGraphqlClient(type);
  }

  const cfg = config();
  if (!cfg) {
    throw new Error("Server configuration not available");
  }

  const activeConfig = activeServerConfig(cfg);
  const clientConfig = createClientConfig(type, activeConfig);

  return new GraphQLClient(clientConfig.url, { headers: clientConfig.headers });
}

function createClientConfig(
  type: GraphQLClientType,
  activeConfig: ReturnType<typeof activeServerConfig>,
): GraphQLClientConfig {
  const clientConfig: GraphQLClientConfig = {
    url: "",
    headers: {},
  };

  switch (type) {
    case "portal":
      if (!activeConfig.portalRest) {
        throw new Error("Portal REST URL is not configured in the active server config");
      }
      clientConfig.url = `${activeConfig.portalRest}/graphql`;
      clientConfig.headers["x-auth-token"] = process.env.SETTLEMINT_PAT_TOKEN ?? "";
      break;
    case "thegraph":
      if (!activeConfig.thegraphGql) {
        throw new Error("TheGraph URL is not configured in the active server config");
      }
      clientConfig.headers["x-auth-token"] = process.env.SETTLEMINT_PAT_TOKEN ?? "";
      clientConfig.url = activeConfig.thegraphGql;
      break;
    case "hasura":
      if (!activeConfig.hasuraGql) {
        throw new Error("Hasura GraphQL URL is not configured in the active server config");
      }
      clientConfig.url = activeConfig.hasuraGql;
      clientConfig.headers["x-auth-token"] = process.env.SETTLEMINT_PAT_TOKEN ?? "";
      clientConfig.headers["x-hasura-admin-secret"] = process.env.SETTLEMINT_HASURA_GQL_ADMIN_SECRET ?? "";
      break;
    default:
      throw new Error(`Invalid GraphQL client type: ${type}`);
  }

  if (!clientConfig.url) {
    throw new Error(`URL not set for GraphQL client type: ${type}`);
  }

  return clientConfig;
}

function createClientSideGraphqlClient(type: GraphQLClientType): GraphQLClient {
  const fallbackUrl = process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL;
  if (!fallbackUrl) {
    throw new Error("NEXT_PUBLIC_SETTLEMINT_APP_URL is not defined");
  }
  return new GraphQLClient(`${fallbackUrl}/proxy/${type}/graphql`);
}
