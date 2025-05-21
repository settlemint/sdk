import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for listing insights instances
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformInsightsList } from "@settlemint/sdk-mcp/tools/platform/insights/list";
 *
 * platformInsightsList(server, env, pat);
 */
export const platformInsightsList = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-insights-list",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to list insights from"),
    },
    async (params) => {
      const insightsList = await client.insights.list(params.applicationUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Insights List",
            description: `List of insights in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(insightsList, null, 2),
          },
        ],
      };
    },
  );
};
