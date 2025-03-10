import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for restarting a storage instance
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformStorageRestart } from "@settlemint/sdk-mcp/tools/platform/storage/restart";
 *
 * platformStorageRestart(server, env, pat);
 */
export const platformStorageRestart = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-storage-restart",
    {
      storageUniqueName: z.string().describe("Unique name of the storage to restart"),
    },
    async (params) => {
      const storage = await client.storage.restart(params.storageUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Storage Restarted",
            description: `Restarted storage: ${params.storageUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(storage, null, 2),
          },
        ],
      };
    },
  );
};
