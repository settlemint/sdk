import type { Client } from "viem";
import type { OTPAlgorithm, WalletVerificationType } from "./types/wallet-verification.enum.js";

/**
 * Base interface for wallet verification information.
 */
type BaseWalletVerificationInfo = {
  /** The name of the verification method. */
  name: string;
  /** The type of verification method. */
  verificationType: WalletVerificationType;
};

/**
 * Information for PIN code verification.
 */
export interface WalletPincodeVerificationInfo extends BaseWalletVerificationInfo {
  /** The type of verification method. */
  verificationType: WalletVerificationType.PINCODE;
  /** The PIN code to use for verification. */
  pincode: string;
}

/**
 * Information for One-Time Password (OTP) verification.
 */
export interface WalletOTPVerificationInfo extends BaseWalletVerificationInfo {
  /** The type of verification method. */
  verificationType: WalletVerificationType.OTP;
  /** The hash algorithm to use for OTP generation. */
  algorithm?: OTPAlgorithm;
  /** The number of digits in the OTP code. */
  digits?: number;
  /** The time period in seconds for OTP validity. */
  period?: number;
  /** The issuer of the OTP. */
  issuer?: string;
}

/**
 * Information for secret recovery codes verification.
 */
export interface WalletSecretCodesVerificationInfo extends BaseWalletVerificationInfo {
  /** The type of verification method. */
  verificationType: WalletVerificationType.SECRET_CODES;
}

/**
 * Union type of all possible wallet verification information types.
 */
export type WalletVerificationInfo =
  | WalletPincodeVerificationInfo
  | WalletOTPVerificationInfo
  | WalletSecretCodesVerificationInfo;

/**
 * Parameters for creating a wallet verification.
 */
export interface CreateWalletVerificationParameters {
  /** The wallet address for which to create the verification. */
  userWalletAddress: string;
  /** The verification information to create. */
  walletVerificationInfo: WalletVerificationInfo;
}

/**
 * Response from creating a wallet verification.
 */
export interface CreateWalletVerificationResponse {
  /** The unique identifier of the verification. */
  id: string;
  /** The name of the verification method. */
  name: string;
  /** The type of verification method. */
  verificationType: WalletVerificationType;
  /** Additional parameters specific to the verification type. */
  parameters: Record<string, string>;
}

/**
 * RPC schema for creating a wallet verification.
 */
type WalletRpcSchema = {
  Method: "user_createWalletVerification";
  Parameters: [userWalletAddress: string, walletVerificationInfo: WalletVerificationInfo];
  ReturnType: CreateWalletVerificationResponse[];
};

/**
 * Creates a wallet verification action for the given client.
 * @param client - The viem client to use for the request.
 * @returns An object with a createWalletVerification method.
 */
export function createWalletVerification(client: Client) {
  return {
    /**
     * Creates a new wallet verification.
     * @param args - The parameters for creating the verification.
     * @returns A promise that resolves to an array of created wallet verification responses.
     */
    createWalletVerification(args: CreateWalletVerificationParameters): Promise<CreateWalletVerificationResponse[]> {
      return client.request<WalletRpcSchema>({
        method: "user_createWalletVerification",
        params: [args.userWalletAddress, args.walletVerificationInfo],
      });
    },
  };
}
