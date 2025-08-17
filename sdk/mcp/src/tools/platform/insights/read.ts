import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for reading an insights instance by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformInsightsRead } from "@settlemint/sdk-mcp/tools/platform/insights/read";
 *
 * platformInsightsRead(server, env, pat);
 */
export const platformInsightsRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    insightsUniqueName: z.string().describe("Unique name of the insights to read"),
  });

  server.tool(
    "platform-insights-read",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const { insightsUniqueName } = schema.parse(params);
      const insights = await client.insights.read(insightsUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Insights Details",
            description: `Details for insights: ${insightsUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(insights, null, 2),
          },
        ],
      };
    },
  );
};
