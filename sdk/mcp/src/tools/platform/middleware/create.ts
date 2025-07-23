import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new middleware
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformMiddlewareCreate } from "@settlemint/sdk-mcp/tools/platform/middleware/create";
 *
 * platformMiddlewareCreate(server, env, pat);
 */
export const platformMiddlewareCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-middleware-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the middleware in"),
      name: z.string().describe("Name of the middleware"),
      type: z.enum(["DEDICATED", "SHARED"]).describe("Type of the middleware (DEDICATED or SHARED)"),
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe("Size of the middleware"),
      provider: z.string().describe("Provider for the middleware"),
      region: z.string().describe("Region for the middleware"),
      interface: z
        .enum(["ATTESTATION_INDEXER", "BESU", "FIREFLY_FABCONNECT", "GRAPH", "HA_GRAPH", "SMART_CONTRACT_PORTAL"])
        .describe("Interface type for the middleware"),
      blockchainNodeUniqueName: z
        .string()
        .optional()
        .describe(
          "Unique name of the blockchain node to connect to (mutually exclusive with loadBalancerUniqueName), preferred option for interface SMART_CONTRACT_PORTAL",
        ),
      loadBalancerUniqueName: z
        .string()
        .optional()
        .describe(
          "Unique name of the load balancer to connect to (mutually exclusive with blockchainNodeUniqueName), preferred option for all other interfaces",
        ),
    },
    async (params) => {
      if (params.blockchainNodeUniqueName && params.loadBalancerUniqueName) {
        throw new Error("Only one of 'blockchainNodeUniqueName' and 'loadBalancerUniqueName' may be provided");
      }

      const middleware = await client.middleware.create({
        applicationUniqueName: params.applicationUniqueName,
        name: params.name,
        type: params.type,
        size: params.size,
        provider: params.provider,
        region: params.region,
        interface: params.interface,
        blockchainNodeUniqueName: params.blockchainNodeUniqueName,
        loadBalancerUniqueName: params.loadBalancerUniqueName,
      });

      return {
        content: [
          {
            type: "text",
            name: "Middleware Created",
            description: `Created middleware: ${params.name} in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(middleware, null, 2),
          },
        ],
      };
    },
  );
};
