/**
 * Masks sensitive SettleMint tokens in output text by replacing them with asterisks.
 * Handles personal access tokens (PAT), application access tokens (AAT), and service account tokens (SAT).
 *
 * @param output - The text string that may contain sensitive tokens
 * @returns The text with any sensitive tokens masked with asterisks
 * @example
 * import { maskTokens } from "@settlemint/sdk-utils";
 *
 * // Masks a token in text
 * const masked = maskTokens("Token: sm_pat_****"); // "Token: ***"
 */
export const maskTokens = (output: string): string => {
  return output.replace(/sm_(pat|aat|sat)_[0-9a-zA-Z]+/g, "***");
};
