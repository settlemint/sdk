import confirm from "@inquirer/confirm";
import password from "@inquirer/password";
import { PersonalAccessTokenSchema, validate } from "@settlemint/sdk-utils/validation";
import { getInstanceCredentials } from "../../utils/config";

/**
 * Prompts the user for their personal access token.
 * If a token exists for the given instance, asks if they want to use it.
 * Otherwise, prompts for a new token.
 *
 * @param instance - The instance URL to get/set credentials for
 * @returns A promise that resolves to the validated access token.
 * @throws Will throw an error if the input validation fails.
 */
export async function personalAccessTokenPrompt(instance: string): Promise<string> {
  const existingConfig = await getInstanceCredentials(instance);

  if (existingConfig) {
    const useExisting = await confirm({
      message: `Do you want to use your existing personal access token for ${instance}?`,
      default: true,
    });

    if (useExisting) {
      return existingConfig.personalAccessToken;
    }
  }

  return password({
    message: "What is your personal access token in SettleMint?",
    validate(value) {
      try {
        validate(PersonalAccessTokenSchema, value);
        return true;
      } catch (error) {
        return "Invalid personal access token";
      }
    },
  });
}
