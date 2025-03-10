import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new private key
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformPrivateKeyCreate } from "@settlemint/sdk-mcp/tools/platform/privateKey/create";
 *
 * platformPrivateKeyCreate(server, env);
 */
export const platformPrivateKeyCreate = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-private-key-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the private key in"),
      name: z.string().describe("Name of the private key"),
      privateKeyType: z
        .enum(["ACCESSIBLE_ECDSA_P256", "HD_ECDSA_P256", "HSM_ECDSA_P256"])
        .describe("Type of private key"),
      blockchainNodeUniqueNames: z
        .array(z.string())
        .optional()
        .describe("Unique names of blockchain nodes to associate with the private key"),
    },
    async (params) => {
      const privateKey = await client.privateKey.create({
        applicationUniqueName: params.applicationUniqueName,
        name: params.name,
        privateKeyType: params.privateKeyType,
        blockchainNodeUniqueNames: params.blockchainNodeUniqueNames,
      });

      return {
        content: [
          {
            type: "text",
            name: "Private Key Created",
            description: `Created private key: ${params.name} in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(privateKey, null, 2),
          },
        ],
      };
    },
  );
};
