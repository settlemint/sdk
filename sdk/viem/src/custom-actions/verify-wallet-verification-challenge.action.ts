import type { Client } from "viem";

/**
 * Represents either a wallet address string or an object containing wallet address and optional verification ID.
 */

// biome-ignore lint/complexity/noBannedTypes: is optional and the default is empty
export type AddressOrObject<Extra = {}> =
  | string
  | ({
      userWalletAddress: string;
      verificationId?: string;
    } & Extra);

/**
 * Represents either a wallet address string, an object containing wallet address and optional verification ID or a challenge ID.
 */
export type AddressOrObjectWithChallengeId =
  | AddressOrObject
  | {
      /** ID of the challenge to verify against */
      challengeId: string;
    };

/**
 * Parameters for verifying a wallet verification challenge.
 */
export interface VerifyWalletVerificationChallengeParameters {
  /** The wallet address or object containing wallet address and optional verification ID. */
  addressOrObject: AddressOrObjectWithChallengeId;
  /** The response to the verification challenge. */
  challengeResponse: string;
}

/**
 * Result of a wallet verification challenge.
 */
export interface VerificationResult {
  /** Whether the verification was successful. */
  verified: boolean;
}

/**
 * Response from verifying a wallet verification challenge.
 */
export type VerifyWalletVerificationChallengeResponse = VerificationResult[];

/**
 * RPC schema for wallet verification challenge verification.
 */
type WalletRpcSchema = {
  Method: "user_verifyWalletVerificationChallenge";
  Parameters: [addressOrObject: AddressOrObjectWithChallengeId, challengeResponse: string];
  ReturnType: VerifyWalletVerificationChallengeResponse;
};

/**
 * Creates a wallet verification challenge verification action for the given client.
 * @param client - The viem client to use for the request.
 * @returns An object with a verifyWalletVerificationChallenge method.
 */
export function verifyWalletVerificationChallenge(client: Client) {
  return {
    /**
     * Verifies a wallet verification challenge.
     * @param args - The parameters for verifying the challenge.
     * @returns A promise that resolves to an array of verification results.
     */
    verifyWalletVerificationChallenge(
      args: VerifyWalletVerificationChallengeParameters,
    ): Promise<VerifyWalletVerificationChallengeResponse> {
      return client.request<WalletRpcSchema>({
        method: "user_verifyWalletVerificationChallenge",
        params: [args.addressOrObject, args.challengeResponse],
      });
    },
  };
}
