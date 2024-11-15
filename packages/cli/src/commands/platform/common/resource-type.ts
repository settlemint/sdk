import type { SettlemintClient } from "@settlemint/sdk-js";
export type ResourceType = "application" | "workspace" | "blockchain network" | "besu QBFT" | "custom deployment";

export const SETTLEMINT_CLIENT_MAP: Record<ResourceType, keyof SettlemintClient> = {
  application: "application",
  workspace: "workspace",
  "blockchain network": "blockchainNetwork",
  "besu QBFT": "blockchainNetwork",
  "custom deployment": "customDeployment",
};
