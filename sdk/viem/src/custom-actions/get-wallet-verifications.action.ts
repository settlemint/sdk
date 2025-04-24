import type { Client } from "viem";
import type { WalletVerificationType } from "./types/wallet-verification.enum.js";

/**
 * Parameters for getting wallet verifications.
 */
export interface GetWalletVerificationsParameters {
  /** The wallet address for which to fetch verifications. */
  userWalletAddress: string;
}

/**
 * Represents a wallet verification.
 */
export interface WalletVerification {
  /** The unique identifier of the verification. */
  id: string;
  /** The name of the verification method. */
  name: string;
  /** The type of verification method. */
  verificationType: WalletVerificationType;
}

/**
 * Response from getting wallet verifications.
 */
export type GetWalletVerificationsResponse = WalletVerification[];

/**
 * RPC schema for getting wallet verifications.
 */
type WalletRpcSchema = {
  Method: "user_walletVerifications";
  Parameters: [userWalletAddress: string];
  ReturnType: GetWalletVerificationsResponse;
};

/**
 * Creates a wallet verifications retrieval action for the given client.
 * @param client - The viem client to use for the request.
 * @returns An object with a getWalletVerifications method.
 */
export function getWalletVerifications(client: Client) {
  return {
    /**
     * Gets all verifications for a wallet.
     * @param args - The parameters for getting the verifications.
     * @returns A promise that resolves to an array of wallet verifications.
     */
    getWalletVerifications(args: GetWalletVerificationsParameters): Promise<GetWalletVerificationsResponse> {
      return client.request<WalletRpcSchema>({
        method: "user_walletVerifications",
        params: [args.userWalletAddress],
      });
    },
  };
}
