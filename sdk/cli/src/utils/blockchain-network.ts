import type { BlockchainNetwork } from "@settlemint/sdk-js";

export function getBlockchainNetworkChainId(
  blockchainNetwork: Partial<BlockchainNetwork> | undefined,
): string | undefined {
  if (!blockchainNetwork) {
    return undefined;
  }
  return "chainId" in blockchainNetwork && typeof blockchainNetwork.chainId === "number"
    ? blockchainNetwork.chainId.toString()
    : undefined;
}
