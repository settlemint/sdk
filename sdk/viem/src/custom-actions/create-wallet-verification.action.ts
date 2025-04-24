import type { Client } from "viem";
import type { OTPAlgorithm, WalletVerificationType } from "./types/wallet-verification.enum.js";

type BaseWalletVerificationInfo = {
  name: string;
  verificationType: WalletVerificationType;
};

export interface WalletPincodeVerificationInfo extends BaseWalletVerificationInfo {
  verificationType: WalletVerificationType.PINCODE;
  pincode: string;
}

export interface WalletOTPVerificationInfo extends BaseWalletVerificationInfo {
  verificationType: WalletVerificationType.OTP;
  algorithm?: OTPAlgorithm;
  digits?: number;
  period?: number;
  issuer?: string;
}

export interface WalletSecretCodesVerificationInfo extends BaseWalletVerificationInfo {
  verificationType: WalletVerificationType.SECRET_CODES;
}

export type WalletVerificationInfo =
  | WalletPincodeVerificationInfo
  | WalletOTPVerificationInfo
  | WalletSecretCodesVerificationInfo;

export interface CreateWalletVerificationParameters {
  userWalletAddress: string;
  walletVerificationInfo: WalletVerificationInfo;
}

export interface CreateWalletVerificationResponse {
  id: string;
  name: string;
  verificationType: WalletVerificationType;
  parameters: Record<string, string>;
}

type WalletRpcSchema = {
  Method: "user_createWalletVerification";
  Parameters: [userWalletAddress: string, walletVerificationInfo: WalletVerificationInfo];
  ReturnType: CreateWalletVerificationResponse[];
};

export function createWalletVerification(client: Client) {
  return {
    createWalletVerification(args: CreateWalletVerificationParameters): Promise<CreateWalletVerificationResponse[]> {
      return client.request<WalletRpcSchema>({
        method: "user_createWalletVerification",
        params: [args.userWalletAddress, args.walletVerificationInfo],
      });
    },
  };
}
