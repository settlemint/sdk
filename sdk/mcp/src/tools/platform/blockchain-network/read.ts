import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading a specific blockchain network by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNetworkRead } from "@settlemint/sdk-mcp/tools/platform/blockchainNetwork/read";
 *
 * platformBlockchainNetworkRead(server, env);
 */
export const platformBlockchainNetworkRead = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-blockchain-network-read",
    {
      blockchainNetworkUniqueName: z.string().describe("Unique name of the blockchain network to read"),
    },
    async (params) => {
      const network = await client.blockchainNetwork.read(params.blockchainNetworkUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Network Details",
            description: `Details for blockchain network: ${params.blockchainNetworkUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(network, null, 2),
          },
        ],
      };
    },
  );
};
