import { isLocalEnv } from "../utils/is-local-env";

export const WORKSPACE_NAME = "Starter Kit Demo Workspace";
export const APPLICATION_NAME = "Starter Kit App";
export const NETWORK_NAME = "Starter Kit Network";
export const NODE_NAME = "Starter Kit Node";
export const PRIVATE_KEY_NAME = "Starter Kit Private Key";
export const PRIVATE_KEY_SMART_CONTRACTS_NAME = "Starter Kit Private Key Smart Contracts";
export const SMART_CONTRACT_SET_NAME = "Starter Kit Smart Contract Set";
export const IPFS_NAME = "Starter Kit IPFS";
export const GRAPH_NAME = "Starter Kit Graph";
export const PORTAL_NAME = "Starter Kit Portal";
export const HASURA_NAME = "Starter Kit Hasura";
export const BLOCKSCOUT_NAME = "Starter Kit Blockscout";
export const AAT_NAME = "Starter Kit Application Access Token";

export const CLUSTER_PROVIDER = isLocalEnv() ? "local" : "gke";
export const CLUSTER_REGION = isLocalEnv() ? "orbstack" : "europe";
