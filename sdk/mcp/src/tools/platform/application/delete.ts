import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for deleting an application by its ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformApplicationDelete } from "@settlemint/sdk-mcp/tools/platform/application/delete";
 *
 * platformApplicationDelete(server, env);
 */
export const platformApplicationDelete = (server: McpServer, env: Partial<DotEnv>) => {
  const instance = env.SETTLEMINT_INSTANCE;
  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  if (!accessToken) {
    throw new Error("SETTLEMINT_ACCESS_TOKEN is not set");
  }

  const client = createSettleMintClient({
    accessToken: accessToken,
    instance: instance,
  });

  server.tool(
    "platform-application-delete",
    {
      applicationId: z.string().describe("ID of the application to delete"),
    },
    async (params) => {
      const application = await client.application.delete(params.applicationId);
      return {
        content: [
          {
            type: "text",
            name: "Application Deleted",
            description: `Deleted application with ID: ${params.applicationId}`,
            mimeType: "application/json",
            text: JSON.stringify(application, null, 2),
          },
        ],
      };
    },
  );
};
