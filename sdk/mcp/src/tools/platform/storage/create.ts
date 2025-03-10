import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new storage
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformStorageCreate } from "@settlemint/sdk-mcp/tools/platform/storage/create";
 *
 * platformStorageCreate(server, env);
 */
export const platformStorageCreate = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-storage-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the storage in"),
      name: z.string().describe("Name of the storage"),
      type: z.enum(["DEDICATED", "SHARED"]).describe("Type of the storage (DEDICATED or SHARED)"),
      provider: z.string().describe("Provider for the storage"),
      region: z.string().describe("Region for the storage"),
      storageProtocol: z.enum(["IPFS", "MINIO"]).describe("Storage protocol (IPFS or MINIO)"),
    },
    async (params) => {
      const storage = await client.storage.create({
        applicationUniqueName: params.applicationUniqueName,
        name: params.name,
        type: params.type,
        provider: params.provider,
        region: params.region,
        storageProtocol: params.storageProtocol,
      });

      return {
        content: [
          {
            type: "text",
            name: "Storage Created",
            description: `Created storage: ${params.name} in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(storage, null, 2),
          },
        ],
      };
    },
  );
};
