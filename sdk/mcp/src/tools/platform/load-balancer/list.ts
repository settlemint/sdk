import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

  const schema = z.object({
    applicationUniqueName: z.string().describe("Unique name of the application to list load balancers from"),
  });

  server.tool("platform-load-balancer-list", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    const { applicationUniqueName } = schema.parse(params);
    const loadBalancers = await client.loadBalancer.list(applicationUniqueName);
    return {
      content: [
        {
          type: "text",
          name: "Load Balancer List",
          description: `List of load balancers in application: ${applicationUniqueName}`,
          mimeType: "application/json",
          text: JSON.stringify(loadBalancers, null, 2),
        },
      ],
    };
  });
};
