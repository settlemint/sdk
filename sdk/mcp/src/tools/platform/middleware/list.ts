import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for listing middleware instances
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformMiddlewareList } from "@settlemint/sdk-mcp/tools/platform/middleware/list";
 *
 * platformMiddlewareList(server, env, pat);
 */
export const platformMiddlewareList = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-middleware-list",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to list middleware from"),
    },
    async (params) => {
      const middlewareList = await client.middleware.list(params.applicationUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Middleware List",
            description: `List of middleware in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(middlewareList, null, 2),
          },
        ],
      };
    },
  );
};
