import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { type Id, validate } from "@settlemint/sdk-utils/validation";
import { GraphQLClient } from "graphql-request";
import {
  type Application,
  type CreateApplicationArgs,
  applicationCreate,
  applicationDelete,
} from "./fetchers/application.js";
import { type BlockchainNetwork, blockchainNetworkList, blockchainNetworkRead } from "./fetchers/blockchain-network.js";
import { type BlockchainNode, blockchainNodeList, blockchainNodeRead } from "./fetchers/blockchain-node.js";
import {
  type CustomDeployment,
  customdeploymentList,
  customdeploymentRead,
  customdeploymentUpdate,
} from "./fetchers/custom-deployment.js";
import { type Insights, insightsList, insightsRead } from "./fetchers/insights.js";
import { type IntegrationTool, integrationToolList, integrationToolRead } from "./fetchers/integration-tool.js";
import { type Middleware, middlewareList, middlewareRead } from "./fetchers/middleware.js";
import { type PrivateKey, privateKeyList, privatekeyRead } from "./fetchers/private-key.js";
import { type Storage, storageList, storageRead } from "./fetchers/storage.js";
import {
  type CreateWorkspaceArgs,
  type Workspace,
  workspaceCreate,
  workspaceDelete,
  workspaceList,
  workspaceRead,
} from "./fetchers/workspace.js";
import { type ClientOptions, ClientOptionsSchema } from "./helpers/client-options.schema.js";

export interface SettlemintClient {
  workspace: {
    list: () => Promise<Workspace[]>;
    read: (workspaceId: Id) => Promise<Workspace>;
    create: (args: CreateWorkspaceArgs) => Promise<Workspace>;
    delete: (id: Id) => Promise<Workspace>;
  };
  application: {
    create: (args: CreateApplicationArgs) => Promise<Application>;
    delete: (id: Id) => Promise<Application>;
  };
  blockchainNetwork: {
    list: (applicationId: Id) => Promise<BlockchainNetwork[]>;
    read: (blockchainNetworkId: Id) => Promise<BlockchainNetwork>;
  };
  blockchainNode: {
    list: (applicationId: Id) => Promise<BlockchainNode[]>;
    read: (blockchainNodeId: Id) => Promise<BlockchainNode>;
  };
  middleware: {
    list: (applicationId: Id) => Promise<Middleware[]>;
    read: (middlewareId: Id) => Promise<Middleware>;
  };
  integrationTool: {
    list: (applicationId: Id) => Promise<IntegrationTool[]>;
    read: (integrationToolId: Id) => Promise<IntegrationTool>;
  };
  storage: {
    list: (applicationId: Id) => Promise<Storage[]>;
    read: (storageId: Id) => Promise<Storage>;
  };
  privateKey: {
    list: (applicationId: Id) => Promise<PrivateKey[]>;
    read: (privateKeyId: Id) => Promise<PrivateKey>;
  };
  insights: {
    list: (applicationId: Id) => Promise<Insights[]>;
    read: (insightsId: Id) => Promise<Insights>;
  };
  customDeployment: {
    list: (applicationId: Id) => Promise<CustomDeployment[]>;
    read: (customDeploymentId: Id) => Promise<CustomDeployment>;
    update: (customDeploymentId: Id, imageTag: string) => Promise<CustomDeployment>;
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
  });

  return {
    workspace: {
      list: workspaceList(gqlClient, options),
      read: workspaceRead(gqlClient, options),
      create: workspaceCreate(gqlClient, options),
      delete: workspaceDelete(gqlClient, options),
    },
    application: {
      create: applicationCreate(gqlClient, options),
      delete: applicationDelete(gqlClient, options),
    },
    blockchainNetwork: {
      list: blockchainNetworkList(gqlClient, options),
      read: blockchainNetworkRead(gqlClient, options),
    },
    blockchainNode: {
      list: blockchainNodeList(gqlClient, options),
      read: blockchainNodeRead(gqlClient, options),
    },
    middleware: {
      list: middlewareList(gqlClient, options),
      read: middlewareRead(gqlClient, options),
    },
    integrationTool: {
      list: integrationToolList(gqlClient, options),
      read: integrationToolRead(gqlClient, options),
    },
    storage: {
      list: storageList(gqlClient, options),
      read: storageRead(gqlClient, options),
    },
    privateKey: {
      list: privateKeyList(gqlClient, options),
      read: privatekeyRead(gqlClient, options),
    },
    insights: {
      list: insightsList(gqlClient, options),
      read: insightsRead(gqlClient, options),
    },
    customDeployment: {
      list: customdeploymentList(gqlClient, options),
      read: customdeploymentRead(gqlClient, options),
      update: customdeploymentUpdate(gqlClient, options),
    },
  };
}

export type { Application } from "./fetchers/application.js";
export type { BlockchainNetwork } from "./fetchers/blockchain-network.js";
export type { BlockchainNode } from "./fetchers/blockchain-node.js";
export type { CustomDeployment } from "./fetchers/custom-deployment.js";
export type { Insights } from "./fetchers/insights.js";
export type { IntegrationTool } from "./fetchers/integration-tool.js";
export type { Middleware } from "./fetchers/middleware.js";
export type { PrivateKey } from "./fetchers/private-key.js";
export type { Storage } from "./fetchers/storage.js";
export type { Workspace } from "./fetchers/workspace.js";
