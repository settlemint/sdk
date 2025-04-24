import type { Client } from "viem";
import type { WalletVerificationType } from "./types/wallet-verification.enum.js";
import type { AddressOrObject } from "./verify-wallet-verification-challenge.action.js";

export interface CreateWalletVerificationChallengesParameters {
  addressOrObject: AddressOrObject;
}

export interface WalletVerificationChallenge {
  id: string;
  name: string;
  verificationType: WalletVerificationType;
  challenge: Record<string, string>;
}

export type CreateWalletVerificationChallengesResponse = WalletVerificationChallenge[];

type WalletRpcSchema = {
  Method: "user_createWalletVerificationChallenges";
  Parameters: [addressOrObject: AddressOrObject];
  ReturnType: CreateWalletVerificationChallengesResponse;
};

export function createWalletVerificationChallenges(client: Client) {
  return {
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
