import type { Client } from "viem";
import type { WalletVerificationType } from "./types/wallet-verification.enum.js";
import type { AddressOrObject } from "./verify-wallet-verification-challenge.action.js";

/**
 * Parameters for creating wallet verification challenges.
 */
export interface CreateWalletVerificationChallengesParameters {
  /** The wallet address or object containing wallet address and optional verification ID. */
  addressOrObject: AddressOrObject<{ amount?: number }>;
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
  challenge: Record<string, string>;
}

/**
 * Response from creating wallet verification challenges.
 */
export type CreateWalletVerificationChallengesResponse = WalletVerificationChallenge[];

/**
 * RPC schema for creating wallet verification challenges.
 */
type WalletRpcSchema = {
  Method: "user_createWalletVerificationChallenges";
  Parameters: [addressOrObject: AddressOrObject];
  ReturnType: CreateWalletVerificationChallengesResponse;
};

/**
 * Creates a wallet verification challenges action for the given client.
 * @param client - The viem client to use for the request.
 * @returns An object with a createWalletVerificationChallenges method.
 */
export function createWalletVerificationChallenges(client: Client) {
  return {
    /**
     * Creates verification challenges for a wallet.
     * @param args - The parameters for creating the challenges.
     * @returns A promise that resolves to an array of wallet verification challenges.
     */
    createWalletVerificationChallenges(
      args: CreateWalletVerificationChallengesParameters,
    ): Promise<CreateWalletVerificationChallengesResponse> {
      return client.request<WalletRpcSchema>({
        method: "user_createWalletVerificationChallenges",
        params: [args.addressOrObject],
      });
    },
  };
}
