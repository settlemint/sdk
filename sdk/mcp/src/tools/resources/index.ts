import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { resourcesGet } from "./get.js";
import { resourcesList } from "./list.js";

/**
 * Registers all resources tools with the MCP server
 *
 * @param server - The MCP server instance
 * @param env - Environment variables
 *
 * @example
 * import { registerResourcesTools } from "@settlemint/sdk-mcp/tools/resources";
 *
 * registerResourcesTools(server, env);
 */
export const registerResourcesTools = (server: McpServer, env: Partial<DotEnv>) => {
  resourcesList(server, env);
  resourcesGet(server, env);
};

export { resourcesList } from "./list.js";
export { resourcesGet } from "./get.js";
