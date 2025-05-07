import { JsonRpcProvider, type Provider, Wallet } from "ethers";
import type { PublicClient, Transport, WalletClient } from "viem";

/**
 * Converts a viem PublicClient to an ethers JsonRpcProvider
 */
export function publicClientToProvider(client: PublicClient): Provider {
  const { chain, transport } = client;
  if (!chain) throw new Error("Chain is required");

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  if (transport.type === "fallback") {
    const providers = (transport.transports as ReturnType<Transport>[])
      .map(({ value }) => {
        if (!value?.url) return null;
        try {
          return new JsonRpcProvider(value.url, network);
        } catch {
          return null;
        }
      })
      .filter((provider): provider is JsonRpcProvider => provider != null);

    if (providers.length === 0) throw new Error("No valid RPC URLs found");
    // We know providers[0] exists because we checked length > 0
    return providers[0] as Provider;
  }

  return new JsonRpcProvider(transport.url, network);
}

/**
 * Converts a viem WalletClient to an ethers Wallet
 */
export function walletClientToSigner(client: WalletClient): Wallet {
  const { account, chain, transport } = client;
  if (!chain) throw new Error("Chain is required");
  if (!account) throw new Error("Account is required");

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  const provider = new JsonRpcProvider(transport.url, network);

  // For viem, we need to get the private key from the account
  const privateKey = (account as { privateKey?: string }).privateKey;
  if (!privateKey || typeof privateKey !== "string") {
    throw new Error("Private key is required and must be a string");
  }

  return new Wallet(privateKey, provider);
}
