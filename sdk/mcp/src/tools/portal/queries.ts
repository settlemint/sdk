import { fetchProcessedSchema } from "@/utils/schema-processor";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export const portalQueries = (server: McpServer, env: Partial<DotEnv>) => {
  // Check if portal GraphQL endpoint exists in environment variables
  const portalGraphqlEndpoint = env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  if (!portalGraphqlEndpoint) {
    throw new Error(
      "Portal GraphQL endpoint not found in environment variables. Please set SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT.",
    );
  }

  if (!accessToken) {
    throw new Error("Access token not found in environment variables. Please set SETTLEMINT_ACCESS_TOKEN.");
  }

  // Tool for GraphQL queries
  server.tool("portal-queries", async () => {
    try {
      const { queryNames } = await fetchProcessedSchema(portalGraphqlEndpoint, accessToken);

      return {
        content: [
          {
            type: "text",
            name: "GraphQL Queries",
            description: "List of available GraphQL queries in the portal",
            text: queryNames.join("\n"),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            name: "GraphQL Schema Error",
            description: "Error fetching the GraphQL schema",
            text: `Error fetching schema: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  });
};
