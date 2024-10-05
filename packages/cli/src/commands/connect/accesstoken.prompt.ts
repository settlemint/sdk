import { password } from "@inquirer/prompts";
import { AccessTokenSchema, type DotEnv, validate } from "@settlemint/sdk-utils/validation";

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
export async function accessTokenPrompt(env: Partial<DotEnv>) {
  let accessToken: string;
  try {
    accessToken = validate(AccessTokenSchema, env.SETTLEMINT_ACCESS_TOKEN);
  } catch (error) {
    accessToken = await password({
      message: "What is the access token for your application in SettleMint?",
      validate(value) {
        try {
          validate(AccessTokenSchema, value);
          return true;
        } catch (error) {
          return "Invalid access token";
        }
      },
    });
  }
  return accessToken;
}
