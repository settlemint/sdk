import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { type DotEnv, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";

export async function setupSettleMintClient() {
  const env: Partial<DotEnv> = await loadEnv(false, false);
  return createSettleMintClient({
    accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
    // For the standalone tests, we need to use the process.env.SETTLEMINT_INSTANCE (which is set by the CI)
    instance:
      env.SETTLEMINT_INSTANCE === STANDALONE_INSTANCE ? process.env.SETTLEMINT_INSTANCE! : env.SETTLEMINT_INSTANCE!,
  });
}

export async function defaultResourceAlreadyCreated(envNames: (keyof DotEnv)[]) {
  const env: Partial<DotEnv> = await loadEnv(false, false);
  return envNames.every((envName) => env[envName] !== undefined);
}

export async function blockchainNodeAlreadyCreated(blockchainNodeName: string) {
  const env: Partial<DotEnv> = await loadEnv(false, false);
  const settlemint = await setupSettleMintClient();
  const nodes = await settlemint.blockchainNode.list(env.SETTLEMINT_APPLICATION!);
  return nodes.some((node) => node.name === blockchainNodeName);
}

export async function privateKeyAlreadyCreated(privateKeyName: string) {
  const env: Partial<DotEnv> = await loadEnv(false, false);
  const settlemint = await setupSettleMintClient();
  const privateKeys = await settlemint.privateKey.list(env.SETTLEMINT_APPLICATION!);
  return privateKeys.some((privateKey) => privateKey.name === privateKeyName);
}

export async function findBlockchainNodeByName(blockchainNodeName: string) {
  const env: Partial<DotEnv> = await loadEnv(false, false);
  const settlemint = await setupSettleMintClient();
  const nodes = await settlemint.blockchainNode.list(env.SETTLEMINT_APPLICATION!);
  return nodes.find((node) => node.name === blockchainNodeName);
}

export async function findLoadBalancerByName(loadBalancerName: string) {
  const env: Partial<DotEnv> = await loadEnv(false, false);
  const settlemint = await setupSettleMintClient();
  const loadBalancers = await settlemint.loadBalancer.list(env.SETTLEMINT_APPLICATION!);
  return loadBalancers.find((loadBalancer) => loadBalancer.name === loadBalancerName);
}

export async function findPrivateKeyByName(privateKeyName: string) {
  const env: Partial<DotEnv> = await loadEnv(false, false);
  const settlemint = await setupSettleMintClient();
  const privateKeys = await settlemint.privateKey.list(env.SETTLEMINT_APPLICATION!);
  return privateKeys.find((privateKey) => privateKey.name === privateKeyName);
}
