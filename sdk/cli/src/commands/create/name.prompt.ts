import input from "@inquirer/input";
import { type DotEnv, validate } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

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
export async function namePrompt(env: Partial<DotEnv>, argument?: string): Promise<string> {
  const defaultInstance = env.SETTLEMINT_NEW_PROJECT_NAME ?? argument;

  if (defaultInstance) {
    return defaultInstance;
  }

  return input({
    message: "What is the name of your new SettleMint project?",
    default: defaultInstance,
    required: true,
    validate(value) {
      try {
        validate(z.string(), value);
        return true;
      } catch (error) {
        return "Invalid projectname";
      }
    },
  });
}
