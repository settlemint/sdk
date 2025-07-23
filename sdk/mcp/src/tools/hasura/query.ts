import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import type { GraphQLField } from "graphql";
import { z } from "zod";
import { fetchProcessedSchema } from "@/utils/schema-processor";
import { generateFieldSDL } from "@/utils/sdl";

export const hasuraQuery = (server: McpServer, env: Partial<DotEnv>) => {
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

  // Tool for GraphQL queries
  server.tool("hasura-query", { queryName: z.string() }, async ({ queryName }) => {
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

      const { rawSchemaInfo } = await fetchProcessedSchema(hasuraEndpoint, accessToken, hasuraAdminSecret);
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
