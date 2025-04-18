import type { SettlemintClient } from "@settlemint/sdk-js";
export type ResourceType =
  | "application"
  | "workspace"
  | "application access token"
  | "blockchain network"
  | "blockchain node"
  | "custom deployment"
  | "private key"
  | "middleware"
  | "integration tool"
  | "storage"
  | "insights";

export const SETTLEMINT_CLIENT_MAP: Record<ResourceType, keyof SettlemintClient> = {
  application: "application",
  workspace: "workspace",
  "blockchain network": "blockchainNetwork",
  "blockchain node": "blockchainNode",
  "custom deployment": "customDeployment",
  "private key": "privateKey",
  middleware: "middleware",
  "integration tool": "integrationTool",
  storage: "storage",
  insights: "insights",
  "application access token": "applicationAccessToken",
};

export const LABELS_MAP: Record<ResourceType, { singular: string; plural: string; command: string }> = {
  application: { singular: "application", plural: "applications", command: "app" },
  workspace: { singular: "workspace", plural: "workspaces", command: "workspace" },
  "blockchain network": {
    singular: "blockchain network",
    plural: "blockchain networks",
    command: "blockchain-network",
  },
  "blockchain node": { singular: "blockchain node", plural: "blockchain nodes", command: "blockchain-node" },
  "custom deployment": { singular: "custom deployment", plural: "custom deployments", command: "custom-deployment" },
  "private key": { singular: "private key", plural: "private keys", command: "private-key" },
  middleware: { singular: "middleware", plural: "middlewares", command: "middleware" },
  "integration tool": { singular: "integration tool", plural: "integration tools", command: "integration-tool" },
  storage: { singular: "storage", plural: "storage", command: "storage" },
  insights: { singular: "insight", plural: "insights", command: "insight" },
  "application access token": {
    singular: "application access token",
    plural: "application access tokens",
    command: "application-access-token",
  },
};
