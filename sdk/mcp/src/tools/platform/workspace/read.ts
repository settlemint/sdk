import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for reading a workspace by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformWorkspaceRead } from "@settlemint/sdk-mcp/tools/platform/workspace/read";
 *
 * platformWorkspaceRead(server, env, pat);
 */
export const platformWorkspaceRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    workspaceUniqueName: z.string().describe("Unique name of the workspace to read"),
  });

  server.tool("platform-workspace-read", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    const { workspaceUniqueName } = schema.parse(params);
    const workspace = await client.workspace.read(workspaceUniqueName);
    return {
      content: [
        {
          type: "text",
          name: "Workspace Details",
          description: `Details for workspace: ${workspaceUniqueName}`,
          mimeType: "application/json",
          text: JSON.stringify(workspace, null, 2),
        },
      ],
    };
  });
};
