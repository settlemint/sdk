import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for reading a blockchain node by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNodeRead } from "@settlemint/sdk-mcp/tools/platform/blockchain-node/read";
 *
 * platformBlockchainNodeRead(server, env, pat);
 */
export const platformBlockchainNodeRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    blockchainNodeUniqueName: z.string().describe("Unique name of the blockchain node to read"),
  });

  server.tool(
    "platform-blockchain-node-read",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const { blockchainNodeUniqueName } = schema.parse(params);
      const node = await client.blockchainNode.read(blockchainNodeUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Node Details",
            description: `Details for blockchain node: ${blockchainNodeUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(node, null, 2),
          },
        ],
      };
    },
  );
};
