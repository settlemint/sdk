import type { BlockchainNode, PrivateKey } from "@settlemint/sdk-js";

export function hasValidPrivateKey(privateKey: { privateKeyType: PrivateKey["privateKeyType"] }) {
  return privateKey.privateKeyType !== "HD_ECDSA_P256";
}

export function isRunning(service: Pick<BlockchainNode, "status"> | undefined) {
  return service === undefined || service?.status === "COMPLETED";
}
