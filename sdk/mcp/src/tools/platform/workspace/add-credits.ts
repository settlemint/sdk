import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for adding credits to a workspace
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformWorkspaceAddCredits } from "@settlemint/sdk-mcp/tools/platform/workspace/addCredits";
 *
 * platformWorkspaceAddCredits(server, env);
 */
export const platformWorkspaceAddCredits = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-workspace-add-credits",
    {
      workspaceId: z.string().describe("ID of the workspace to add credits to"),
      amount: z.number().describe("Amount of credits to add"),
    },
    async (params) => {
      const result = await client.workspace.addCredits(params.workspaceId, params.amount);
      return {
        content: [
          {
            type: "text",
            name: "Credits Added",
            description: `Added ${params.amount} credits to workspace: ${params.workspaceId}`,
            mimeType: "application/json",
            text: JSON.stringify({ success: result }, null, 2),
          },
        ],
      };
    },
  );
};
