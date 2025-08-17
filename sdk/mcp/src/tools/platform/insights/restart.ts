import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for restarting an insights instance
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformInsightsRestart } from "@settlemint/sdk-mcp/tools/platform/insights/restart";
 *
 * platformInsightsRestart(server, env, pat);
 */
export const platformInsightsRestart = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    insightsUniqueName: z.string().describe("Unique name of the insights to restart"),
  });

  server.tool(
    "platform-insights-restart",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const { insightsUniqueName } = schema.parse(params);
      const insights = await client.insights.restart(insightsUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Insights Restarted",
            description: `Restarted insights: ${insightsUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(insights, null, 2),
          },
        ],
      };
    },
  );
};
