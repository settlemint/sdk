import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Registers a prompt with detailed documentation about platform tools usage
 *
 * @param server - The MCP server instance
 *
 * @example
 * import { platformToolsUsagePrompt } from "@settlemint/sdk-mcp/prompts/tool-usage/platform-tools";
 *
 * platformToolsUsagePrompt(server);
 */
export const platformToolsUsagePrompt = (server: McpServer) => {
  server.prompt("platform-tools-usage", () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `# SettleMint Platform Tools Usage Guide

## Overview
The SettleMint SDK provides a comprehensive set of tools for interacting with the SettleMint platform. This guide explains when and how to use each tool category effectively.

## Tool Categories

### Workspace Tools
Workspaces are the top-level organizational units in the SettleMint platform.

**When to use:**
- When creating a new project environment
- When managing resources across multiple applications
- When handling billing and credits

**Available tools:**
- \`platform-workspace-list\`: Lists all workspaces
- \`platform-workspace-read\`: Gets details of a specific workspace
- \`platform-workspace-create\`: Creates a new workspace
- \`platform-workspace-delete\`: Deletes an existing workspace
- \`platform-workspace-add-credits\`: Adds credits to a workspace

**Example workflow:**
\`\`\`typescript
// 1. List available workspaces
const workspaces = await platformWorkspaceList();

// 2. Read details of a specific workspace
const workspace = await platformWorkspaceRead({
  workspaceUniqueName: "my-workspace"
});

// 3. Create a new workspace
const newWorkspace = await platformWorkspaceCreate({
  name: "New Project Workspace"
});
\`\`\`

### Application Tools
Applications are containers for blockchain networks and integration tools within a workspace.

**When to use:**
- When creating a new application within a workspace
- When managing application-specific resources
- When setting up application access tokens

**Available tools:**
- \`platform-application-list\`: Lists all applications in a workspace
- \`platform-application-read\`: Gets details of a specific application
- \`platform-application-create\`: Creates a new application
- \`platform-application-delete\`: Deletes an existing application

**Example workflow:**
\`\`\`typescript
// 1. List applications in a workspace
const applications = await platformApplicationList({
  workspaceUniqueName: "my-workspace"
});

// 2. Create a new application
const newApplication = await platformApplicationCreate({
  name: "Supply Chain App",
  workspaceUniqueName: "my-workspace"
});

// 3. Generate an access token for the application
const accessToken = await platformApplicationAccessTokenCreate({
  applicationUniqueName: "my-workspace-supply-chain-app"
});
\`\`\`

### Blockchain Network Tools
Blockchain networks are the core infrastructure components for blockchain applications.

**When to use:**
- When deploying a new blockchain network
- When configuring network parameters
- When managing network nodes

**Available tools:**
- \`platform-blockchain-network-list\`: Lists all blockchain networks
- \`platform-blockchain-network-read\`: Gets details of a specific network
- \`platform-blockchain-network-create\`: Creates a new blockchain network
- \`platform-blockchain-network-delete\`: Deletes an existing network
- \`platform-blockchain-network-restart\`: Restarts a blockchain network

**Example workflow:**
\`\`\`typescript
// 1. Create a new Ethereum network
const network = await platformBlockchainNetworkCreate({
  name: "Supply Chain Network",
  applicationUniqueName: "my-workspace-supply-chain-app",
  type: "ETHEREUM",
  consensus: "POA",
  provider: "aws",
  region: "eu-west-1"
});

// 2. Read network details
const networkDetails = await platformBlockchainNetworkRead({
  blockchainNetworkUniqueName: network.uniqueName
});
\`\`\`

### Integration Tool Tools
Integration tools connect blockchain networks with external systems and databases.

**When to use:**
- When setting up data indexing with Hasura
- When connecting to external data sources with Chainlink
- When creating low-code integrations

**Available tools:**
- \`platform-integration-tool-list\`: Lists all integration tools
- \`platform-integration-tool-read\`: Gets details of a specific integration tool
- \`platform-integration-tool-create\`: Creates a new integration tool
- \`platform-integration-tool-restart\`: Restarts an integration tool

**Example workflow:**
\`\`\`typescript
// Create a Hasura integration tool
const hasura = await platformIntegrationToolCreate({
  applicationUniqueName: "my-workspace-supply-chain-app",
  name: "Supply Chain Data",
  type: "DEDICATED",
  provider: "aws",
  region: "eu-west-1",
  integrationType: "HA_HASURA"
});
\`\`\`

## Best Practices

### Tool Selection
1. **Start with listing tools** to understand available resources
2. **Read before modifying** to understand current state
3. **Use create tools** with all required parameters
4. **Consider resource dependencies** (e.g., create workspace before application)

### Error Handling
1. **Check for existence** before creating resources
2. **Validate unique names** follow the required format
3. **Handle deployment delays** by using restart tools when needed

### Resource Management
1. **Delete unused resources** to free up credits
2. **Monitor resource usage** with platform config tools
3. **Use appropriate resource types** based on workload requirements`,
        },
      },
    ],
  }));
};
