import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

  const schema = z.object({
    loadBalancerUniqueName: z.string().describe("Unique name of the load balancer to restart"),
  });

  server.tool("platform-load-balancer-restart", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    const { loadBalancerUniqueName } = schema.parse(params);
    const loadBalancer = await client.loadBalancer.restart(loadBalancerUniqueName);
    return {
      content: [
        {
          type: "text",
          name: "Load Balancer Restarted",
          description: `Restarted load balancer: ${loadBalancerUniqueName}`,
          mimeType: "application/json",
          text: JSON.stringify(loadBalancer, null, 2),
        },
      ],
    };
  });
};
