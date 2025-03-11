import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new insights instance
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformInsightsCreate } from "@settlemint/sdk-mcp/tools/platform/insights/create";
 *
 * platformInsightsCreate(server, env, pat);
 */
export const platformInsightsCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-insights-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the insights in"),
      name: z.string().describe("Name of the insights"),
      type: z.enum(["DEDICATED", "SHARED"]).describe("Type of the insights (DEDICATED or SHARED)"),
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe("Size of the insights"),
      provider: z.string().describe("Provider for the insights"),
      region: z.string().describe("Region for the insights"),
      insightsCategory: z
        .enum(["BLOCKCHAIN_EXPLORER", "HYPERLEDGER_EXPLORER", "OTTERSCAN_BLOCKCHAIN_EXPLORER"])
        .describe("Category of insights"),
      blockchainNodeUniqueName: z.string().optional().describe("Unique name of the blockchain node to connect to"),
    },
    async (params) => {
      const insights = await client.insights.create({
        applicationUniqueName: params.applicationUniqueName,
        name: params.name,
        type: params.type,
        provider: params.provider,
        region: params.region,
        insightsCategory: params.insightsCategory,
        blockchainNodeUniqueName: params.blockchainNodeUniqueName,
      });

      return {
        content: [
          {
            type: "text",
            name: "Insights Created",
            description: `Created insights: ${params.name} in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(insights, null, 2),
          },
        ],
      };
    },
  );
};
