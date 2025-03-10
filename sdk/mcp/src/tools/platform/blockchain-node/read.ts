import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading a specific blockchain node by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNodeRead } from "@settlemint/sdk-mcp/tools/platform/blockchainNode/read";
 *
 * platformBlockchainNodeRead(server, env);
 */
export const platformBlockchainNodeRead = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-blockchain-node-read",
    {
      blockchainNodeUniqueName: z.string().describe("Unique name of the blockchain node to read"),
    },
    async (params) => {
      const node = await client.blockchainNode.read(params.blockchainNodeUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Node Details",
            description: `Details for blockchain node: ${params.blockchainNodeUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(node, null, 2),
          },
        ],
      };
    },
  );
};
