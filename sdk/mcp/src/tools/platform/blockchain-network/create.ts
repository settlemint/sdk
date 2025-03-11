import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new blockchain network
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNetworkCreate } from "@settlemint/sdk-mcp/tools/platform/blockchain-network/create";
 *
 * platformBlockchainNetworkCreate(server, env, pat);
 */
export const platformBlockchainNetworkCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-blockchain-network-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the network in").optional(),
      name: z.string().describe("Name of the blockchain network"),
      type: z.enum(["DEDICATED", "SHARED"]).describe("Type of the blockchain network (DEDICATED or SHARED)"),
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe("Size of the blockchain network"),
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
      // Prioritize environment variable over LLM-provided parameter for application
      const applicationUniqueName = env.SETTLEMINT_APPLICATION || params.applicationUniqueName;

      if (!applicationUniqueName) {
        throw new Error(
          "Application unique name is required. Set SETTLEMINT_APPLICATION environment variable or provide applicationUniqueName parameter.",
        );
      }

      // For network name, we could potentially use SETTLEMINT_BLOCKCHAIN_NETWORK if it's set
      // but this is a creation operation, so we'll use the provided name parameter

      const network = await client.blockchainNetwork.create({
        applicationUniqueName,
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
            description: `Created blockchain network: ${params.name} in application: ${applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(network, null, 2),
          },
        ],
      };
    },
  );
};
