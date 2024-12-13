import { cancel } from "@/terminal.js";
import { type DotEnv, type DotEnvPartial, DotEnvSchema, DotEnvSchemaPartial, validate } from "@/validation.js";
import { config } from "@dotenvx/dotenvx";
import { findRootSync } from "@manypkg/find-root";

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
 * In a monorepo setup, it first loads the root .env files, then overrides with package-specific ones.
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

  // Find monorepo root
  const cwd = process.cwd();
  let rootDir: string;
  try {
    rootDir = findRootSync(cwd).rootDir;
  } catch {
    rootDir = cwd;
  }

  // Load root .env files first
  const rootConfig = config({
    path: rootDir,
    convention: "nextjs",
    logLevel: "error",
    overload: true,
    quiet: true,
  });

  // Then load package-specific .env files (they will override root values)
  const packageConfig = config({
    path: cwd,
    convention: "nextjs",
    logLevel: "error",
    overload: true,
    quiet: true,
  });

  // Merge configurations, package values take precedence
  const parsed = {
    ...(rootConfig.parsed || {}),
    ...(packageConfig.parsed || {}),
  };

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
