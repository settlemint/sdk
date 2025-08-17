import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for creating a new blockchain node
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNodeCreate } from "@settlemint/sdk-mcp/tools/platform/blockchain-node/create";
 *
 * platformBlockchainNodeCreate(server, env, pat);
 */
export const platformBlockchainNodeCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    applicationUniqueName: z.string().describe("Unique name of the application to create the node in"),
    blockchainNetworkUniqueName: z.string().describe("Unique name of the blockchain network for the node"),
    name: z.string().describe("Name of the blockchain node"),
    type: z.enum(["DEDICATED", "SHARED"]).describe(
      "Type of the blockchain node (DEDICATED or SHARED)",
    ),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe("Size of the blockchain node"),
    nodeType: z
      .enum(["NON_VALIDATOR", "NOTARY", "ORDERER", "PEER", "UNSPECIFIED", "VALIDATOR"])
      .describe(
        "The type of the blockchain node (NON_VALIDATOR, NOTARY, ORDERER, PEER, UNSPECIFIED, or VALIDATOR)",
      )
      .optional(),
    provider: z.string().describe("Provider for the blockchain node"),
    region: z.string().describe("Region for the blockchain node"),
  });

  server.tool(
    "platform-blockchain-node-create",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const parsed = schema.parse(params);
      const node = await client.blockchainNode.create({
        applicationUniqueName: parsed.applicationUniqueName,
        blockchainNetworkUniqueName: parsed.blockchainNetworkUniqueName,
        name: parsed.name,
        type: parsed.type,
        size: parsed.size,
        nodeType: parsed.nodeType,
        provider: parsed.provider,
        region: parsed.region,
      });

      return {
        content: [
          {
            type: "text",
            name: "Blockchain Node Created",
            description: `Created blockchain node: ${parsed.name} in network: ${parsed.blockchainNetworkUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(node, null, 2),
          },
        ],
      };
    },
  );
};
