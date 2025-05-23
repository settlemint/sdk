import { createHash } from "node:crypto";
import type { AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import type { GraphQLClient } from "graphql-request";
import type { Address } from "viem";

/**
 * Custom error class for challenge-related errors
 */
export class ChallengeError extends Error {
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
  challenge: {
    secret: string;
    salt: string;
  };
  id: string;
  name: string;
  verificationType: string;
}

/**
 * Response type for the CreateWalletVerificationChallenges mutation
 */
interface CreateWalletVerificationChallengesResponse {
  createWalletVerificationChallenges: WalletVerificationChallenge[];
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
  verificationType: "otp" | "secret-code" | "pincode";
}

/**
 * Handles a wallet verification challenge by generating an appropriate response
 *
 * @param options - The options for handling the wallet verification challenge
 * @returns Promise resolving to an object containing the challenge response and optionally the verification ID
 * @throws {ChallengeError} If the challenge cannot be created or is invalid
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
 *   verificationType: "otp"
 * });
 */
export async function handleWalletVerificationChallenge<const Setup extends AbstractSetupSchema>({
  portalClient,
  portalGraphql,
  verificationId,
  userWalletAddress,
  code,
  verificationType,
}: HandleWalletVerificationChallengeOptions<Setup>): Promise<{
  challengeResponse: string;
  verificationId?: string;
}> {
  try {
    if (verificationType === "otp") {
      return {
        challengeResponse: code.toString(),
        verificationId,
      };
    }

    if (verificationType === "secret-code") {
      // Add - separator to the code
      const formattedCode = code.toString().replace(/(.{5})(?=.)/, "$1-");
      return {
        challengeResponse: formattedCode,
        verificationId,
      };
    }

    const verificationChallenges = await portalClient.request<CreateWalletVerificationChallengesResponse>(
      portalGraphql(`
        mutation CreateWalletVerificationChallenges($userWalletAddress: String!, $verificationId: String!) {
          createWalletVerificationChallenges(userWalletAddress: $userWalletAddress, verificationId: $verificationId) {
            challenge
            id
            name
            verificationType
          }
        }
      `),
      {
        userWalletAddress,
        verificationId,
      },
    );

    if (!verificationChallenges.createWalletVerificationChallenges?.length) {
      throw new ChallengeError("No verification challenges received", "NO_CHALLENGES");
    }

    const walletVerificationChallenge = verificationChallenges.createWalletVerificationChallenges.find(
      (challenge) => challenge.id === verificationId,
    );

    if (!walletVerificationChallenge?.challenge?.secret || !walletVerificationChallenge?.challenge?.salt) {
      throw new ChallengeError("Invalid challenge format", "INVALID_CHALLENGE");
    }

    const { secret, salt } = walletVerificationChallenge.challenge;
    const challengeResponse = generateResponse(code.toString(), salt, secret);
    return {
      challengeResponse,
      verificationId,
    };
  } catch (error) {
    if (error instanceof ChallengeError) {
      throw error;
    }
    throw new ChallengeError("Failed to process wallet verification challenge", "CHALLENGE_PROCESSING_ERROR");
  }
}
