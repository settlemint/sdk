import { writeEnv } from "@settlemint/sdk-utils/environment";
import { spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Writes environment variables to .env files with a spinner for visual feedback.
 *
 * @param env - Partial environment variables to be written.
 * @param environment - The name of the environment (e.g., "development", "production").
 * @returns A promise that resolves when the environment variables are written.
 * @throws If there's an error writing the environment files.
 *
 * @example
 * await writeEnvSpinner(
 *   { SETTLEMINT_INSTANCE: "https://example.com", SETTLEMINT_ACCESS_TOKEN: "token123" },
 *   "development"
 * );
 */
export async function writeEnvSpinner(prod: boolean, env: Partial<DotEnv>): Promise<void> {
  return spinner({
    startMessage: "Saving .env and .env.local files",
    stopMessage: "Written .env and .env.local file",
    task: async () => {
      await writeEnv(
        prod,
        {
          SETTLEMINT_INSTANCE: env.SETTLEMINT_INSTANCE,
          SETTLEMINT_WORKSPACE: env.SETTLEMINT_WORKSPACE,
          SETTLEMINT_APPLICATION: env.SETTLEMINT_APPLICATION,
          SETTLEMINT_BLOCKCHAIN_NETWORK: env.SETTLEMINT_BLOCKCHAIN_NETWORK,
          SETTLEMINT_BLOCKCHAIN_NODE: env.SETTLEMINT_BLOCKCHAIN_NODE,
          SETTLEMINT_LOAD_BALANCER: env.SETTLEMINT_LOAD_BALANCER,
          SETTLEMINT_HASURA: env.SETTLEMINT_HASURA,
          SETTLEMINT_HASURA_ENDPOINT: env.SETTLEMINT_HASURA_ENDPOINT,
          SETTLEMINT_THEGRAPH: env.SETTLEMINT_THEGRAPH,
          SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT: env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT,
          SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: env.SETTLEMINT_THEGRAPH_SUBGRAPH_NAME,
          SETTLEMINT_PORTAL: env.SETTLEMINT_PORTAL,
          SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
          SETTLEMINT_PORTAL_REST_ENDPOINT: env.SETTLEMINT_PORTAL_REST_ENDPOINT,
          SETTLEMINT_HD_PRIVATE_KEY: env.SETTLEMINT_HD_PRIVATE_KEY,
          SETTLEMINT_MINIO: env.SETTLEMINT_MINIO,
          SETTLEMINT_MINIO_ENDPOINT: env.SETTLEMINT_MINIO_ENDPOINT,
          SETTLEMINT_MINIO_ACCESS_KEY: env.SETTLEMINT_MINIO_ACCESS_KEY,
          SETTLEMINT_IPFS: env.SETTLEMINT_IPFS,
          SETTLEMINT_IPFS_API_ENDPOINT: env.SETTLEMINT_IPFS_API_ENDPOINT,
          SETTLEMINT_IPFS_PINNING_ENDPOINT: env.SETTLEMINT_IPFS_PINNING_ENDPOINT,
          SETTLEMINT_IPFS_GATEWAY_ENDPOINT: env.SETTLEMINT_IPFS_GATEWAY_ENDPOINT,
          SETTLEMINT_CUSTOM_DEPLOYMENT: env.SETTLEMINT_CUSTOM_DEPLOYMENT,
          SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT: env.SETTLEMINT_CUSTOM_DEPLOYMENT_ENDPOINT,
          SETTLEMINT_BLOCKSCOUT: env.SETTLEMINT_BLOCKSCOUT,
          SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT: env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT,
          SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT: env.SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT,
          SETTLEMINT_SMART_CONTRACT_SET: env.SETTLEMINT_SMART_CONTRACT_SET,
          SETTLEMINT_SMART_CONTRACT_SET_ADDRESS: env.SETTLEMINT_SMART_CONTRACT_SET_ADDRESS,
          SETTLEMINT_SMART_CONTRACT_SET_DEPLOYMENT_ID: env.SETTLEMINT_SMART_CONTRACT_SET_DEPLOYMENT_ID,
        },
        false,
      );

      await writeEnv(
        prod,
        {
          SETTLEMINT_ACCESS_TOKEN: env.SETTLEMINT_ACCESS_TOKEN,
          SETTLEMINT_HASURA_ADMIN_SECRET: env.SETTLEMINT_HASURA_ADMIN_SECRET,
          SETTLEMINT_MINIO_SECRET_KEY: env.SETTLEMINT_MINIO_SECRET_KEY,
        },
        true,
      );
    },
  });
}
