import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading a specific integration tool by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformIntegrationToolRead } from "@settlemint/sdk-mcp/tools/platform/integrationTool/read";
 *
 * platformIntegrationToolRead(server, env);
 */
export const platformIntegrationToolRead = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-integration-tool-read",
    {
      integrationToolUniqueName: z.string().describe("Unique name of the integration tool to read"),
    },
    async (params) => {
      const integrationTool = await client.integrationTool.read(params.integrationToolUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Integration Tool Details",
            description: `Details for integration tool: ${params.integrationToolUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(integrationTool, null, 2),
          },
        ],
      };
    },
  );
};
