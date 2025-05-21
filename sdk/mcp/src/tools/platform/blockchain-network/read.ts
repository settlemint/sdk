import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for reading a blockchain network by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNetworkRead } from "@settlemint/sdk-mcp/tools/platform/blockchain-network/read";
 *
 * platformBlockchainNetworkRead(server, env, pat);
 */
export const platformBlockchainNetworkRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-blockchain-network-read",
    {
      blockchainNetworkUniqueName: z.string().describe("Unique name of the blockchain network to read").optional(),
    },
    async (params) => {
      // Prioritize environment variable over LLM-provided parameter
      const blockchainNetworkUniqueName = env.SETTLEMINT_BLOCKCHAIN_NETWORK || params.blockchainNetworkUniqueName;

      if (!blockchainNetworkUniqueName) {
        throw new Error(
          "Blockchain network unique name is required. Set SETTLEMINT_BLOCKCHAIN_NETWORK environment variable or provide blockchainNetworkUniqueName parameter.",
        );
      }

      const network = await client.blockchainNetwork.read(blockchainNetworkUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Network Details",
            description: `Details for blockchain network: ${blockchainNetworkUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(network, null, 2),
          },
        ],
      };
    },
  );
};
