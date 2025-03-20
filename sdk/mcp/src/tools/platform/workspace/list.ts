import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates a tool for listing all workspaces
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformWorkspaceList } from "@settlemint/sdk-mcp/tools/platform/workspace/list";
 *
 * platformWorkspaceList(server, env, pat);
 */
export const platformWorkspaceList = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool("platform-workspace-list", {}, async () => {
    const workspaces = await client.workspace.list();
    return {
      content: [
        {
          type: "text",
          name: "Workspace List",
          description: "List of workspaces",
          mimeType: "application/json",
          text: JSON.stringify(workspaces, null, 2),
        },
      ],
    };
  });
};
