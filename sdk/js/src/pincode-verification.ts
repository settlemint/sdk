import { createHash } from "node:crypto";

function hashPincode(pincode: string, salt: string): string {
  return createHash("sha256").update(`${salt}${pincode}`).digest("hex");
}

function generateResponse(pincode: string, salt: string, challenge: string): string {
  const hashedPincode = hashPincode(pincode, salt);
  return createHash("sha256").update(`${hashedPincode}_${challenge}`).digest("hex");
}

export interface PincodeVerificationChallengesArgs {
  userWalletAddress: string;
  accessToken: string;
  instance: string;
  nodeId: string;
}

export interface PincodeVerificationChallengeResponseArgs {
  verificationChallenge: VerificationChallenge;
  pincode: string;
}

export interface VerificationChallenge {
  name: string;
  challenge: {
    secret: string;
    salt: string;
  };
}

/**
 * Get the pincode verification challenges for a user wallet address.
 * @param userWalletAddress - The user's wallet address.
 * @param accessToken - The user's access token.
 * @param instance - The instance URL.
 * @param nodeId - The node ID.
 * @returns The pincode verification challenges.
 */
export async function getPincodeVerificationChallenges({
  userWalletAddress,
  accessToken,
  instance,
  nodeId,
}: PincodeVerificationChallengesArgs) {
  const response = await fetch(
    `${instance}/cm/nodes/${encodeURIComponent(nodeId)}/user-wallets/${encodeURIComponent(userWalletAddress)}/verifications/challenges?type=PINCODE`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": accessToken,
      },
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`No user wallet found with address '${userWalletAddress}' for node '${nodeId}'`);
    }
    throw new Error("Failed to get verification challenge");
  }

  const verificationChallenges: VerificationChallenge[] = await response.json();
  return verificationChallenges;
}

/**
 * Get the pincode verification challenge response for a user wallet address.
 * @param verificationChallenge - The verification challenge.
 * @param pincode - The user's pincode.
 * @returns The pincode verification challenge response.
 */
export function getPincodeVerificationChallengeResponse({
  verificationChallenge,
  pincode,
}: PincodeVerificationChallengeResponseArgs) {
  if (!verificationChallenge?.challenge?.secret || !verificationChallenge?.challenge?.salt) {
    throw new Error("Could not authenticate pin code, invalid challenge format");
  }

  const { secret, salt } = verificationChallenge.challenge;
  return generateResponse(pincode, salt, secret);
}
