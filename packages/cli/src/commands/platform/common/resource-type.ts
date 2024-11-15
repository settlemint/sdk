import type { SettlemintClient } from "@settlemint/sdk-js";
export type ResourceType = "application" | "workspace" | "blockchain network" | "custom deployment";

export const SETTLEMINT_CLIENT_MAP: Record<ResourceType, keyof SettlemintClient> = {
  application: "application",
  workspace: "workspace",
  "blockchain network": "blockchainNetwork",
  "custom deployment": "customDeployment",
};
