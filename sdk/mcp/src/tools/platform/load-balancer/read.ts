import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for reading a load balancer by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformLoadBalancerRead } from "@settlemint/sdk-mcp/tools/platform/load-balancer/read";
 *
 * platformLoadBalancerRead(server, env, pat);
 */
export const platformLoadBalancerRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-load-balancer-read",
    {
      loadBalancerUniqueName: z.string().describe("Unique name of the load balancer to read"),
    },
    async (params) => {
      const loadBalancer = await client.loadBalancer.read(params.loadBalancerUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Load Balancer Details",
            description: `Details for load balancer: ${params.loadBalancerUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(loadBalancer, null, 2),
          },
        ],
      };
    },
  );
};
