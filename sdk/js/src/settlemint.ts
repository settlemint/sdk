import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { type Id, validate } from "@settlemint/sdk-utils/validation";
import { GraphQLClient } from "graphql-request";
import {
  type CreateApplicationAccessTokenArgs,
  applicationAccessTokenCreate,
} from "./graphql/application-access-tokens.js";
import {
  type Application,
  type CreateApplicationArgs,
  applicationCreate,
  applicationDelete,
  applicationList,
  applicationRead,
} from "./graphql/application.js";
import {
  type BlockchainNetwork,
  type CreateBlockchainNetworkArgs,
  blockchainNetworkCreate,
  blockchainNetworkDelete,
  blockchainNetworkList,
  blockchainNetworkRead,
  blockchainNetworkRestart,
} from "./graphql/blockchain-network.js";
import {
  type BlockchainNode,
  type CreateBlockchainNodeArgs,
  blockchainNodeCreate,
  blockchainNodeList,
  blockchainNodeRead,
  blockchainNodeRestart,
} from "./graphql/blockchain-node.js";
import {
  type CreateCustomDeploymentArgs,
  type CustomDeployment,
  customDeploymentRestart,
  customdeploymentCreate,
  customdeploymentList,
  customdeploymentRead,
  customdeploymentUpdate,
} from "./graphql/custom-deployment.js";
import { getEnv } from "./graphql/foundry.js";
import {
  type CreateInsightsArgs,
  type Insights,
  insightsCreate,
  insightsList,
  insightsRead,
  insightsRestart,
} from "./graphql/insights.js";
import {
  type CreateIntegrationToolArgs,
  type IntegrationTool,
  integrationToolCreate,
  integrationToolList,
  integrationToolRead,
  integrationToolRestart,
} from "./graphql/integration-tool.js";
import {
  type CreateMiddlewareArgs,
  type Middleware,
  middlewareCreate,
  middlewareList,
  middlewareRead,
  middlewareRestart,
} from "./graphql/middleware.js";
import {
  type CreatePrivateKeyArgs,
  type PrivateKey,
  privateKeyCreate,
  privateKeyList,
  privateKeyRestart,
  privatekeyRead,
} from "./graphql/private-key.js";
import {
  type CreateStorageArgs,
  type Storage,
  storageCreate,
  storageList,
  storageRead,
  storageRestart,
} from "./graphql/storage.js";
import {
  type CreateWorkspaceArgs,
  type Workspace,
  workspaceAddCredits,
  workspaceCreate,
  workspaceDelete,
  workspaceList,
  workspaceRead,
} from "./graphql/workspace.js";
import { type ClientOptions, ClientOptionsSchema } from "./helpers/client-options.schema.js";

/**
 * Client interface for interacting with the SettleMint platform.
 */
export interface SettlemintClient {
  workspace: {
    list: () => Promise<Workspace[]>;
    read: (workspaceUniqueName: string) => Promise<Workspace>;
    create: (args: CreateWorkspaceArgs) => Promise<Workspace>;
    delete: (workspaceUniqueName: string) => Promise<Workspace>;
    addCredits: (workspaceId: Id, amount: number) => Promise<boolean>;
  };
  application: {
    list: (workspaceUniqueName: string) => Promise<Application[]>;
    read: (applicationUniqueName: string) => Promise<Application>;
    create: (args: CreateApplicationArgs) => Promise<Application>;
    delete: (applicationId: Id) => Promise<Application>;
  };
  blockchainNetwork: {
    list: (applicationUniqueName: string) => Promise<BlockchainNetwork[]>;
    read: (blockchainNetworkUniqueName: string) => Promise<BlockchainNetwork>;
    create: (args: CreateBlockchainNetworkArgs) => Promise<BlockchainNetwork>;
    delete: (networkUniqueName: string) => Promise<BlockchainNetwork>;
    restart: (networkUniqueName: string) => Promise<BlockchainNetwork>;
  };
  blockchainNode: {
    list: (applicationUniqueName: string) => Promise<BlockchainNode[]>;
    read: (blockchainNodeUniqueName: string) => Promise<BlockchainNode>;
    create: (args: CreateBlockchainNodeArgs) => Promise<BlockchainNode>;
    restart: (nodeUniqueName: string) => Promise<BlockchainNode>;
  };
  middleware: {
    list: (applicationUniqueName: string) => Promise<Middleware[]>;
    read: (middlewareUniqueName: string) => Promise<Middleware>;
    create: (args: CreateMiddlewareArgs) => Promise<Middleware>;
    restart: (middlewareUniqueName: string) => Promise<Middleware>;
  };
  integrationTool: {
    list: (applicationUniqueName: string) => Promise<IntegrationTool[]>;
    read: (integrationToolUniqueName: string) => Promise<IntegrationTool>;
    create: (args: CreateIntegrationToolArgs) => Promise<IntegrationTool>;
    restart: (integrationToolUniqueName: string) => Promise<IntegrationTool>;
  };
  storage: {
    list: (applicationUniqueName: string) => Promise<Storage[]>;
    read: (storageUniqueName: string) => Promise<Storage>;
    create: (args: CreateStorageArgs) => Promise<Storage>;
    restart: (storageUniqueName: string) => Promise<Storage>;
  };
  privateKey: {
    list: (applicationUniqueName: string) => Promise<PrivateKey[]>;
    read: (privateKeyUniqueName: string) => Promise<PrivateKey>;
    create: (args: CreatePrivateKeyArgs) => Promise<PrivateKey>;
    restart: (privateKeyUniqueName: string) => Promise<PrivateKey>;
  };
  insights: {
    list: (applicationUniqueName: string) => Promise<Insights[]>;
    read: (insightsUniqueName: string) => Promise<Insights>;
    create: (args: CreateInsightsArgs) => Promise<Insights>;
    restart: (insightsUniqueName: string) => Promise<Insights>;
  };
  customDeployment: {
    list: (applicationUniqueName: string) => Promise<CustomDeployment[]>;
    read: (customDeploymentUniqueName: string) => Promise<CustomDeployment>;
    create: (args: CreateCustomDeploymentArgs) => Promise<CustomDeployment>;
    update: (customDeploymentUniqueName: string, imageTag: string) => Promise<CustomDeployment>;
    restart: (customDeploymentUniqueName: string) => Promise<CustomDeployment>;
  };
  foundry: {
    env: (blockchainNodeUniqueName: string) => Promise<Record<string, string>>;
  };
  applicationAccessToken: {
    create: (args: CreateApplicationAccessTokenArgs) => Promise<string>;
  };
}

/**
 * Creates a SettleMint client with the provided options. The client provides methods to interact with
 * various SettleMint resources like workspaces, applications, blockchain networks, blockchain nodes, middleware,
 * integration tools, storage, private keys, insights and custom deployments.
 *
 * @param {ClientOptions} options - Configuration options for the client including access token and instance URL
 * @returns {SettlemintClient} A SettleMint client object with resource-specific methods
 * @throws {Error} If options are invalid or if called in browser environment
 * @throws {ValidationError} If provided options fail schema validation
 *
 * @example
 * import { createSettleMintClient } from '@settlemint/sdk-js';
 *
 * const client = createSettleMintClient({
 *   accessToken: 'your_access_token',
 *   instance: 'https://console.settlemint.com'
 * });
 *
 * // List workspaces
 * const workspaces = await client.workspace.list();
 *
 * // Read a specific workspace
 * const workspace = await client.workspace.read('workspace-unique-name');
 */
export function createSettleMintClient(options: ClientOptions): SettlemintClient {
  ensureServer();

  const validatedOptions = validate(ClientOptionsSchema, options);

  const baseUrl = new URL(validatedOptions.instance).toString().replace(/\/$/, "");
  const gqlClient = new GraphQLClient(`${baseUrl}/api/graphql`, {
    headers: {
      "x-auth-token": validatedOptions.accessToken,
    },
    fetch: async (input: URL | RequestInfo, init?: RequestInit) => {
      const maxRetries = 3;
      const retryDelay = 1_000;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await fetch(input, init);
          if (response.ok) {
            return response;
          }
          // Only retry on 5xx server errors, 429 rate limit, timeout, and network errors
          if (response.status < 500 && response.status !== 429 && response.status !== 408 && response.status !== 0) {
            return response;
          }
          if (attempt === maxRetries) {
            return response;
          }
        } catch (error) {
          if (attempt === maxRetries) {
            throw error;
          }
        }
        // Exponential backoff with jitter
        await new Promise((resolve) => setTimeout(resolve, retryDelay * 2 ** (attempt - 1) * (0.5 + Math.random())));
      }
      throw new Error("Max retries exceeded");
    },
  });

  return {
    workspace: {
      list: workspaceList(gqlClient),
      read: workspaceRead(gqlClient),
      create: workspaceCreate(gqlClient),
      delete: workspaceDelete(gqlClient),
      addCredits: workspaceAddCredits(gqlClient),
    },
    application: {
      list: applicationList(gqlClient),
      read: applicationRead(gqlClient),
      create: applicationCreate(gqlClient),
      delete: applicationDelete(gqlClient),
    },
    blockchainNetwork: {
      list: blockchainNetworkList(gqlClient),
      read: blockchainNetworkRead(gqlClient),
      create: blockchainNetworkCreate(gqlClient),
      delete: blockchainNetworkDelete(gqlClient),
      restart: blockchainNetworkRestart(gqlClient),
    },
    blockchainNode: {
      list: blockchainNodeList(gqlClient),
      read: blockchainNodeRead(gqlClient),
      create: blockchainNodeCreate(gqlClient),
      restart: blockchainNodeRestart(gqlClient),
    },
    middleware: {
      list: middlewareList(gqlClient),
      read: middlewareRead(gqlClient),
      create: middlewareCreate(gqlClient),
      restart: middlewareRestart(gqlClient),
    },
    integrationTool: {
      list: integrationToolList(gqlClient),
      read: integrationToolRead(gqlClient),
      create: integrationToolCreate(gqlClient),
      restart: integrationToolRestart(gqlClient),
    },
    storage: {
      list: storageList(gqlClient),
      read: storageRead(gqlClient),
      create: storageCreate(gqlClient),
      restart: storageRestart(gqlClient),
    },
    privateKey: {
      list: privateKeyList(gqlClient),
      read: privatekeyRead(gqlClient),
      create: privateKeyCreate(gqlClient),
      restart: privateKeyRestart(gqlClient),
    },
    insights: {
      list: insightsList(gqlClient),
      read: insightsRead(gqlClient),
      create: insightsCreate(gqlClient),
      restart: insightsRestart(gqlClient),
    },
    customDeployment: {
      list: customdeploymentList(gqlClient),
      read: customdeploymentRead(gqlClient),
      create: customdeploymentCreate(gqlClient),
      update: customdeploymentUpdate(gqlClient),
      restart: customDeploymentRestart(gqlClient),
    },
    foundry: {
      env: getEnv(gqlClient),
    },
    applicationAccessToken: {
      create: applicationAccessTokenCreate(gqlClient),
    },
  };
}

export type { Application } from "./graphql/application.js";
export type { BlockchainNetwork } from "./graphql/blockchain-network.js";
export type { BlockchainNode } from "./graphql/blockchain-node.js";
export type { CustomDeployment } from "./graphql/custom-deployment.js";
export type { Insights } from "./graphql/insights.js";
export type { IntegrationTool } from "./graphql/integration-tool.js";
export type { Middleware } from "./graphql/middleware.js";
export type { PrivateKey } from "./graphql/private-key.js";
export type { Storage } from "./graphql/storage.js";
export type { Workspace } from "./graphql/workspace.js";
