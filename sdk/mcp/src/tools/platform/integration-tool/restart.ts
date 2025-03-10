import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for restarting an integration tool by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformIntegrationToolRestart } from "@settlemint/sdk-mcp/tools/platform/integrationTool/restart";
 *
 * platformIntegrationToolRestart(server, env);
 */
export const platformIntegrationToolRestart = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-integration-tool-restart",
    {
      integrationToolUniqueName: z.string().describe("Unique name of the integration tool to restart"),
    },
    async (params) => {
      const integrationTool = await client.integrationTool.restart(params.integrationToolUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Integration Tool Restarted",
            description: `Restarted integration tool: ${params.integrationToolUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(integrationTool, null, 2),
          },
        ],
      };
    },
  );
};
