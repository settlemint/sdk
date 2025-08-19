import type { Client } from "viem";
import type { WalletVerificationType } from "./types/wallet-verification.enum.js";

/**
 * Parameters for creating wallet verification challenges.
 */
export interface CreateWalletVerificationChallengeParameters {
  /** The wallet address. */
  userWalletAddress: string;
  /** The verification ID. */
  verificationId: string;
}

/**
 * Data specific to a wallet verification challenge.
 */
export interface WalletVerificationChallengeData {
  /** The verification ID (for backward compatibility). */
  id: string;
  /** The unique identifier of the challenge. */
  challengeId: string;
  /** Optional salt for PINCODE verification type. */
  salt?: string;
  /** Optional secret for PINCODE verification type. */
  secret?: string;
}

/**
 * Represents a wallet verification challenge.
 */
export interface WalletVerificationChallenge {
  /** The unique identifier of the challenge. */
  id: string;
  /** The name of the challenge. */
  name: string;
  /** The verification ID. */
  verificationId: string;
  /** The type of verification required. */
  verificationType: WalletVerificationType;
  /** The challenge parameters specific to the verification type. */
  challenge: WalletVerificationChallengeData;
}

/**
 * Response from creating wallet verification challenge.
 */
export type CreateWalletVerificationChallengeResponse = WalletVerificationChallenge[];

/**
 * RPC schema for creating wallet verification challenge.
 */
type WalletRpcSchema = {
  Method: "user_createWalletVerificationChallenge";
  Parameters: [CreateWalletVerificationChallengeParameters];
  ReturnType: CreateWalletVerificationChallengeResponse;
};

/**
 * Creates a wallet verification challenge action for the given client.
 * @param client - The viem client to use for the request.
 * @returns An object with a createWalletVerificationChallenge method.
 */
export function createWalletVerificationChallenge(client: Client) {
  return {
    /**
     * Creates a verification challenge for a wallet.
     * @param args - The parameters for creating the challenge.
     * @returns A promise that resolves to a wallet verification challenge.
     */
    createWalletVerificationChallenge(
      args: CreateWalletVerificationChallengeParameters,
    ): Promise<CreateWalletVerificationChallengeResponse> {
      return client.request<WalletRpcSchema>({
        method: "user_createWalletVerificationChallenge",
        params: [args],
      });
    },
  };
}
