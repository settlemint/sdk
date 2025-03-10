import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for deleting a workspace by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformWorkspaceDelete } from "@settlemint/sdk-mcp/tools/platform/workspace/delete";
 *
 * platformWorkspaceDelete(server, env);
 */
export const platformWorkspaceDelete = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-workspace-delete",
    {
      workspaceUniqueName: z.string().describe("Unique name of the workspace to delete"),
    },
    async (params) => {
      const workspace = await client.workspace.delete(params.workspaceUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Workspace Deleted",
            description: `Deleted workspace: ${params.workspaceUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(workspace, null, 2),
          },
        ],
      };
    },
  );
};
