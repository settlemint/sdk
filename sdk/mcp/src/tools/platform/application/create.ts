import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new application in a workspace
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformApplicationCreate } from "@settlemint/sdk-mcp/tools/platform/application/create";
 *
 * platformApplicationCreate(server, env);
 */
export const platformApplicationCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-application-create",
    {
      name: z.string().describe("Name of the application"),
      workspaceUniqueName: z.string().describe("Unique name of the workspace to create the application in"),
    },
    async (params) => {
      const application = await client.application.create({
        name: params.name,
        workspaceUniqueName: params.workspaceUniqueName,
      });

      return {
        content: [
          {
            type: "text",
            name: "Application Created",
            description: `Created application: ${params.name} in workspace: ${params.workspaceUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(application, null, 2),
          },
        ],
      };
    },
  );
};
