import type { Client } from "viem";

/**
 * Parameters for deleting a wallet verification.
 */
export interface DeleteWalletVerificationParameters {
  /** The wallet address for which to delete the verification. */
  userWalletAddress: string;
  /** The unique identifier of the verification to delete. */
  verificationId: string;
}

/**
 * Response from deleting a wallet verification.
 */
export interface DeleteWalletVerificationResponse {
  /** Whether the deletion was successful. */
  success: boolean;
}

/**
 * RPC schema for deleting a wallet verification.
 */
type WalletRpcSchema = {
  Method: "user_deleteWalletVerification";
  Parameters: [userWalletAddress: string, verificationId: string];
  ReturnType: DeleteWalletVerificationResponse[];
};

/**
 * Creates a wallet verification deletion action for the given client.
 * @param client - The viem client to use for the request.
 * @returns An object with a deleteWalletVerification method.
 */
export function deleteWalletVerification(client: Client) {
  return {
    /**
     * Deletes a wallet verification.
     * @param args - The parameters for deleting the verification.
     * @returns A promise that resolves to an array of deletion results.
     */
    deleteWalletVerification(args: DeleteWalletVerificationParameters): Promise<DeleteWalletVerificationResponse[]> {
      return client.request<WalletRpcSchema>({
        method: "user_deleteWalletVerification",
        params: [args.userWalletAddress, args.verificationId],
      });
    },
  };
}
