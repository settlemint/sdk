import { fetchProcessedSchema } from "@/utils/schema-processor";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const hasuraQueries = (server: McpServer, env: Partial<DotEnv>) => {
  const hasuraEndpoint = env.SETTLEMINT_HASURA_ENDPOINT;
  const hasuraAdminSecret = env.SETTLEMINT_HASURA_ADMIN_SECRET;
  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  if (!hasuraEndpoint) {
    throw new Error(
      "Hasura GraphQL endpoint not found in environment variables. Please set SETTLEMINT_HASURA_ENDPOINT.",
    );
  }

  if (!hasuraAdminSecret) {
    throw new Error(
      "Hasura Admin secret not found in environment variables. Please set SETTLEMINT_HASURA_ADMIN_SECRET.",
    );
  }

  if (!accessToken) {
    throw new Error("Access token not found in environment variables. Please set SETTLEMINT_ACCESS_TOKEN.");
  }

  const schema = z.object({});

  // Tool for GraphQL queries
  server.tool(
    "hasura-queries",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      schema.parse(params);
    try {
      const { queryNames } = await fetchProcessedSchema(hasuraEndpoint, accessToken, hasuraAdminSecret);

      return {
        content: [
          {
            type: "text",
            name: "GraphQL Queries",
            description: "List of available GraphQL queries in the hasura",
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
    },
  );
};
