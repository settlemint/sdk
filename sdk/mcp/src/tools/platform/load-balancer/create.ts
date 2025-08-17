import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for creating a new load balancer
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformLoadBalancerCreate } from "@settlemint/sdk-mcp/tools/platform/load-balancer/create";
 *
 * platformLoadBalancerCreate(server, env, pat);
 */
export const platformLoadBalancerCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    applicationUniqueName: z
      .string()
      .describe("Unique name of the application to create the load balancer in"),
    name: z.string().describe("Name of the load balancer"),
    type: z.enum(["DEDICATED", "SHARED"]).describe(
      "Type of the load balancer (DEDICATED or SHARED)",
    ),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe("Size of the load balancer"),
    provider: z.string().describe("Provider for the load balancer"),
    region: z.string().describe("Region for the load balancer"),
    blockchainNetworkUniqueName: z
      .string()
      .describe("Unique name of the blockchain network for the load balancer"),
    connectedNodesUniqueNames: z
      .array(z.string())
      .describe("Unique names of the nodes to connect to the load balancer"),
  });

  server.tool(
    "platform-load-balancer-create",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const parsed = schema.parse(params);
      const loadBalancer = await client.loadBalancer.create({
        applicationUniqueName: parsed.applicationUniqueName,
        name: parsed.name,
        type: parsed.type,
        size: parsed.size,
        provider: parsed.provider,
        region: parsed.region,
        blockchainNetworkUniqueName: parsed.blockchainNetworkUniqueName,
        connectedNodesUniqueNames: parsed.connectedNodesUniqueNames,
      });

      return {
        content: [
          {
            type: "text",
            name: "Load Balancer Created",
            description: `Created load balancer: ${parsed.name} in application: ${parsed.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(loadBalancer, null, 2),
          },
        ],
      };
    },
  );
};
