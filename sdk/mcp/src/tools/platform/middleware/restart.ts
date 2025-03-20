import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for restarting a middleware
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformMiddlewareRestart } from "@settlemint/sdk-mcp/tools/platform/middleware/restart";
 *
 * platformMiddlewareRestart(server, env, pat);
 */
export const platformMiddlewareRestart = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-middleware-restart",
    {
      middlewareUniqueName: z.string().describe("Unique name of the middleware to restart"),
    },
    async (params) => {
      const middleware = await client.middleware.restart(params.middlewareUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Middleware Restarted",
            description: `Restarted middleware: ${params.middlewareUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(middleware, null, 2),
          },
        ],
      };
    },
  );
};
