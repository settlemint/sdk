import { portalQueries } from "@/tools/portal/queries";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import pkg from "../package.json";
import { hasuraPrompt } from "./prompts/hasura/hasura";
import { portalPrompt } from "./prompts/portal/portal";
import { thegraphPrompt } from "./prompts/thegraph/thegraph";
import { hasuraMutation } from "./tools/hasura/mutation";
import { hasuraMutations } from "./tools/hasura/mutations";
import { hasuraQueries } from "./tools/hasura/queries";
import { hasuraQuery } from "./tools/hasura/query";
import { platformApplicationAccessTokenCreate } from "./tools/platform/application-access-token/create.js";
import { platformApplicationCreate } from "./tools/platform/application/create.js";
import { platformApplicationDelete } from "./tools/platform/application/delete.js";
import { platformApplicationList } from "./tools/platform/application/list.js";
import { platformApplicationRead } from "./tools/platform/application/read.js";
import { platformBlockchainNetworkCreate } from "./tools/platform/blockchain-network/create.js";
import { platformBlockchainNetworkDelete } from "./tools/platform/blockchain-network/delete.js";
import { platformBlockchainNetworkList } from "./tools/platform/blockchain-network/list.js";
import { platformBlockchainNetworkRead } from "./tools/platform/blockchain-network/read.js";
import { platformBlockchainNetworkRestart } from "./tools/platform/blockchain-network/restart.js";
import { platformBlockchainNodeCreate } from "./tools/platform/blockchain-node/create.js";
import { platformBlockchainNodeList } from "./tools/platform/blockchain-node/list.js";
import { platformBlockchainNodeRead } from "./tools/platform/blockchain-node/read.js";
import { platformBlockchainNodeRestart } from "./tools/platform/blockchain-node/restart.js";
import { platformCustomDeploymentList } from "./tools/platform/custom-deployment/list.js";
import { platformCustomDeploymentRead } from "./tools/platform/custom-deployment/read.js";
import { platformFoundryEnv } from "./tools/platform/foundry/env.js";
import { platformInsightsCreate } from "./tools/platform/insights/create.js";
import { platformInsightsList } from "./tools/platform/insights/list.js";
import { platformInsightsRead } from "./tools/platform/insights/read.js";
import { platformInsightsRestart } from "./tools/platform/insights/restart.js";
import { platformIntegrationToolCreate } from "./tools/platform/integration-tool/create.js";
import { platformIntegrationToolList } from "./tools/platform/integration-tool/list.js";
import { platformIntegrationToolRead } from "./tools/platform/integration-tool/read.js";
import { platformIntegrationToolRestart } from "./tools/platform/integration-tool/restart.js";
import { platformMiddlewareCreate } from "./tools/platform/middleware/create.js";
import { platformMiddlewareGraphSubgraphs } from "./tools/platform/middleware/graph-subgraphs.js";
import { platformMiddlewareList } from "./tools/platform/middleware/list.js";
import { platformMiddlewareRead } from "./tools/platform/middleware/read.js";
import { platformMiddlewareRestart } from "./tools/platform/middleware/restart.js";
import { platformPlatformConfig } from "./tools/platform/platform/config.js";
import { platformPrivateKeyCreate } from "./tools/platform/private-key/create.js";
import { platformPrivateKeyList } from "./tools/platform/private-key/list.js";
import { platformPrivateKeyRead } from "./tools/platform/private-key/read.js";
import { platformPrivateKeyRestart } from "./tools/platform/private-key/restart.js";
import { platformStorageCreate } from "./tools/platform/storage/create.js";
import { platformStorageList } from "./tools/platform/storage/list.js";
import { platformStorageRead } from "./tools/platform/storage/read.js";
import { platformStorageRestart } from "./tools/platform/storage/restart.js";
import { platformWalletPincodeVerificationResponse } from "./tools/platform/wallet/pincode-verification-response.js";
import { platformWorkspaceAddCredits } from "./tools/platform/workspace/add-credits.js";
import { platformWorkspaceCreate } from "./tools/platform/workspace/create.js";
import { platformWorkspaceDelete } from "./tools/platform/workspace/delete.js";
import { platformWorkspaceList } from "./tools/platform/workspace/list.js";
import { platformWorkspaceRead } from "./tools/platform/workspace/read.js";

const server = new McpServer(
  {
    name: "SettleMint",
    version: pkg.version,
  },
  {
    capabilities: {
      resources: {
        portal: {
          description: "The portal resource",
        },
        thegraph: {
          description: "The Graph resource",
        },
      },
    },
  },
);

// Get the path from command line arguments (it will be the last argument)
const path = process.argv[process.argv.length - 1];
const env: Partial<DotEnv> = await loadEnv(true, false, path);

// Register Portal tools
portalPrompt(server);
portalQueries(server, env);

// Register The Graph tools
thegraphPrompt(server);

// Register Hasura tools
hasuraPrompt(server);
hasuraQueries(server, env);
hasuraQuery(server, env);
hasuraMutations(server, env);
hasuraMutation(server, env);

// Register Platform tools
// Workspace tools
platformWorkspaceList(server, env);
platformWorkspaceRead(server, env);
platformWorkspaceCreate(server, env);
platformWorkspaceDelete(server, env);
platformWorkspaceAddCredits(server, env);

// Application tools
platformApplicationList(server, env);
platformApplicationRead(server, env);
platformApplicationCreate(server, env);
platformApplicationDelete(server, env);

// Blockchain Network tools
platformBlockchainNetworkList(server, env);
platformBlockchainNetworkRead(server, env);
platformBlockchainNetworkCreate(server, env);
platformBlockchainNetworkDelete(server, env);
platformBlockchainNetworkRestart(server, env);

// Blockchain Node tools
platformBlockchainNodeList(server, env);
platformBlockchainNodeRead(server, env);
platformBlockchainNodeCreate(server, env);
platformBlockchainNodeRestart(server, env);

// Middleware tools
platformMiddlewareList(server, env);
platformMiddlewareRead(server, env);
platformMiddlewareGraphSubgraphs(server, env);
platformMiddlewareCreate(server, env);
platformMiddlewareRestart(server, env);

// Integration Tool tools
platformIntegrationToolList(server, env);
platformIntegrationToolRead(server, env);
platformIntegrationToolCreate(server, env);
platformIntegrationToolRestart(server, env);

// Storage tools
platformStorageList(server, env);
platformStorageRead(server, env);
platformStorageCreate(server, env);
platformStorageRestart(server, env);

// Private Key tools
platformPrivateKeyList(server, env);
platformPrivateKeyRead(server, env);
platformPrivateKeyCreate(server, env);
platformPrivateKeyRestart(server, env);

// Insights tools
platformInsightsList(server, env);
platformInsightsRead(server, env);
platformInsightsCreate(server, env);
platformInsightsRestart(server, env);

// Custom Deployment tools
platformCustomDeploymentList(server, env);
platformCustomDeploymentRead(server, env);

// Foundry tools
platformFoundryEnv(server, env);

// Application Access Token tools
platformApplicationAccessTokenCreate(server, env);

// Platform tools
platformPlatformConfig(server, env);

// Wallet tools
platformWalletPincodeVerificationResponse(server, env);

// Start the server with the StdioServerTransport
const transport = new StdioServerTransport();
await server.connect(transport);
