import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for restarting a private key
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformPrivateKeyRestart } from "@settlemint/sdk-mcp/tools/platform/private-key/restart";
 *
 * platformPrivateKeyRestart(server, env, pat);
 */
export const platformPrivateKeyRestart = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-private-key-restart",
    {
      privateKeyUniqueName: z.string().describe("Unique name of the private key to restart"),
    },
    async (params) => {
      const privateKey = await client.privateKey.restart(params.privateKeyUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Private Key Restarted",
            description: `Restarted private key: ${params.privateKeyUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(privateKey, null, 2),
          },
        ],
      };
    },
  );
};
