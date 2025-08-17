import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

  const schema = z.object({
    workspaceUniqueName: z.string().describe("Unique name of the workspace to list applications from"),
  });

  server.tool("platform-application-list", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    const { workspaceUniqueName } = schema.parse(params);
    const applications = await client.application.list(workspaceUniqueName);
    return {
      content: [
        {
          type: "text",
          name: "Application List",
          description: `List of applications in workspace: ${workspaceUniqueName}`,
          mimeType: "application/json",
          text: JSON.stringify(applications, null, 2),
        },
      ],
    };
  });
};
