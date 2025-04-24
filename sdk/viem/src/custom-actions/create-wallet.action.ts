import type { Client } from "viem";

/**
 * Information about the wallet to be created.
 */
export interface WalletInfo {
  /** The name of the wallet. */
  name: string;
}

/**
 * Parameters for creating a wallet.
 */
export interface CreateWalletParameters {
  /** The unique name of the key vault where the wallet will be created. */
  keyVaultId: string;
  /** Information about the wallet to be created. */
  walletInfo: WalletInfo;
}

/**
 * Response from creating a wallet.
 */
export interface CreateWalletResponse {
  /** The unique identifier of the wallet. */
  id: string;
  /** The name of the wallet. */
  name: string;
  /** The blockchain address of the wallet. */
  address: string;
  /** The HD derivation path used to create the wallet. */
  derivationPath: string;
}

/**
 * RPC schema for wallet creation.
 */
type WalletRpcSchema = {
  Method: "user_createWallet";
  Parameters: [keyVaultId: string, walletInfo: WalletInfo];
  ReturnType: CreateWalletResponse[];
};

/**
 * Creates a wallet action for the given client.
 * @param client - The viem client to use for the request.
 * @returns An object with a createWallet method.
 */
export function createWallet(client: Client) {
  return {
    /**
     * Creates a new wallet in the specified key vault.
     * @param args - The parameters for creating a wallet.
     * @returns A promise that resolves to an array of created wallet responses.
     */
    createWallet(args: CreateWalletParameters): Promise<CreateWalletResponse[]> {
      return client.request<WalletRpcSchema>({
        method: "user_createWallet",
        params: [args.keyVaultId, args.walletInfo],
      });
    },
  };
}
