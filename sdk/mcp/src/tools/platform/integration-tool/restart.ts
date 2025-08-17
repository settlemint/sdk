import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for restarting an integration tool
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformIntegrationToolRestart } from "@settlemint/sdk-mcp/tools/platform/integration-tool/restart";
 *
 * platformIntegrationToolRestart(server, env, pat);
 */
export const platformIntegrationToolRestart = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    integrationToolUniqueName: z
      .string()
      .describe("Unique name of the integration tool to restart"),
  });

  server.tool(
    "platform-integration-tool-restart",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const { integrationToolUniqueName } = schema.parse(params);
      const integrationTool = await client.integrationTool.restart(
        integrationToolUniqueName,
      );
      return {
        content: [
          {
            type: "text",
            name: "Integration Tool Restarted",
            description: `Restarted integration tool: ${integrationToolUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(integrationTool, null, 2),
          },
        ],
      };
    },
  );
};
