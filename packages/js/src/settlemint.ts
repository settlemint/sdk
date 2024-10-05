/**
 * This module provides the main functionality for creating and interacting with the SettleMint client.
 * It includes functions for creating the client and exporting various types used throughout the application.
 */

import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { validate } from "@settlemint/sdk-utils/validation";
import { GraphQLClient } from "graphql-request";
import { blockchainNetworkList, blockchainNetworkRead } from "./fetchers/blockchain-network.js";
import { blockchainNodeList, blockchainNodeRead } from "./fetchers/blockchain-node.js";
import { customdeploymentList, customdeploymentRead } from "./fetchers/custom-deployment.js";
import { insightsList, insightsRead } from "./fetchers/insights.js";
import { integrationToolList, integrationToolRead } from "./fetchers/integration-tool.js";
import { middlewareList, middlewareRead } from "./fetchers/middleware.js";
import { privateKeyList, privatekeyRead } from "./fetchers/private-key.js";
import { storageList, storageRead } from "./fetchers/storage.js";
import { workspaceList, workspaceRead } from "./fetchers/workspace.js";
import { type ClientOptions, ClientOptionsSchema } from "./helpers/client-options.schema.js";

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
export function createSettleMintClient(options: ClientOptions) {
  ensureServer();

  const validatedOptions = validate(ClientOptionsSchema, options);

  const gqlClient = new GraphQLClient(`${validatedOptions.instance}/api/graphql`, {
    headers: {
      "x-auth-token": validatedOptions.accessToken,
    },
  });

  return {
    workspace: {
      list: workspaceList(gqlClient, options),
      read: workspaceRead(gqlClient, options),
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
    },
  };
}

export type { BlockchainNetwork } from "./fetchers/blockchain-network.js";
export type { BlockchainNode } from "./fetchers/blockchain-node.js";
export type { CustomDeployment } from "./fetchers/custom-deployment.js";
export type { Insights } from "./fetchers/insights.js";
export type { IntegrationTool } from "./fetchers/integration-tool.js";
export type { Middleware } from "./fetchers/middleware.js";
export type { PrivateKey } from "./fetchers/private-key.js";
export type { Storage } from "./fetchers/storage.js";
export type { Application, Workspace } from "./fetchers/workspace.js";
