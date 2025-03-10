import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading a specific workspace by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformWorkspaceRead } from "@settlemint/sdk-mcp/tools/platform/workspace/read";
 *
 * platformWorkspaceRead(server, env);
 */
export const platformWorkspaceRead = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-workspace-read",
    {
      workspaceUniqueName: z.string().describe("Unique name of the workspace to read"),
    },
    async (params) => {
      const workspace = await client.workspace.read(params.workspaceUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Workspace Details",
            description: `Details for workspace: ${params.workspaceUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(workspace, null, 2),
          },
        ],
      };
    },
  );
};
