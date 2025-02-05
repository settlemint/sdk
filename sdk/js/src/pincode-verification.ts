import { createHash } from "node:crypto";

function hashPincode(pincode: string, salt: string): string {
  return createHash("sha256").update(`${salt}${pincode}`).digest("hex");
}

function generateResponse(pincode: string, salt: string, challenge: string): string {
  const hashedPincode = hashPincode(pincode, salt);
  return createHash("sha256").update(`${hashedPincode}_${challenge}`).digest("hex");
}

export interface PincodeVerificationResponseArgs {
  userWalletAddress: string;
  pincode: string;
  accessToken: string;
  instance: string;
  nodeId: string;
}

/**
 * Get the pincode verification response for a user wallet address.
 * @param userWalletAddress - The user's wallet address.
 * @param pincode - The user's pincode.
 * @param accessToken - The user's access token.
 * @param instance - The instance URL.
 * @param nodeId - The node ID.
 * @returns The pincode verification response.
 */
export async function getPincodeVerificationResponse({
  userWalletAddress,
  pincode,
  accessToken,
  instance,
  nodeId,
}: PincodeVerificationResponseArgs) {
  const response = await fetch(
    `${instance}/cm/nodes/${encodeURIComponent(nodeId)}/user-wallets/${encodeURIComponent(userWalletAddress)}/verifications/challenges`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": accessToken,
      },
      body: JSON.stringify({
        pincode,
        verificationType: "PINCODE",
        name: "pincode",
      }),
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`No user wallet found with address '${userWalletAddress}' for node '${nodeId}'`);
    }
    throw new Error("Failed to get verification challenge");
  }

  const verificationChallenges: { challenge: { secret: string; salt: string } }[] = await response.json();
  if (!verificationChallenges.length) {
    throw new Error("No verification challenges received");
  }

  const firstChallenge = verificationChallenges[0];
  const challenge = firstChallenge?.challenge as { secret: string; salt: string } | null;
  if (!challenge?.secret || !challenge?.salt) {
    throw new Error("Could not authenticate pin code, invalid challenge format");
  }

  const { secret, salt } = challenge;
  return generateResponse(pincode, salt, secret);
}
