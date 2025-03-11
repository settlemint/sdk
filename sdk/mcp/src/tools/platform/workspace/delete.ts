import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for deleting a workspace
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformWorkspaceDelete } from "@settlemint/sdk-mcp/tools/platform/workspace/delete";
 *
 * platformWorkspaceDelete(server, env, pat);
 */
export const platformWorkspaceDelete = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
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
