import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading an integration tool by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformIntegrationToolRead } from "@settlemint/sdk-mcp/tools/platform/integration-tool/read";
 *
 * platformIntegrationToolRead(server, env, pat);
 */
export const platformIntegrationToolRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
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
