import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new blockchain node
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNodeCreate } from "@settlemint/sdk-mcp/tools/platform/blockchain-node/create";
 *
 * platformBlockchainNodeCreate(server, env, pat);
 */
export const platformBlockchainNodeCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-blockchain-node-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the node in"),
      blockchainNetworkUniqueName: z.string().describe("Unique name of the blockchain network for the node"),
      name: z.string().describe("Name of the blockchain node"),
      type: z.enum(["DEDICATED", "SHARED"]).describe("Type of the blockchain node (DEDICATED or SHARED)"),
      provider: z.string().describe("Provider for the blockchain node"),
      region: z.string().describe("Region for the blockchain node"),
    },
    async (params) => {
      const node = await client.blockchainNode.create({
        applicationUniqueName: params.applicationUniqueName,
        blockchainNetworkUniqueName: params.blockchainNetworkUniqueName,
        name: params.name,
        type: params.type,
        provider: params.provider,
        region: params.region,
      });

      return {
        content: [
          {
            type: "text",
            name: "Blockchain Node Created",
            description: `Created blockchain node: ${params.name} in network: ${params.blockchainNetworkUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(node, null, 2),
          },
        ],
      };
    },
  );
};
