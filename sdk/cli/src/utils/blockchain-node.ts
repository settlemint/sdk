import type { PrivateKey } from "@settlemint/sdk-js";

export function validPrivateKey(privateKey: { privateKeyType: PrivateKey["privateKeyType"] }) {
  return privateKey.privateKeyType !== "HD_ECDSA_P256";
}
