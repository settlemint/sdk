import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for listing integration tools in an application
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformIntegrationToolList } from "@settlemint/sdk-mcp/tools/platform/integrationTool/list";
 *
 * platformIntegrationToolList(server, env);
 */
export const platformIntegrationToolList = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-integration-tool-list",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to list integration tools from"),
    },
    async (params) => {
      const integrationTools = await client.integrationTool.list(params.applicationUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Integration Tool List",
            description: `List of integration tools in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(integrationTools, null, 2),
          },
        ],
      };
    },
  );
};
