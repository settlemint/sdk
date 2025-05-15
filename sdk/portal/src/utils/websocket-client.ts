import { createClient } from "graphql-ws";

/**
 * Options for the GraphQL WebSocket client
 *
 * @typedef {Object} WebsocketClientOptions
 * @property {string} portalGraphqlEndpoint - The GraphQL endpoint URL for the Portal API
 * @property {string} accessToken - The access token for authentication with the Portal API
 */
export interface WebsocketClientOptions {
  portalGraphqlEndpoint: string;
  accessToken: string;
}

/**
 * Creates a GraphQL WebSocket client for the Portal API
 *
 * @param {WebsocketClientOptions} options - The options for the client
 * @param {string} options.portalGraphqlEndpoint - The GraphQL endpoint URL for the Portal API
 * @param {string} options.accessToken - The access token for authentication with the Portal API
 * @returns {Client} The GraphQL WebSocket client
 */
export function getWebsocketClient({ portalGraphqlEndpoint, accessToken }: WebsocketClientOptions) {
  if (!portalGraphqlEndpoint) {
    throw new Error("portalGraphqlEndpoint is required");
  }
  if (!accessToken) {
    throw new Error("accessToken is required");
  }
  const graphqlEndpoint = new URL(portalGraphqlEndpoint);
  graphqlEndpoint.protocol = graphqlEndpoint.protocol === "http:" ? "ws:" : "wss:";
  return createClient({
    url: `${graphqlEndpoint.protocol}//${graphqlEndpoint.host}/${accessToken}${graphqlEndpoint.pathname}${graphqlEndpoint.search}`,
  });
}
