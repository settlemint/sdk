import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates a tool for retrieving the platform configuration
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformPlatformConfig } from "@settlemint/sdk-mcp/tools/platform/platform/config";
 *
 * platformPlatformConfig(server, env);
 */
export const platformPlatformConfig = (server: McpServer, env: Partial<DotEnv>) => {
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
