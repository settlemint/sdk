import { createClient } from "graphql-ws";

/**
 * Options for the GraphQL WebSocket client
 */
export interface WebsocketClientOptions {
  /**
   * The GraphQL endpoint URL for the Portal API
   */
  portalGraphqlEndpoint: string;
  /**
   * The access token for authentication with the Portal API
   */
  accessToken?: string;
}

/**
 * Creates a GraphQL WebSocket client for the Portal API
 *
 * @param {WebsocketClientOptions} options - The options for the client
 * @returns {Client} The GraphQL WebSocket client
 * @example
 * import { getWebsocketClient } from "@settlemint/sdk-portal";
 *
 * const client = getWebsocketClient({
 *   portalGraphqlEndpoint: "https://portal.settlemint.com/graphql",
 *   accessToken: "your-access-token",
 * });
 */
export function getWebsocketClient({ portalGraphqlEndpoint, accessToken }: WebsocketClientOptions) {
  if (!portalGraphqlEndpoint) {
    throw new Error("portalGraphqlEndpoint is required");
  }
  const graphqlEndpoint = setWsProtocol(new URL(portalGraphqlEndpoint));
  return createClient({
    url: `${graphqlEndpoint.protocol}//${graphqlEndpoint.host}/${accessToken}${graphqlEndpoint.pathname}${graphqlEndpoint.search}`,
  });
}

function setWsProtocol(url: URL) {
  if (url.protocol === "ws:" || url.protocol === "wss:") {
    return url;
  }
  if (url.protocol === "http:") {
    url.protocol = "ws:";
  } else {
    url.protocol = "wss:";
  }
  return url;
}
