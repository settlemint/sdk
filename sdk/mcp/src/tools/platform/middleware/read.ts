import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading a specific middleware by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformMiddlewareRead } from "@settlemint/sdk-mcp/tools/platform/middleware/read";
 *
 * platformMiddlewareRead(server, env);
 */
export const platformMiddlewareRead = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-middleware-read",
    {
      middlewareUniqueName: z.string().describe("Unique name of the middleware to read"),
    },
    async (params) => {
      const middleware = await client.middleware.read(params.middlewareUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Middleware Details",
            description: `Details for middleware: ${params.middlewareUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(middleware, null, 2),
          },
        ],
      };
    },
  );
};
