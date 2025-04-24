/**
 * Types of wallet verification methods supported by the system.
 * Used to identify different verification mechanisms when creating or managing wallet verifications.
 */
export enum WalletVerificationType {
  /** PIN code verification method */
  PINCODE = "PINCODE",
  /** One-Time Password verification method */
  OTP = "OTP",
  /** Secret recovery codes verification method */
  SECRET_CODES = "SECRET_CODES",
}

/**
 * Supported hash algorithms for One-Time Password (OTP) verification.
 * These algorithms determine the cryptographic function used to generate OTP codes.
 */
export enum OTPAlgorithm {
  /** SHA-1 hash algorithm */
  SHA1 = "SHA1",
  /** SHA-224 hash algorithm */
  SHA224 = "SHA224",
  /** SHA-256 hash algorithm */
  SHA256 = "SHA256",
  /** SHA-384 hash algorithm */
  SHA384 = "SHA384",
  /** SHA-512 hash algorithm */
  SHA512 = "SHA512",
  /** SHA3-224 hash algorithm */
  SHA3_224 = "SHA3-224",
  /** SHA3-256 hash algorithm */
  SHA3_256 = "SHA3-256",
  /** SHA3-384 hash algorithm */
  SHA3_384 = "SHA3-384",
  /** SHA3-512 hash algorithm */
  SHA3_512 = "SHA3-512",
}
