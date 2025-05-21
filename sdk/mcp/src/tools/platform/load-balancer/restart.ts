import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for restarting a load balancer
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformLoadBalancerRestart } from "@settlemint/sdk-mcp/tools/platform/load-balancer/restart";
 *
 * platformLoadBalancerRestart(server, env, pat);
 */
export const platformLoadBalancerRestart = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-load-balancer-restart",
    {
      loadBalancerUniqueName: z.string().describe("Unique name of the load balancer to restart"),
    },
    async (params) => {
      const loadBalancer = await client.loadBalancer.restart(params.loadBalancerUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Load Balancer Restarted",
            description: `Restarted load balancer: ${params.loadBalancerUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(loadBalancer, null, 2),
          },
        ],
      };
    },
  );
};
