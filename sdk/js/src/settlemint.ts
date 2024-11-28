import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { type Id, validate } from "@settlemint/sdk-utils/validation";
import { GraphQLClient } from "graphql-request";
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
} from "./graphql/blockchain-network.js";
import {
  type BlockchainNode,
  type CreateBlockchainNodeArgs,
  blockchainNodeCreate,
  blockchainNodeList,
  blockchainNodeRead,
} from "./graphql/blockchain-node.js";
import {
  type CreateCustomDeploymentArgs,
  type CustomDeployment,
  customdeploymentCreate,
  customdeploymentList,
  customdeploymentRead,
  customdeploymentUpdate,
} from "./graphql/custom-deployment.js";
import {
  type CreateInsightsArgs,
  type Insights,
  insightsCreate,
  insightsList,
  insightsRead,
} from "./graphql/insights.js";
import {
  type CreateIntegrationToolArgs,
  type IntegrationTool,
  integrationToolCreate,
  integrationToolList,
  integrationToolRead,
} from "./graphql/integration-tool.js";
import {
  type CreateMiddlewareArgs,
  type Middleware,
  middlewareCreate,
  middlewareList,
  middlewareRead,
} from "./graphql/middleware.js";
import {
  type CreatePrivateKeyArgs,
  type PrivateKey,
  privateKeyCreate,
  privateKeyList,
  privatekeyRead,
} from "./graphql/private-key.js";
import {
  type CreateSmartContractSetArgs,
  type SmartContractSet,
  smartContractSetCreate,
  smartContractSetList,
  smartContractSetRead,
} from "./graphql/smart-contract-set.js";
import { type CreateStorageArgs, type Storage, storageCreate, storageList, storageRead } from "./graphql/storage.js";
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

export interface SettlemintClient {
  workspace: {
    list: () => Promise<Workspace[]>;
    read: (workspaceId: Id) => Promise<Workspace>;
    create: (args: CreateWorkspaceArgs) => Promise<Workspace>;
    delete: (workspaceId: Id) => Promise<Workspace>;
    addCredits: (workspaceId: Id, amount: number) => Promise<boolean>;
  };
  application: {
    list: (workspaceId: Id) => Promise<Application[]>;
    read: (applicationId: Id) => Promise<Application>;
    create: (args: CreateApplicationArgs) => Promise<Application>;
    delete: (applicationId: Id) => Promise<Application>;
  };
  blockchainNetwork: {
    list: (applicationId: Id) => Promise<BlockchainNetwork[]>;
    read: (blockchainNetworkId: Id) => Promise<BlockchainNetwork>;
    create: (args: CreateBlockchainNetworkArgs) => Promise<BlockchainNetwork>;
    delete: (networkId: Id) => Promise<BlockchainNetwork>;
  };
  blockchainNode: {
    list: (applicationId: Id) => Promise<BlockchainNode[]>;
    read: (blockchainNodeId: Id) => Promise<BlockchainNode>;
    create: (args: CreateBlockchainNodeArgs) => Promise<BlockchainNode>;
  };
  middleware: {
    list: (applicationId: Id) => Promise<Middleware[]>;
    read: (middlewareId: Id) => Promise<Middleware>;
    create: (args: CreateMiddlewareArgs) => Promise<Middleware>;
  };
  integrationTool: {
    list: (applicationId: Id) => Promise<IntegrationTool[]>;
    read: (integrationToolId: Id) => Promise<IntegrationTool>;
    create: (args: CreateIntegrationToolArgs) => Promise<IntegrationTool>;
  };
  storage: {
    list: (applicationId: Id) => Promise<Storage[]>;
    read: (storageId: Id) => Promise<Storage>;
    create: (args: CreateStorageArgs) => Promise<Storage>;
  };
  privateKey: {
    list: (applicationId: Id) => Promise<PrivateKey[]>;
    read: (privateKeyId: Id) => Promise<PrivateKey>;
    create: (args: CreatePrivateKeyArgs) => Promise<PrivateKey>;
  };
  insights: {
    list: (applicationId: Id) => Promise<Insights[]>;
    read: (insightsId: Id) => Promise<Insights>;
    create: (args: CreateInsightsArgs) => Promise<Insights>;
  };
  customDeployment: {
    list: (applicationId: Id) => Promise<CustomDeployment[]>;
    read: (customDeploymentId: Id) => Promise<CustomDeployment>;
    create: (args: CreateCustomDeploymentArgs) => Promise<CustomDeployment>;
    update: (customDeploymentId: Id, imageTag: string) => Promise<CustomDeployment>;
  };
  smartContractSet: {
    list: (applicationId: Id) => Promise<SmartContractSet[]>;
    read: (smartContractSetId: Id) => Promise<SmartContractSet>;
    create: (args: CreateSmartContractSetArgs) => Promise<SmartContractSet>;
  };
}

/**
 * Creates a SettleMint client with the provided options.
 *
 * @param options - The options for creating the SettleMint client.
 * @returns An object containing various methods to interact with SettleMint resources.
 * @throws Will throw an error if the options are invalid or if called in a browser environment.
 *
 * @example
 * const client = createSettleMintClient({
 *   accessToken: 'btp_aat_xxxxxxxxxxxxxxxxxxxxxxxx',
 *   instance: 'https://console.settlemint.com'
 * });
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
      list: workspaceList(gqlClient, options),
      read: workspaceRead(gqlClient, options),
      create: workspaceCreate(gqlClient, options),
      delete: workspaceDelete(gqlClient, options),
      addCredits: workspaceAddCredits(gqlClient, options),
    },
    application: {
      list: applicationList(gqlClient, options),
      read: applicationRead(gqlClient, options),
      create: applicationCreate(gqlClient, options),
      delete: applicationDelete(gqlClient, options),
    },
    blockchainNetwork: {
      list: blockchainNetworkList(gqlClient, options),
      read: blockchainNetworkRead(gqlClient, options),
      create: blockchainNetworkCreate(gqlClient, options),
      delete: blockchainNetworkDelete(gqlClient, options),
    },
    blockchainNode: {
      list: blockchainNodeList(gqlClient, options),
      read: blockchainNodeRead(gqlClient, options),
      create: blockchainNodeCreate(gqlClient, options),
    },
    middleware: {
      list: middlewareList(gqlClient, options),
      read: middlewareRead(gqlClient, options),
      create: middlewareCreate(gqlClient, options),
    },
    integrationTool: {
      list: integrationToolList(gqlClient, options),
      read: integrationToolRead(gqlClient, options),
      create: integrationToolCreate(gqlClient, options),
    },
    storage: {
      list: storageList(gqlClient, options),
      read: storageRead(gqlClient, options),
      create: storageCreate(gqlClient, options),
    },
    privateKey: {
      list: privateKeyList(gqlClient, options),
      read: privatekeyRead(gqlClient, options),
      create: privateKeyCreate(gqlClient, options),
    },
    insights: {
      list: insightsList(gqlClient, options),
      read: insightsRead(gqlClient, options),
      create: insightsCreate(gqlClient, options),
    },
    customDeployment: {
      list: customdeploymentList(gqlClient, options),
      read: customdeploymentRead(gqlClient, options),
      create: customdeploymentCreate(gqlClient, options),
      update: customdeploymentUpdate(gqlClient, options),
    },
    smartContractSet: {
      list: smartContractSetList(gqlClient, options),
      read: smartContractSetRead(gqlClient, options),
      create: smartContractSetCreate(gqlClient, options),
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
