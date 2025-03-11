import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for handling wallet pincode verification responses
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformWalletPincodeVerificationResponse } from "@settlemint/sdk-mcp/tools/platform/wallet/pincode-verification-response";
 *
 * platformWalletPincodeVerificationResponse(server, env, pat);
 */
export const platformWalletPincodeVerificationResponse = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-wallet-pincode-verification-response",
    {
      userWalletAddress: z.string().describe("User wallet address"),
      pincode: z.string().describe("Pincode for verification"),
      nodeId: z.string().describe("Node ID"),
    },
    async (params) => {
      const response = await client.wallet.pincodeVerificationResponse({
        userWalletAddress: params.userWalletAddress,
        pincode: params.pincode,
        nodeId: params.nodeId,
      });

      return {
        content: [
          {
            type: "text",
            name: "Pincode Verification Response",
            description: "Generated pincode verification response",
            mimeType: "text/plain",
            text: response,
          },
        ],
      };
    },
  );
};
