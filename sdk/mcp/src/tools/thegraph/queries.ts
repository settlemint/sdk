import { fetchProcessedSchema } from "@/utils/schema-processor";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export const thegraphQueries = (server: McpServer, env: Partial<DotEnv>) => {
  // Get the default subgraph name and endpoints array
  const defaultSubgraph = env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH;
  const subgraphEndpoints = env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS ?? [];

  // Get the endpoint for the default subgraph
  const thegraphGraphqlEndpoint =
    defaultSubgraph && Array.isArray(subgraphEndpoints)
      ? subgraphEndpoints.find((endpoint: string) => endpoint.includes(`/name/${defaultSubgraph}`))
      : subgraphEndpoints[0];

  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  if (!thegraphGraphqlEndpoint) {
    throw new Error(
      "The Graph GraphQL endpoint not found in environment variables. Please set SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS.",
    );
  }

  if (!accessToken) {
    throw new Error("Access token not found in environment variables. Please set SETTLEMINT_ACCESS_TOKEN.");
  }

  // Tool for GraphQL queries
  server.tool("thegraph-queries", async () => {
    try {
      const { queryNames } = await fetchProcessedSchema(thegraphGraphqlEndpoint, accessToken);

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
