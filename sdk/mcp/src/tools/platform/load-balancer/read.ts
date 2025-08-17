import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

  const schema = z.object({
    loadBalancerUniqueName: z.string().describe("Unique name of the load balancer to read"),
  });

  server.tool("platform-load-balancer-read", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    const { loadBalancerUniqueName } = schema.parse(params);
    const loadBalancer = await client.loadBalancer.read(loadBalancerUniqueName);
    return {
      content: [
        {
          type: "text",
          name: "Load Balancer Details",
          description: `Details for load balancer: ${loadBalancerUniqueName}`,
          mimeType: "application/json",
          text: JSON.stringify(loadBalancer, null, 2),
        },
      ],
    };
  });
};
