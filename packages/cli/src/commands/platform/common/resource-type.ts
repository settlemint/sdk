import type { SettlemintClient } from "@settlemint/sdk-js";
export type ResourceType = "application" | "workspace" | "blockchain network" | "Besu QBFT";

export const SETTLEMINT_CLIENT_MAP: Record<ResourceType, keyof SettlemintClient> = {
  application: "application",
  workspace: "workspace",
  "blockchain network": "blockchainNetwork",
  "Besu QBFT": "blockchainNode",
};
