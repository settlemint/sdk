import confirm from "@inquirer/confirm";
import password from "@inquirer/password";
import { type DotEnv, PersonalAccessTokenSchema, validate } from "@settlemint/sdk-utils/validation";
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
export async function personalAccessTokenPrompt(
  env: Partial<DotEnv>,
  instance: string,
  accept: boolean,
): Promise<string> {
  const existingConfig = await getInstanceCredentials(instance, false);
  const defaultPersonalAccessToken = env.SETTLEMINT_PERSONAL_ACCESS_TOKEN || existingConfig?.personalAccessToken;
  const defaultPossible = accept && defaultPersonalAccessToken;

  if (defaultPossible) {
    return defaultPersonalAccessToken;
  }

  if (existingConfig && defaultPersonalAccessToken) {
    const useExisting = await confirm({
      message: `Do you want to use your existing personal access token for ${instance}?`,
      default: true,
    });

    if (useExisting) {
      return defaultPersonalAccessToken;
    }
  }

  return password({
    message: "What is your personal access token in SettleMint? (format: sm_pat_...)",
    validate(value) {
      try {
        validate(PersonalAccessTokenSchema, value);
        return true;
      } catch (error) {
        return "Invalid personal access token, it should start with sm_pat_...";
      }
    },
  });
}
