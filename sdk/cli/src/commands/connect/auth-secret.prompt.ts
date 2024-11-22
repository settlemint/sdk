import { randomBytes } from "node:crypto";
import confirm from "@inquirer/confirm";
import password from "@inquirer/password";
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
export async function authSecretPrompt(env: Partial<DotEnv>, accept: boolean): Promise<string> {
  const defaultAuthSecret = env.SETTLEMINT_AUTH_SECRET;
  const defaultPossible = accept && defaultAuthSecret;

  if (defaultPossible) {
    return defaultAuthSecret;
  }

  if (defaultAuthSecret) {
    const keep = await confirm({
      message: "Do you want to use the existing auth secret?",
      default: true,
    });
    if (keep) {
      return defaultAuthSecret;
    }
  }

  const authSecret = randomBytes(32).toString("hex");
  const random = await confirm({
    message: "Do you want to use a randomly generated auth secret?",
    default: true,
  });
  if (random) {
    return authSecret;
  }

  return password({
    message: "What is the auth secret to encrypt your user sessions?",
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
