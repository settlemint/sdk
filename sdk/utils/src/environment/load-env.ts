import { join } from "node:path";
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
  path: string = process.cwd(),
): Promise<T extends true ? DotEnv : DotEnvPartial> {
  return loadEnvironmentEnv(validateEnv, !!prod, path);
}

/**
 * Loads environment variables for a specific environment.
 *
 * @param environment - The environment to load variables for.
 * @param validateEnv - Whether to validate the environment variables.
 * @param path - The path to load the environment variables from.
 * @returns A promise that resolves to the environment variables, either validated or raw.
 * @throws Will throw an error if validation fails when validateEnv is true.
 */
export async function loadEnvironmentEnv<T extends boolean = true>(
  validateEnv: T,
  prod: boolean,
  path: string = process.cwd(),
): Promise<T extends true ? DotEnv : DotEnvPartial> {
  if (prod) {
    process.env.NODE_ENV = "production";
  }
  let { parsed } = config({
    convention: "nextjs",
    logLevel: "error",
    overload: true,
    quiet: true,
    path: join(path, ".env"),
  });

  if (!parsed) {
    parsed = {};
  }
  const defaultEnv = Object.fromEntries(
    Object.entries(process.env).filter(([_, value]) => typeof value === "string" && value !== ""),
  ) as Record<string, string>;
  try {
    return validate(validateEnv ? DotEnvSchema : DotEnvSchemaPartial, {
      ...parsed,
      ...defaultEnv,
    }) as T extends true ? DotEnv : DotEnvPartial;
  } catch (error) {
    cancel((error as Error).message);
    return {} as T extends true ? DotEnv : DotEnvPartial;
  }
}
