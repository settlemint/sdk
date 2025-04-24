import type { Client } from "viem";

export type AddressOrObject =
  | string
  | {
      userWalletAddress: string;
      verificationId?: string;
    };

export interface VerifyWalletVerificationChallengeParameters {
  addressOrObject: AddressOrObject;
  challengeResponse: string;
}

export interface VerificationResult {
  verified: boolean;
}

export type VerifyWalletVerificationChallengeResponse = VerificationResult[];

type WalletRpcSchema = {
  Method: "user_verifyWalletVerificationChallenge";
  Parameters: [addressOrObject: AddressOrObject, challengeResponse: string];
  ReturnType: VerifyWalletVerificationChallengeResponse;
};

export function verifyWalletVerificationChallenge(client: Client) {
  return {
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
