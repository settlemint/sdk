/**
 * This module provides the main functionality for creating and interacting with the SettleMint client.
 * It includes functions for creating the client and exporting various types used throughout the application.
 */

import { type SettleMintClientOptions, SettleMintClientOptionsSchema, validate } from "@/helpers/schemas";
import { GraphQLClient } from "graphql-request";
import { blockchainNetworkList, blockchainNetworkRead } from "./fetchers/blockchain-network";
import { blockchainNodeList, blockchainNodeRead } from "./fetchers/blockchain-node";
import { customdeploymentList, customdeploymentRead } from "./fetchers/custom-deployment";
import { insightsList, insightsRead } from "./fetchers/insights";
import { integrationToolList, integrationToolRead } from "./fetchers/integration-tool";
import { middlewareList, middlewareRead } from "./fetchers/middleware";
import { privateKeyList, privatekeyRead } from "./fetchers/private-key";
import { storageList, storageRead } from "./fetchers/storage";
import { workspaceList, workspaceRead } from "./fetchers/workspace";

// Ensure this code only runs on the server
if (typeof window !== "undefined") {
  throw new Error(
    "SettleMint client can only be used on the server as including it in the browser will expose your access token.",
  );
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
export function createSettleMintClient(options: SettleMintClientOptions) {
  const validatedOptions = validate(SettleMintClientOptionsSchema, options);

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

export type { BlockchainNetwork } from "./fetchers/blockchain-network";
export type { BlockchainNode } from "./fetchers/blockchain-node";
export type { CustomDeployment } from "./fetchers/custom-deployment";
export type { Insights } from "./fetchers/insights";
export type { IntegrationTool } from "./fetchers/integration-tool";
export type { Middleware } from "./fetchers/middleware";
export type { PrivateKey } from "./fetchers/private-key";
export type { Storage } from "./fetchers/storage";
export type { Application, Workspace } from "./fetchers/workspace";
