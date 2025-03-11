import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates a tool for retrieving the platform configuration
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformPlatformConfig } from "@settlemint/sdk-mcp/tools/platform/platform/config";
 *
 * platformPlatformConfig(server, env, pat);
 */
export const platformPlatformConfig = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool("platform-platform-config", {}, async () => {
    const config = await client.platform.config();
    return {
      content: [
        {
          type: "text",
          name: "Platform Configuration",
          description: "Platform configuration details",
          mimeType: "application/json",
          text: JSON.stringify(config, null, 2),
        },
      ],
    };
  });
};
