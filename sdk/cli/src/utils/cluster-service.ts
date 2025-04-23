import type { BlockchainNode, PrivateKey } from "@settlemint/sdk-js";

export function isValidPrivateKey(privateKey: { privateKeyType: PrivateKey["privateKeyType"] }) {
  return privateKey.privateKeyType !== "HD_ECDSA_P256";
}

export function hasValidPrivateKey(service: Pick<BlockchainNode, "privateKeys">) {
  return (service.privateKeys ?? []).some(isValidPrivateKey);
}

export function hasPrivateKey(service: Pick<BlockchainNode, "privateKeys">) {
  const keys = service.privateKeys ?? [];
  return keys.length > 0;
}

export function isRunning(service: Pick<BlockchainNode, "status"> | undefined) {
  return service === undefined || service?.status === "COMPLETED";
}
