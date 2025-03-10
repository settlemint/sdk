import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading a specific private key by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformPrivateKeyRead } from "@settlemint/sdk-mcp/tools/platform/privateKey/read";
 *
 * platformPrivateKeyRead(server, env);
 */
export const platformPrivateKeyRead = (server: McpServer, env: Partial<DotEnv>) => {
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
