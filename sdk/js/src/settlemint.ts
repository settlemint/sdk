import { fetchWithRetry } from "@settlemint/sdk-utils/http";
import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { type Id, validate } from "@settlemint/sdk-utils/validation";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";
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
  type MiddlewareWithSubgraphs,
  graphMiddlewareSubgraphs,
  middlewareCreate,
  middlewareList,
  middlewareRead,
  middlewareRestart,
} from "./graphql/middleware.js";
import { type PlatformConfig, getPlatformConfig } from "./graphql/platform.js";
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
import { type PincodeVerificationResponseArgs, getPincodeVerificationResponse } from "./pincode-verification.js";

/**
 * Options for the Settlemint client.
 */
export interface SettlemintClientOptions extends ClientOptions {
  /** Whether to allow anonymous access (no access token required) */
  anonymous?: boolean;
}

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
    graphSubgraphs: (middlewareUniqueName: string, noCache?: boolean) => Promise<MiddlewareWithSubgraphs>;
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
  platform: {
    config: () => Promise<PlatformConfig>;
  };
  wallet: {
    pincodeVerificationResponse: (
      args: Omit<PincodeVerificationResponseArgs, "instance" | "accessToken">,
    ) => Promise<string>;
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
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
 *   instance: process.env.SETTLEMINT_INSTANCE,
 * });
 *
 * // List workspaces
 * const workspaces = await client.workspace.list();
 *
 * // Read a specific workspace
 * const workspace = await client.workspace.read('workspace-unique-name');
 */
export function createSettleMintClient(options: SettlemintClientOptions): SettlemintClient {
  ensureServer();

  const validatedOptions = options.anonymous
    ? validate(
        z.object({
          ...ClientOptionsSchema.shape,
          accessToken: z.literal(""),
        }),
        options,
      )
    : validate(ClientOptionsSchema, options);

  const baseUrl = new URL(validatedOptions.instance).toString().replace(/\/$/, "");
  const gqlClient = new GraphQLClient(`${baseUrl}/api/graphql`, {
    headers: {
      "x-auth-token": validatedOptions.accessToken ?? "",
    },
    fetch: async (input, init) => {
      const response = await fetchWithRetry(input, init);
      // Parse and handle GraphQL errors from response
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json") || contentType?.includes("application/graphql-response+json")) {
        const data: { errors: { message: string }[] } = await response.clone().json();
        if (data.errors?.length > 0) {
          const errorMessages = data.errors.map((e) => e.message).join(", ");
          throw new Error(errorMessages);
        }
      }
      return response;
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
      graphSubgraphs: graphMiddlewareSubgraphs(gqlClient),
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
    platform: {
      config: getPlatformConfig(gqlClient),
    },
    wallet: {
      pincodeVerificationResponse: (args) =>
        getPincodeVerificationResponse({
          ...args,
          instance: validatedOptions.instance,
          accessToken: validatedOptions.accessToken,
        }),
    },
  };
}

export type {
  Application,
  CreateApplicationArgs,
  CreateApplicationAccessTokenArgs,
  CreateBlockchainNetworkArgs,
  CreateBlockchainNodeArgs,
  CreateCustomDeploymentArgs,
  CreateInsightsArgs,
  CreateIntegrationToolArgs,
  CreateMiddlewareArgs,
  CreatePrivateKeyArgs,
  CreateStorageArgs,
  CreateWorkspaceArgs,
  CustomDeployment,
  Insights,
  IntegrationTool,
  Middleware,
  MiddlewareWithSubgraphs,
  PlatformConfig,
  PrivateKey,
  Storage,
  Workspace,
};

export {
  applicationAccessTokenCreate,
  applicationCreate,
  applicationDelete,
  applicationList,
  applicationRead,
  blockchainNetworkCreate,
  blockchainNetworkDelete,
  blockchainNetworkList,
  blockchainNetworkRead,
  blockchainNetworkRestart,
  blockchainNodeCreate,
  blockchainNodeList,
  blockchainNodeRead,
  blockchainNodeRestart,
  customDeploymentRestart,
  customdeploymentCreate,
  customdeploymentList,
  customdeploymentRead,
  customdeploymentUpdate,
  getEnv,
  getPlatformConfig,
  insightsCreate,
  insightsList,
  insightsRead,
  integrationToolCreate,
  integrationToolList,
  integrationToolRead,
  integrationToolRestart,
  middlewareCreate,
  middlewareList,
  middlewareRead,
  middlewareRestart,
  privateKeyCreate,
  privateKeyList,
  privateKeyRestart,
  privatekeyRead,
  storageCreate,
  storageList,
  storageRead,
  storageRestart,
  workspaceAddCredits,
  workspaceCreate,
  workspaceDelete,
  workspaceList,
  workspaceRead,
};
