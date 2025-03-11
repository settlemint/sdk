import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { promptsGet } from "./get.js";
import { promptsList } from "./list.js";

/**
 * Registers all prompts tools with the MCP server
 *
 * @param server - The MCP server instance
 * @param env - Environment variables
 *
 * @example
 * import { registerPromptsTools } from "@settlemint/sdk-mcp/tools/prompts";
 *
 * registerPromptsTools(server, env);
 */
export const registerPromptsTools = (server: McpServer, env: Partial<DotEnv>) => {
  promptsList(server, env);
  promptsGet(server, env);
};

export { promptsList } from "./list.js";
export { promptsGet } from "./get.js";
