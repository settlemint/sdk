import input from "@inquirer/input";
import { type DotEnv, UrlSchema, validate } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user for the URL of their SettleMint instance.
 *
 * @param env - Partial environment variables, potentially containing a pre-configured instance URL.
 * @returns A promise that resolves to the user-input or default SettleMint instance URL.
 * @throws Will throw an error if the input validation fails.
 *
 * @example
 * const env: Partial<DotEnv> = { SETTLEMINT_INSTANCE: "https://example.settlemint.com" };
 * const instanceUrl = await instancePrompt(env);
 * console.log(instanceUrl); // Output: https://example.settlemint.com or user input
 */
export async function authUrlPrompt(env: Partial<DotEnv>, accept: boolean, prod: boolean) {
  const defaultAuthUrl = (env.NEXTAUTH_URL ?? prod) ? undefined : "http://localhost:3000";
  const defaultPossible = accept && defaultAuthUrl;

  if (defaultPossible) {
    return defaultAuthUrl;
  }

  return input({
    message: prod
      ? "What is the production URL of your application?"
      : "What is the development URL of your application?",
    default: defaultAuthUrl,
    required: true,
    validate(value) {
      try {
        validate(UrlSchema, value);
        return true;
      } catch (error) {
        return "Invalid URL";
      }
    },
  });
}
