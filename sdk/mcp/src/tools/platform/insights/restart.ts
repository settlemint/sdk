import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for restarting an insights by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformInsightsRestart } from "@settlemint/sdk-mcp/tools/platform/insights/restart";
 *
 * platformInsightsRestart(server, env);
 */
export const platformInsightsRestart = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-insights-restart",
    {
      insightsUniqueName: z.string().describe("Unique name of the insights to restart"),
    },
    async (params) => {
      const insights = await client.insights.restart(params.insightsUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Insights Restarted",
            description: `Restarted insights: ${params.insightsUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(insights, null, 2),
          },
        ],
      };
    },
  );
};
