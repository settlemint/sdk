import type { Client } from "viem";

/**
 * Parameters for signing data with a wallet.
 */
export interface EthSignParameters {
  /** The wallet address to sign the data with. */
  userWalletAddress: string;
  /** The data to sign. */
  data: string;
}

/**
 * RPC schema for signing data with a wallet.
 */
type EthSignRpcSchema = {
  Method: "eth_sign";
  Parameters: [userWalletAddress: string, data: string];
  ReturnType: string;
};

/**
 * Creates a wallet action for the given client.
 * @param client - The viem client to use for the request.
 * @returns An object with a createWallet method.
 */
export function ethSign(client: Client) {
  return {
    /**
     * Signs data with a wallet.
     * @param args - The parameters for signing data with a wallet.
     * @returns A promise that resolves to signed data response.
     */
    ethSign(args: EthSignParameters): Promise<string> {
      return client.request<EthSignRpcSchema>({
        method: "eth_sign",
        params: [args.userWalletAddress, args.data],
      });
    },
  };
}
