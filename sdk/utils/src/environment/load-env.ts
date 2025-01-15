import { join } from "node:path";
import { cancel } from "@/terminal.js";
import { type DotEnv, type DotEnvPartial, DotEnvSchema, DotEnvSchemaPartial, validate } from "@/validation.js";
import { config } from "@dotenvx/dotenvx";

/**
 * Loads environment variables from .env files.
 * To enable encryption with dotenvx (https://www.dotenvx.com/docs) run `bunx dotenvx encrypt`
 *
 * @param validateEnv - Whether to validate the environment variables against the schema
 * @param prod - Whether to load production environment variables
 * @param path - Optional path to the directory containing .env files. Defaults to process.cwd()
 * @returns A promise that resolves to the validated environment variables
 * @throws Will throw an error if validation fails and validateEnv is true
 * @example
 * import { loadEnv } from '@settlemint/sdk-utils/environment';
 *
 * // Load and validate environment variables
 * const env = await loadEnv(true, false);
 * console.log(env.SETTLEMINT_INSTANCE);
 *
 * // Load without validation
 * const rawEnv = await loadEnv(false, false);
 */
export async function loadEnv<T extends boolean = true>(
  validateEnv: T,
  prod: boolean,
  path: string = process.cwd(),
): Promise<T extends true ? DotEnv : DotEnvPartial> {
  return loadEnvironmentEnv(validateEnv, !!prod, path);
}

async function loadEnvironmentEnv<T extends boolean = true>(
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
