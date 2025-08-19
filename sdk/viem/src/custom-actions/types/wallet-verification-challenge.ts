import type { WalletVerificationType } from "@/custom-actions/types/wallet-verification.enum.js";

/**
 * Represents a wallet verification challenge.
 */
export interface WalletVerificationChallenge<ChallengeData> {
  /** The unique identifier of the challenge. */
  id: string;
  /** The name of the challenge. */
  name: string;
  /** The verification ID. */
  verificationId: string;
  /** The type of verification required. */
  verificationType: WalletVerificationType;
  /** The challenge parameters specific to the verification type. */
  challenge: ChallengeData;
}
