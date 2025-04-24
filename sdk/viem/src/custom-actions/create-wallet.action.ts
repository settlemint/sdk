import type { Client } from "viem";

export interface WalletInfo {
  /** The name of the wallet. */
  name: string;
}

export interface CreateWalletParameters {
  /** The ID of the key vault where the wallet will be created. */
  keyVaultId: string;
  /** Information about the wallet to be created. */
  walletInfo: WalletInfo;
}

export interface CreateWalletResponse {
  id: string;
  name: string;
  address: string;
  derivationPath: string;
}

type WalletRpcSchema = {
  Method: "user_createWallet";
  Parameters: [keyVaultId: string, walletInfo: WalletInfo];
  ReturnType: CreateWalletResponse[];
};

export function createWallet(client: Client) {
  return {
    createWallet(args: CreateWalletParameters): Promise<CreateWalletResponse[]> {
      return client.request<WalletRpcSchema>({
        method: "user_createWallet",
        params: [args.keyVaultId, args.walletInfo],
      });
    },
  };
}
