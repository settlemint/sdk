import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for retrieving graph subgraphs for a middleware
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformMiddlewareGraphSubgraphs } from "@settlemint/sdk-mcp/tools/platform/middleware/graph-subgraphs";
 *
 * platformMiddlewareGraphSubgraphs(server, env, pat);
 */
export const platformMiddlewareGraphSubgraphs = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-middleware-graph-subgraphs",
    {
      middlewareUniqueName: z.string().describe("Unique name of the middleware to retrieve graph subgraphs from"),
      noCache: z.boolean().optional().describe("Whether to bypass cache when retrieving subgraphs"),
    },
    async (params) => {
      const middlewareWithSubgraphs = await client.middleware.graphSubgraphs(
        params.middlewareUniqueName,
        params.noCache,
      );

      return {
        content: [
          {
            type: "text",
            name: "Middleware Graph Subgraphs",
            description: `Graph subgraphs for middleware: ${params.middlewareUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(middlewareWithSubgraphs, null, 2),
          },
        ],
      };
    },
  );
};
