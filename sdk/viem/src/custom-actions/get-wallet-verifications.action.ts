import type { Client } from "viem";
import type { WalletVerificationType } from "./types/wallet-verification.enum.js";

export interface GetWalletVerificationsParameters {
  /** The wallet address for which to fetch verifications. */
  userWalletAddress: string;
}

export interface WalletVerification {
  id: string;
  name: string;
  verificationType: WalletVerificationType;
}

export type GetWalletVerificationsResponse = WalletVerification[];

type WalletRpcSchema = {
  Method: "user_walletVerifications";
  Parameters: [userWalletAddress: string];
  ReturnType: GetWalletVerificationsResponse;
};

export function getWalletVerifications(client: Client) {
  return {
    getWalletVerifications(args: GetWalletVerificationsParameters): Promise<GetWalletVerificationsResponse> {
      return client.request<WalletRpcSchema>({
        method: "user_walletVerifications",
        params: [args.userWalletAddress],
      });
    },
  };
}
