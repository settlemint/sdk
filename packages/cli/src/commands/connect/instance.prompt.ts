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
export async function instancePrompt(env: Partial<DotEnv>, accept: boolean) {
  const defaultInstance = env.SETTLEMINT_INSTANCE ?? "https://console.settlemint.com";
  const defaultPossible = accept && defaultInstance;

  return input(
    {
      message: "What is the URL of your SettleMint instance?",
      default: defaultInstance,
      required: true,
      validate(value) {
        try {
          validate(UrlSchema, value);
          return true;
        } catch (error) {
          return "Invalid URL";
        }
      },
    },
    { signal: defaultPossible ? AbortSignal.timeout(0) : undefined },
  ).catch((error) => {
    if (error.name === "AbortPromptError") {
      return defaultInstance;
    }
    throw error;
  });
}
