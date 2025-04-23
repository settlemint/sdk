import { isLocalEnv } from "../utils/is-local-env";

export const WORKSPACE_NAME = "SDK Demo App Workspace";
export const APPLICATION_NAME = "SDK Demo App";
export const NETWORK_NAME = "SDK Demo Network";
export const NODE_NAME = "SDK Demo Node";
export const NODE_NAME_2_WITH_PK = "SDK Demo Node 2 (with activated PK)";
export const NODE_NAME_3_WITHOUT_PK = "SDK Demo Node 3 (without activated PK)";
export const LOAD_BALANCER_NAME = "SDK Demo Load Balancer";

export const PRIVATE_KEY_NAME = "SDK Demo Private Key";
export const PRIVATE_KEY_2_NAME = "SDK Demo Private Key 2";
export const PRIVATE_KEY_SMART_CONTRACTS_NAME = "SDK Demo Private Key Smart Contracts";
export const MINIO_NAME = "SDK Demo MinIO";
export const IPFS_NAME = "SDK Demo IPFS";
export const GRAPH_NAME = "SDK Demo Graph";
export const PORTAL_NAME = "SDK Demo Portal";
export const HASURA_NAME = "SDK Demo Hasura";
export const BLOCKSCOUT_NAME = "SDK Demo Blockscout";
export const AAT_NAME = "SDK Demo Application Access Token";

export const CLUSTER_PROVIDER = isLocalEnv() ? "local" : "gke";
export const CLUSTER_REGION = isLocalEnv() ? "orbstack" : "europe";
