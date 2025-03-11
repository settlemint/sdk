import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for retrieving foundry environment variables
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformFoundryEnv } from "@settlemint/sdk-mcp/tools/platform/foundry/env";
 *
 * platformFoundryEnv(server, env, pat);
 */
export const platformFoundryEnv = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-foundry-env",
    {
      blockchainNodeUniqueName: z
        .string()
        .describe("Unique name of the blockchain node to get foundry environment variables for"),
    },
    async (params) => {
      const foundryEnv = await client.foundry.env(params.blockchainNodeUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Foundry Environment Variables",
            description: `Foundry environment variables for blockchain node: ${params.blockchainNodeUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(foundryEnv, null, 2),
          },
        ],
      };
    },
  );
};
