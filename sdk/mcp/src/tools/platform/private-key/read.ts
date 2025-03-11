import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading a private key by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformPrivateKeyRead } from "@settlemint/sdk-mcp/tools/platform/private-key/read";
 *
 * platformPrivateKeyRead(server, env, pat);
 */
export const platformPrivateKeyRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-private-key-read",
    {
      privateKeyUniqueName: z.string().describe("Unique name of the private key to read"),
    },
    async (params) => {
      const privateKey = await client.privateKey.read(params.privateKeyUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Private Key Details",
            description: `Details for private key: ${params.privateKeyUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(privateKey, null, 2),
          },
        ],
      };
    },
  );
};
