import { createHash } from "node:crypto";
import type { AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import type { GraphQLClient } from "graphql-request";
import type { Address } from "viem";

/**
 * Type representing the different types of wallet verification methods
 */
export type WalletVerificationType = "PINCODE" | "OTP" | "SECRET_CODES";

/**
 * Custom error class for challenge-related errors
 */
export class WalletVerificationChallengeError extends Error {
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "ChallengeError";
    this.code = code;
  }
}

/**
 * Represents the structure of a wallet verification challenge
 */
interface WalletVerificationChallenge {
  id: string;
  name: string;
  verificationId: string;
  verificationType: WalletVerificationType;
  challenge?: {
    salt: string;
    secret: string;
  };
}

/**
 * Response type for the CreateWalletVerificationChallenge mutation
 */
interface CreateWalletVerificationChallengeResponse {
  createWalletVerificationChallenge: WalletVerificationChallenge;
}

/**
 * Hashes a pincode with a salt using SHA-256
 * @param pincode - The pincode to hash
 * @param salt - The salt to use in hashing
 * @returns The hashed pincode as a hex string
 */
function hashPincode(pincode: string, salt: string): string {
  return createHash("sha256").update(`${salt}${pincode}`).digest("hex");
}

/**
 * Generates a challenge response by combining a hashed pincode with a challenge
 * @param pincode - The user's pincode
 * @param salt - The salt provided in the challenge
 * @param challenge - The challenge secret
 * @returns The challenge response as a hex string
 */
function generateResponse(pincode: string, salt: string, challenge: string): string {
  const hashedPincode = hashPincode(pincode, salt);
  return createHash("sha256").update(`${hashedPincode}_${challenge}`).digest("hex");
}

/**
 * Options for handling a wallet verification challenge
 */
export interface HandleWalletVerificationChallengeOptions<Setup extends AbstractSetupSchema> {
  /** The portal client instance */
  portalClient: GraphQLClient;
  /** The GraphQL query builder */
  portalGraphql: initGraphQLTada<Setup>;
  /** The ID of the verification challenge */
  verificationId: string;
  /** The wallet address to verify */
  userWalletAddress: Address;
  /** The verification code provided by the user */
  code: string | number;
  /** The type of verification being performed */
  verificationType: WalletVerificationType;
  /** Request id which can be added for tracing purposes */
  requestId?: string;
}

/**
 * Handles a wallet verification challenge by generating an appropriate response
 *
 * @param options - The options for handling the wallet verification challenge
 * @returns Promise resolving to an object containing the challenge response and optionally the verification ID
 * @throws {WalletVerificationChallengeError} If the challenge cannot be created or is invalid
 * @example
 * import { createPortalClient } from "@settlemint/sdk-portal";
 * import { handleWalletVerificationChallenge } from "@settlemint/sdk-portal";
 *
 * const { client, graphql } = createPortalClient({
 *   instance: "https://portal.example.com/graphql",
 *   accessToken: "your-access-token"
 * });
 *
 * const result = await handleWalletVerificationChallenge({
 *   portalClient: client,
 *   portalGraphql: graphql,
 *   verificationId: "verification-123",
 *   userWalletAddress: "0x123...",
 *   code: "123456",
 *   verificationType: "OTP"
 * });
 */
export async function handleWalletVerificationChallenge<const Setup extends AbstractSetupSchema>({
  portalClient,
  portalGraphql,
  verificationId,
  userWalletAddress,
  code,
  verificationType,
  requestId,
}: HandleWalletVerificationChallengeOptions<Setup>): Promise<{
  challengeResponse: string;
  challengeId: string;
}> {
  try {
    const requestHeaders = new Headers();
    if (requestId) {
      requestHeaders.append("x-request-id", requestId);
    }
    const verificationChallenge = await portalClient.request<CreateWalletVerificationChallengeResponse>(
      portalGraphql(`
        mutation CreateWalletVerificationChallenge($userWalletAddress: String!, $verificationId: String!) {
          createWalletVerificationChallenge(
            userWalletAddress: $userWalletAddress
            verificationId: $verificationId
          ) {
            id
            name
            verificationId
            verificationType
            challenge {
              salt
              secret
            }
          }
        }
      `),
      {
        userWalletAddress,
        verificationId,
      },
      requestHeaders,
    );

    if (!verificationChallenge.createWalletVerificationChallenge) {
      throw new WalletVerificationChallengeError("No verification challenge received", "NO_CHALLENGES");
    }

    if (verificationType === "OTP") {
      return {
        challengeResponse: code.toString(),
        challengeId: verificationChallenge.createWalletVerificationChallenge.id,
      };
    }

    if (verificationType === "SECRET_CODES") {
      // Add - separator to the code
      const formattedCode = code.toString().replace(/(.{5})(?=.)/, "$1-");
      return {
        challengeResponse: formattedCode,
        challengeId: verificationChallenge.createWalletVerificationChallenge.id,
      };
    }

    const { secret, salt } = verificationChallenge.createWalletVerificationChallenge.challenge ?? {};

    if (!secret || !salt) {
      throw new WalletVerificationChallengeError("Invalid challenge format", "INVALID_CHALLENGE");
    }

    const challengeResponse = generateResponse(code.toString(), salt, secret);
    return {
      challengeResponse,
      challengeId: verificationChallenge.createWalletVerificationChallenge.id,
    };
  } catch (error) {
    if (error instanceof WalletVerificationChallengeError) {
      throw error;
    }
    throw new WalletVerificationChallengeError(
      "Failed to process wallet verification challenge",
      "CHALLENGE_PROCESSING_ERROR",
    );
  }
}
