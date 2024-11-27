import type { SettlemintClient } from "@settlemint/sdk-js";
export type ResourceType =
  | "application"
  | "workspace"
  | "blockchain network"
  | "blockchain node"
  | "custom deployment"
  | "private key"
  | "smart contract set"
  | "middleware"
  | "integration tool"
  | "storage"
  | "insight";

export const SETTLEMINT_CLIENT_MAP: Record<ResourceType, keyof SettlemintClient> = {
  application: "application",
  workspace: "workspace",
  "blockchain network": "blockchainNetwork",
  "blockchain node": "blockchainNode",
  "custom deployment": "customDeployment",
  "private key": "privateKey",
  "smart contract set": "smartContractSet",
  middleware: "middleware",
  "integration tool": "integrationTool",
  storage: "storage",
  insight: "insights",
};
