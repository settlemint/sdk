import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for creating a new private key
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformPrivateKeyCreate } from "@settlemint/sdk-mcp/tools/platform/private-key/create";
 *
 * platformPrivateKeyCreate(server, env, pat);
 */
export const platformPrivateKeyCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
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
      .describe("Unique name of the application to create the private key in"),
    name: z.string().describe("Name of the private key"),
    privateKeyType: z
      .enum(["ACCESSIBLE_ECDSA_P256", "HD_ECDSA_P256", "HSM_ECDSA_P256"])
      .describe("Type of private key"),
    blockchainNodeUniqueNames: z
      .array(z.string())
      .optional()
      .describe("Unique names of blockchain nodes to associate with the private key"),
  });

  server.tool(
    "platform-private-key-create",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const parsed = schema.parse(params);
      const privateKey = await client.privateKey.create({
        applicationUniqueName: parsed.applicationUniqueName,
        name: parsed.name,
        privateKeyType: parsed.privateKeyType,
        blockchainNodeUniqueNames: parsed.blockchainNodeUniqueNames,
      });

      return {
        content: [
          {
            type: "text",
            name: "Private Key Created",
            description: `Created private key: ${parsed.name} in application: ${parsed.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(privateKey, null, 2),
          },
        ],
      };
    },
  );
};
