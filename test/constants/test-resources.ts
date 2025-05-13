import { isLocalEnv } from "../utils/is-local-env";

export const WORKSPACE_NAME = "SDK Demo App Workspace";
export const APPLICATION_NAME = "SDK Demo App";
export const NETWORK_NAME = "SDK Demo Network";
export const NODE_NAME = "SDK Demo Node";
export const NODE_NAME_2_WITH_PK = "SDK Demo Node 2 (with activated PK)";
export const NODE_NAME_3_WITHOUT_PK = "SDK Demo Node 3 (without activated PK)";
export const LOAD_BALANCER_NAME = "SDK Demo Load Balancer";

export const HD_PRIVATE_KEY_NAME = "SDK Demo HD Private Key (Meta-Transactions)";
export const PRIVATE_KEY_NODE_2_NAME = "SDK Demo Private Key Node 2";
export const PRIVATE_KEY_SMART_CONTRACTS_NAMES = [
  "SDK Demo Private Key Smart Contracts Deployment 1",
  "SDK Demo Private Key Smart Contracts Deployment 2",
  "SDK Demo Private Key Smart Contracts Deployment 3",
] as const;
export const RELAYER_PRIVATE_KEY_NAME = "SDK Demo Relayer Key";
export const MINIO_NAME = "SDK Demo MinIO";
export const IPFS_NAME = "SDK Demo IPFS";
export const GRAPH_NAME = "SDK Demo Graph";
export const PORTAL_NAME = "SDK Demo Portal";
export const HASURA_NAME = "SDK Demo Hasura";
export const BLOCKSCOUT_NAME = "SDK Demo Blockscout";
export const AAT_NAME = "SDK Demo Application Access Token";

export const CLUSTER_PROVIDER = isLocalEnv() ? "local" : "gke";
export const CLUSTER_REGION = isLocalEnv() ? "orbstack" : "europe";
