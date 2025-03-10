import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for deleting a blockchain network
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNetworkDelete } from "@settlemint/sdk-mcp/tools/platform/blockchain-network/delete";
 *
 * platformBlockchainNetworkDelete(server, env, pat);
 */
export const platformBlockchainNetworkDelete = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-blockchain-network-delete",
    {
      networkUniqueName: z.string().describe("Unique name of the blockchain network to delete").optional(),
    },
    async (params) => {
      // Prioritize environment variable over LLM-provided parameter
      const networkUniqueName = env.SETTLEMINT_BLOCKCHAIN_NETWORK || params.networkUniqueName;

      if (!networkUniqueName) {
        throw new Error(
          "Blockchain network unique name is required. Set SETTLEMINT_BLOCKCHAIN_NETWORK environment variable or provide networkUniqueName parameter.",
        );
      }

      const network = await client.blockchainNetwork.delete(networkUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Network Deleted",
            description: `Deleted blockchain network: ${networkUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(network, null, 2),
          },
        ],
      };
    },
  );
};
