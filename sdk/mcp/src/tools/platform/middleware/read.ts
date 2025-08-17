import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for reading a middleware by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformMiddlewareRead } from "@settlemint/sdk-mcp/tools/platform/middleware/read";
 *
 * platformMiddlewareRead(server, env, pat);
 */
export const platformMiddlewareRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    middlewareUniqueName: z.string().describe("Unique name of the middleware to read"),
  });

  server.tool(
    "platform-middleware-read",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const { middlewareUniqueName } = schema.parse(params);
      const middleware = await client.middleware.read(middlewareUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Middleware Details",
            description: `Details for middleware: ${middlewareUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(middleware, null, 2),
          },
        ],
      };
    },
  );
};
