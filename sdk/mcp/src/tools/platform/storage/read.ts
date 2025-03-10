import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading a specific storage by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformStorageRead } from "@settlemint/sdk-mcp/tools/platform/storage/read";
 *
 * platformStorageRead(server, env);
 */
export const platformStorageRead = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-storage-read",
    {
      storageUniqueName: z.string().describe("Unique name of the storage to read"),
    },
    async (params) => {
      const storage = await client.storage.read(params.storageUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Storage Details",
            description: `Details for storage: ${params.storageUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(storage, null, 2),
          },
        ],
      };
    },
  );
};
