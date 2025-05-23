import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for listing applications in a workspace
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformApplicationList } from "@settlemint/sdk-mcp/tools/platform/application/list";
 *
 * platformApplicationList(server, env, pat);
 */
export const platformApplicationList = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-application-list",
    {
      workspaceUniqueName: z.string().describe("Unique name of the workspace to list applications from"),
    },
    async (params) => {
      const applications = await client.application.list(params.workspaceUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Application List",
            description: `List of applications in workspace: ${params.workspaceUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(applications, null, 2),
          },
        ],
      };
    },
  );
};
