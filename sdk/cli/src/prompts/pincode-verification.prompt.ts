import select from "@inquirer/select";
import type { VerificationChallenge } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";

export async function pincodeVerificationPrompt(
  verificationChallenges: VerificationChallenge[],
): Promise<VerificationChallenge> {
  if (verificationChallenges.length === 0) {
    cancel("No pincode is configured");
  }

  if (verificationChallenges.length === 1) {
    return verificationChallenges[0];
  }

  const verificationChallenge = await select({
    message: "Which pincode verification do you want to use?",
    choices: verificationChallenges.map((verificationChallenge) => ({
      name: verificationChallenge.name,
      value: verificationChallenge,
    })),
  });

  if (!verificationChallenge) {
    cancel("No pincode verification challenge selected");
  }

  return verificationChallenge;
}
