import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import type { GraphQLField } from "graphql";
import { z } from "zod";
import { fetchProcessedSchema } from "@/utils/schema-processor";
import { generateFieldSDL } from "@/utils/sdl";

export const portalMutation = (server: McpServer, env: Partial<DotEnv>) => {
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

  // Tool for GraphQL mutations
  server.tool("portal-mutation", { mutationName: z.string() }, async ({ mutationName }) => {
    try {
      if (!mutationName) {
        return {
          content: [
            {
              type: "text",
              name: "Missing Mutation Name",
              description: "No mutation name provided",
              mimeType: "text/plain",
              text: "Please provide a mutation name to get its SDL definition.",
            },
          ],
        };
      }

      const { rawSchemaInfo } = await fetchProcessedSchema(portalGraphqlEndpoint, accessToken);
      const mutation = rawSchemaInfo.mutations[mutationName] as GraphQLField<unknown, unknown>;

      if (!mutation) {
        return {
          content: [
            {
              type: "text",
              name: "Mutation Not Found",
              description: `Mutation '${mutationName}' not found in the schema`,
              mimeType: "text/plain",
              text: `Mutation '${mutationName}' does not exist in the schema. Available mutations:\n${Object.keys(rawSchemaInfo.mutations).join("\n")}`,
            },
          ],
        };
      }

      // Convert Map to Record for type compatibility
      const typesRecord = Object.fromEntries(rawSchemaInfo.types);
      const fullSDL = generateFieldSDL(mutation, mutationName, typesRecord);

      return {
        content: [
          {
            type: "text",
            name: "Mutation SDL",
            description: `SDL for mutation '${mutationName}' and its types`,
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
