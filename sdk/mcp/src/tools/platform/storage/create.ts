import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for creating a new storage instance
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformStorageCreate } from "@settlemint/sdk-mcp/tools/platform/storage/create";
 *
 * platformStorageCreate(server, env, pat);
 */
export const platformStorageCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    applicationUniqueName: z
      .string()
      .describe("Unique name of the application to create the storage in"),
    name: z.string().describe("Name of the storage"),
    type: z.enum(["DEDICATED", "SHARED"]).describe(
      "Type of the storage (DEDICATED or SHARED)",
    ),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe("Size of the storage"),
    provider: z.string().describe("Provider for the storage"),
    region: z.string().describe("Region for the storage"),
    storageProtocol: z.enum(["IPFS", "MINIO"]).describe(
      "Storage protocol (IPFS or MINIO)",
    ),
  });

  server.tool(
    "platform-storage-create",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const parsed = schema.parse(params);
      const storage = await client.storage.create({
        applicationUniqueName: parsed.applicationUniqueName,
        name: parsed.name,
        type: parsed.type,
        size: parsed.size,
        provider: parsed.provider,
        region: parsed.region,
        storageProtocol: parsed.storageProtocol,
      });

      return {
        content: [
          {
            type: "text",
            name: "Storage Created",
            description: `Created storage: ${parsed.name} in application: ${parsed.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(storage, null, 2),
          },
        ],
      };
    },
  );
};
