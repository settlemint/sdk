import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for listing load balancers in an application
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformLoadBalancerList } from "@settlemint/sdk-mcp/tools/platform/load-balancer/list";
 *
 * platformLoadBalancerList(server, env, pat);
 */
export const platformLoadBalancerList = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-load-balancer-list",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to list load balancers from"),
    },
    async (params) => {
      const loadBalancers = await client.loadBalancer.list(params.applicationUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Load Balancer List",
            description: `List of load balancers in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(loadBalancers, null, 2),
          },
        ],
      };
    },
  );
};
