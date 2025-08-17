import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for reading a storage instance by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformStorageRead } from "@settlemint/sdk-mcp/tools/platform/storage/read";
 *
 * platformStorageRead(server, env, pat);
 */
export const platformStorageRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    storageUniqueName: z.string().describe("Unique name of the storage to read"),
  });

  server.tool(
    "platform-storage-read",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const { storageUniqueName } = schema.parse(params);
      const storage = await client.storage.read(storageUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Storage Details",
            description: `Details for storage: ${storageUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(storage, null, 2),
          },
        ],
      };
    },
  );
};
