import type { Client } from "viem";

export interface DeleteWalletVerificationParameters {
  /** The wallet address for which to delete the verification. */
  userWalletAddress: string;
  verificationId: string;
}

export interface DeleteWalletVerificationResponse {
  success: boolean;
}

type WalletRpcSchema = {
  Method: "user_deleteWalletVerification";
  Parameters: [userWalletAddress: string, verificationId: string];
  ReturnType: DeleteWalletVerificationResponse[];
};

export function deleteWalletVerification(client: Client) {
  return {
    deleteWalletVerification(args: DeleteWalletVerificationParameters): Promise<DeleteWalletVerificationResponse[]> {
      return client.request<WalletRpcSchema>({
        method: "user_deleteWalletVerification",
        params: [args.userWalletAddress, args.verificationId],
      });
    },
  };
}
