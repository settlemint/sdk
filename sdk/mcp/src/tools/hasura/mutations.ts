import { fetchProcessedSchema } from "@/utils/schema-processor";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export const hasuraMutations = (server: McpServer, env: Partial<DotEnv>) => {
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

  // Tool for GraphQL mutations
  server.tool("hasura-mutations", async () => {
    try {
      const { mutationNames } = await fetchProcessedSchema(hasuraEndpoint, accessToken, hasuraAdminSecret);

      return {
        content: [
          {
            type: "text",
            name: "GraphQL Mutations",
            description: "List of available GraphQL mutations in the hasura",
            text: mutationNames.join("\n"),
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
