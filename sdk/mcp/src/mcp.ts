#!/usr/bin/env node

import { portalQueries } from "@/tools/portal/queries";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { type DotEnv, PersonalAccessTokenSchema } from "@settlemint/sdk-utils/validation";
import { Command } from "commander";
import pkg from "../package.json";
import { hasuraPrompt } from "./prompts/hasura/hasura";
import { portalPrompt } from "./prompts/portal/portal";
import { thegraphPrompt } from "./prompts/thegraph/thegraph";
import { platformToolsUsagePrompt } from "./prompts/tool-usage/platform-tools";
import { promptsResourcesToolsUsagePrompt } from "./prompts/tool-usage/prompts-resources-tools.js";
import { registerBlockchainConcepts } from "./resources/blockchain-concepts";
import { hasuraMutation } from "./tools/hasura/mutation";
import { hasuraMutations } from "./tools/hasura/mutations";
import { hasuraQueries } from "./tools/hasura/queries";
import { hasuraQuery } from "./tools/hasura/query";
import { platformApplicationList } from "./tools/platform/application/list.js";
import { platformApplicationRead } from "./tools/platform/application/read.js";
import { platformBlockchainNetworkCreate } from "./tools/platform/blockchain-network/create.js";
import { platformBlockchainNetworkList } from "./tools/platform/blockchain-network/list.js";
import { platformBlockchainNetworkRead } from "./tools/platform/blockchain-network/read.js";
import { platformBlockchainNetworkRestart } from "./tools/platform/blockchain-network/restart.js";
import { platformBlockchainNodeCreate } from "./tools/platform/blockchain-node/create.js";
import { platformBlockchainNodeList } from "./tools/platform/blockchain-node/list.js";
import { platformBlockchainNodeRead } from "./tools/platform/blockchain-node/read.js";
import { platformBlockchainNodeRestart } from "./tools/platform/blockchain-node/restart.js";
import { platformCustomDeploymentCreate } from "./tools/platform/custom-deployment/create";
import { platformCustomDeploymentEdit } from "./tools/platform/custom-deployment/edit";
import { platformCustomDeploymentList } from "./tools/platform/custom-deployment/list.js";
import { platformCustomDeploymentRead } from "./tools/platform/custom-deployment/read.js";
import { platformCustomDeploymentRestart } from "./tools/platform/custom-deployment/restart";
import { platformInsightsCreate } from "./tools/platform/insights/create.js";
import { platformInsightsList } from "./tools/platform/insights/list.js";
import { platformInsightsRead } from "./tools/platform/insights/read.js";
import { platformInsightsRestart } from "./tools/platform/insights/restart.js";
import { platformIntegrationToolCreate } from "./tools/platform/integration-tool/create.js";
import { platformIntegrationToolList } from "./tools/platform/integration-tool/list.js";
import { platformIntegrationToolRead } from "./tools/platform/integration-tool/read.js";
import { platformIntegrationToolRestart } from "./tools/platform/integration-tool/restart.js";
import { platformLoadBalancerCreate } from "./tools/platform/load-balancer/create";
import { platformLoadBalancerList } from "./tools/platform/load-balancer/list";
import { platformLoadBalancerRead } from "./tools/platform/load-balancer/read";
import { platformLoadBalancerRestart } from "./tools/platform/load-balancer/restart";
import { platformMiddlewareCreate } from "./tools/platform/middleware/create.js";
import { platformMiddlewareList } from "./tools/platform/middleware/list.js";
import { platformMiddlewareRead } from "./tools/platform/middleware/read.js";
import { platformMiddlewareRestart } from "./tools/platform/middleware/restart.js";
import { platformPrivateKeyCreate } from "./tools/platform/private-key/create.js";
import { platformPrivateKeyList } from "./tools/platform/private-key/list.js";
import { platformPrivateKeyRead } from "./tools/platform/private-key/read.js";
import { platformPrivateKeyRestart } from "./tools/platform/private-key/restart.js";
import { platformStorageCreate } from "./tools/platform/storage/create.js";
import { platformStorageList } from "./tools/platform/storage/list.js";
import { platformStorageRead } from "./tools/platform/storage/read.js";
import { platformStorageRestart } from "./tools/platform/storage/restart.js";
import { platformWorkspaceList } from "./tools/platform/workspace/list.js";
import { platformWorkspaceRead } from "./tools/platform/workspace/read.js";
import { portalMutation } from "./tools/portal/mutation";
import { portalMutations } from "./tools/portal/mutations";
import { portalQuery } from "./tools/portal/query";
import { registerPromptsTools } from "./tools/prompts/index.js";
import { registerResourcesTools } from "./tools/resources/index.js";

/**
 * Parse command line arguments using Commander
 *
 * @returns The parsed command line options
 * @example
 * import { parseArguments } from '@settlemint/sdk-mcp';
 *
 * const args = parseArguments();
 * console.log(args.path); // Path to the directory containing .env files
 * console.log(args.pat); // Personal Access Token
 */
function parseArguments() {
  const program = new Command();

  program
    .name("settlemint")
    .description("SettleMint SDK MCP Interface")
    .version(pkg.version)
    .option("--path <path>", "Path to the directory containing .env files")
    .option("--pat <token>", "Personal Access Token for authentication")
    .allowUnknownOption(true) // Allow unknown options to support future extensions
    .parse(process.argv);

  return program.opts();
}

/**
 * Main function to initialize and start the MCP server
 */
async function main() {
  try {
    const server = new McpServer({
      name: "SettleMint",
      version: pkg.version,
    });

    // Parse command line arguments
    const args = parseArguments();
    const envPath = args.path || process.cwd();
    const pat = PersonalAccessTokenSchema.parse(args.pat);

    // Load environment variables
    const env: Partial<DotEnv> = await loadEnv(true, false, envPath);

    // Register Portal tools
    portalPrompt(server);
    portalQueries(server, env);
    portalMutations(server, env);
    portalQuery(server, env);
    portalMutation(server, env);

    // Register The Graph tools
    thegraphPrompt(server);

    // Register Hasura tools
    hasuraPrompt(server);
    hasuraQueries(server, env);
    hasuraQuery(server, env);
    hasuraMutation(server, env);
    hasuraMutations(server, env);

    // Register resources
    registerBlockchainConcepts(server);

    // Register prompts and resources tools
    registerPromptsTools(server, env);
    registerResourcesTools(server, env);

    // Register usage prompts
    platformToolsUsagePrompt(server);
    promptsResourcesToolsUsagePrompt(server);

    // Register Platform tools
    // Workspace tools
    platformWorkspaceList(server, env, pat);
    platformWorkspaceRead(server, env, pat);

    // Application tools
    platformApplicationList(server, env, pat);
    platformApplicationRead(server, env, pat);

    // Blockchain Network tools
    platformBlockchainNetworkList(server, env, pat);
    platformBlockchainNetworkRead(server, env, pat);
    platformBlockchainNetworkCreate(server, env, pat);
    platformBlockchainNetworkRestart(server, env, pat);

    // Blockchain Node tools
    platformBlockchainNodeList(server, env, pat);
    platformBlockchainNodeRead(server, env, pat);
    platformBlockchainNodeCreate(server, env, pat);
    platformBlockchainNodeRestart(server, env, pat);

    // Load Balancer tools
    platformLoadBalancerList(server, env, pat);
    platformLoadBalancerRead(server, env, pat);
    platformLoadBalancerCreate(server, env, pat);
    platformLoadBalancerRestart(server, env, pat);

    // Middleware tools
    platformMiddlewareList(server, env, pat);
    platformMiddlewareRead(server, env, pat);
    platformMiddlewareCreate(server, env, pat);
    platformMiddlewareRestart(server, env, pat);

    // Integration Tool tools
    platformIntegrationToolList(server, env, pat);
    platformIntegrationToolRead(server, env, pat);
    platformIntegrationToolCreate(server, env, pat);
    platformIntegrationToolRestart(server, env, pat);

    // Storage tools
    platformStorageList(server, env, pat);
    platformStorageRead(server, env, pat);
    platformStorageCreate(server, env, pat);
    platformStorageRestart(server, env, pat);

    // Private Key tools
    platformPrivateKeyList(server, env, pat);
    platformPrivateKeyRead(server, env, pat);
    platformPrivateKeyCreate(server, env, pat);
    platformPrivateKeyRestart(server, env, pat);

    // Insights tools
    platformInsightsList(server, env, pat);
    platformInsightsRead(server, env, pat);
    platformInsightsCreate(server, env, pat);
    platformInsightsRestart(server, env, pat);

    // Custom Deployment tools
    platformCustomDeploymentList(server, env, pat);
    platformCustomDeploymentRead(server, env, pat);
    platformCustomDeploymentCreate(server, env, pat);
    platformCustomDeploymentRestart(server, env, pat);
    platformCustomDeploymentEdit(server, env, pat);

    // Start the server
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    console.error("Error starting MCP server:", error);
    process.exit(1);
  }
}

// Start the application
await main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
