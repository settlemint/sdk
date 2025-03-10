import { fetchProcessedSchema } from "@/utils/schema-processor";
import { generateFieldSDL } from "@/utils/sdl";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import type { GraphQLField } from "graphql";
import { z } from "zod";

export const thegraphQuery = (server: McpServer, env: Partial<DotEnv>) => {
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
  server.tool("thegraph-query", { queryName: z.string() }, async ({ queryName }) => {
    try {
      if (!queryName) {
        return {
          content: [
            {
              type: "text",
              name: "Missing Query Name",
              description: "No query name provided",
              mimeType: "text/plain",
              text: "Please provide a query name to get its SDL definition.",
            },
          ],
        };
      }

      const { rawSchemaInfo } = await fetchProcessedSchema(thegraphGraphqlEndpoint, accessToken);
      const query = rawSchemaInfo.queries[queryName] as GraphQLField<unknown, unknown>;

      if (!query) {
        return {
          content: [
            {
              type: "text",
              name: "Query Not Found",
              description: `Query '${queryName}' not found in the schema`,
              mimeType: "text/plain",
              text: `Query '${queryName}' does not exist in the schema. Available queries:\n${Object.keys(rawSchemaInfo.queries).join("\n")}`,
            },
          ],
        };
      }

      // Convert Map to Record for type compatibility
      const typesRecord = Object.fromEntries(rawSchemaInfo.types);
      const fullSDL = generateFieldSDL(query, queryName, typesRecord);

      return {
        content: [
          {
            type: "text",
            name: "Query SDL",
            description: `SDL for query '${queryName}' and its types`,
            mimeType: "text/plain",
            text: fullSDL,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            name: "GraphQL Schema Error",
            description: "Error fetching or processing the GraphQL schema",
            mimeType: "text/plain",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  });
};
