import type { SettlemintClient } from "@settlemint/sdk-js";
export type ResourceType =
  | "application"
  | "workspace"
  | "blockchain network"
  | "blockchain node"
  | "custom deployment"
  | "private key"
  | "middleware"
  | "integration tool"
  | "storage"
  | "insights"
  | "application access token";

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

export const LABELS_MAP: Record<ResourceType, { singular: string; plural: string }> = {
  application: { singular: "application", plural: "applications" },
  workspace: { singular: "workspace", plural: "workspaces" },
  "blockchain network": { singular: "blockchain network", plural: "blockchain networks" },
  "blockchain node": { singular: "blockchain node", plural: "blockchain nodes" },
  "custom deployment": { singular: "custom deployment", plural: "custom deployments" },
  "private key": { singular: "private key", plural: "private keys" },
  middleware: { singular: "middleware", plural: "middlewares" },
  "integration tool": { singular: "integration tool", plural: "integration tools" },
  storage: { singular: "storage", plural: "storage" },
  insights: { singular: "insight", plural: "insights" },
  "application access token": { singular: "application access token", plural: "application access tokens" },
};
