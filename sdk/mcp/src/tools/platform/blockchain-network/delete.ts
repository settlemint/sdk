import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for deleting a blockchain network by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNetworkDelete } from "@settlemint/sdk-mcp/tools/platform/blockchainNetwork/delete";
 *
 * platformBlockchainNetworkDelete(server, env);
 */
export const platformBlockchainNetworkDelete = (server: McpServer, env: Partial<DotEnv>) => {
  const instance = env.SETTLEMINT_INSTANCE;
  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  if (!accessToken) {
    throw new Error("SETTLEMINT_ACCESS_TOKEN is not set");
  }

  const client = createSettleMintClient({
    accessToken: accessToken,
    instance: instance,
  });

  server.tool(
    "platform-blockchain-network-delete",
    {
      networkUniqueName: z.string().describe("Unique name of the blockchain network to delete"),
    },
    async (params) => {
      const network = await client.blockchainNetwork.delete(params.networkUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Network Deleted",
            description: `Deleted blockchain network: ${params.networkUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(network, null, 2),
          },
        ],
      };
    },
  );
};
