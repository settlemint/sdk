import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for listing integration tools in an application
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformIntegrationToolList } from "@settlemint/sdk-mcp/tools/platform/integration-tool/list";
 *
 * platformIntegrationToolList(server, env, pat);
 */
export const platformIntegrationToolList = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
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
