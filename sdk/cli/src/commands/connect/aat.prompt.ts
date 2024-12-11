import confirm from "@inquirer/confirm";
import password from "@inquirer/password";
import { ApplicationAccessTokenSchema, type DotEnv, validate } from "@settlemint/sdk-utils/validation";
/**
 * Prompts the user for the access token of their SettleMint application.
 * If the access token is already present in the environment variables and valid,
 * it will be used. Otherwise, the user will be prompted to enter it.
 *
 * @param env - Partial environment variables, potentially containing a pre-configured access token.
 * @returns A promise that resolves to the validated access token.
 * @throws Will throw an error if the input validation fails.
 *
 * @example
 * const env: Partial<DotEnv> = { SETTLEMINT_ACCESS_TOKEN: "your-access-token" };
 * const accessToken = await accessTokenPrompt(env);
 * console.log(accessToken); // Output: your-access-token or user input
 */
export async function applicationAccessTokenPrompt(env: Partial<DotEnv>, accept: boolean): Promise<string> {
  const defaultAccessToken = env.SETTLEMINT_ACCESS_TOKEN;
  const defaultPossible = accept && defaultAccessToken;

  if (defaultPossible) {
    return defaultAccessToken;
  }

  if (defaultAccessToken) {
    const keep = await confirm({
      message: "Do you want to use the existing application access token?",
      default: true,
    });
    if (keep) {
      return defaultAccessToken;
    }
  }

  return password({
    message: "What is the application access token for your application in SettleMint?",
    validate(value) {
      try {
        validate(ApplicationAccessTokenSchema, value);
        return true;
      } catch (error) {
        return "Invalid application access token";
      }
    },
  });
}
