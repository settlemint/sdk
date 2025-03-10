import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export const platformWorkspaceList = (server: McpServer, env: Partial<DotEnv>) => {
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
