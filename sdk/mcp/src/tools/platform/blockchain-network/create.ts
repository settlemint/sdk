import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new blockchain network
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNetworkCreate } from "@settlemint/sdk-mcp/tools/platform/blockchainNetwork/create";
 *
 * platformBlockchainNetworkCreate(server, env);
 */
export const platformBlockchainNetworkCreate = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-blockchain-network-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the network in"),
      name: z.string().describe("Name of the blockchain network"),
      type: z.enum(["DEDICATED", "SHARED"]).describe("Type of the blockchain network (DEDICATED or SHARED)"),
      provider: z.string().describe("Provider for the blockchain network"),
      region: z.string().describe("Region for the blockchain network"),
      nodeName: z.string().describe("Name for the initial node"),
      consensusAlgorithm: z
        .enum([
          "ARBITRUM",
          "ARBITRUM_GOERLI",
          "ARBITRUM_SEPOLIA",
          "AVALANCHE",
          "AVALANCHE_FUJI",
          "BESU_IBFTv2",
          "BESU_QBFT",
          "BSC_POW",
          "BSC_POW_TESTNET",
          "CORDA",
          "FABRIC_RAFT",
        ])
        .describe("Consensus algorithm for the blockchain network"),
    },
    async (params) => {
      const network = await client.blockchainNetwork.create({
        applicationUniqueName: params.applicationUniqueName,
        name: params.name,
        type: params.type,
        provider: params.provider,
        region: params.region,
        nodeName: params.nodeName,
        consensusAlgorithm: params.consensusAlgorithm,
      });

      return {
        content: [
          {
            type: "text",
            name: "Blockchain Network Created",
            description: `Created blockchain network: ${params.name} in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(network, null, 2),
          },
        ],
      };
    },
  );
};
