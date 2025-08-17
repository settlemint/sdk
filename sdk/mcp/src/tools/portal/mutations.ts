import { fetchProcessedSchema } from "@/utils/schema-processor";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const portalMutations = (server: McpServer, env: Partial<DotEnv>) => {
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

  const schema = z.object({});

  // Tool for GraphQL mutations
  server.tool("portal-mutations", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    schema.parse(params);
    try {
      const { mutationNames } = await fetchProcessedSchema(portalGraphqlEndpoint, accessToken);

      return {
        content: [
          {
            type: "text",
            name: "GraphQL Mutations",
            description: "List of available GraphQL mutations in the portal",
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
