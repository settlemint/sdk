import { cancel } from "@/terminal.js";
import { type DotEnv, type DotEnvPartial, DotEnvSchema, DotEnvSchemaPartial, validate } from "@/validation.js";
import { config } from "@dotenvx/dotenvx";

/**
 * Loads environment variables from .env files.
 * To enable encryption with dotenvx (https://www.dotenvx.com/docs) run `bunx dotenvx encrypt`
 *
 * @returns A promise that resolves to the validated environment variables.
 * @throws Will throw an error if validation fails.
 *
 * @example
 * const env = await loadEnv();
 * console.log(env.SETTLEMINT_INSTANCE);
 */
export async function loadEnv<T extends boolean = true>(
  validateEnv: T,
  prod: boolean,
): Promise<T extends true ? DotEnv : DotEnvPartial> {
  return loadEnvironmentEnv(validateEnv, !!prod);
}

/**
 * Loads environment variables for a specific environment.
 *
 * @param environment - The environment to load variables for.
 * @param validateEnv - Whether to validate the environment variables.
 * @returns A promise that resolves to the environment variables, either validated or raw.
 * @throws Will throw an error if validation fails when validateEnv is true.
 */
export async function loadEnvironmentEnv<T extends boolean = true>(
  validateEnv: T,
  prod: boolean,
): Promise<T extends true ? DotEnv : DotEnvPartial> {
  if (prod) {
    process.env.NODE_ENV = "production";
  }
  let { parsed } = config({ convention: "nextjs", logLevel: "error" });

  if (!parsed) {
    parsed = {};
  }

  try {
    return validate(validateEnv ? DotEnvSchema : DotEnvSchemaPartial, {
      ...parsed,
      ...process.env,
    }) as T extends true ? DotEnv : DotEnvPartial;
  } catch (error) {
    cancel((error as Error).message);
    return {} as T extends true ? DotEnv : DotEnvPartial;
  }
}
