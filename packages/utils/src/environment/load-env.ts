import { join } from "node:path";
import { projectRoot } from "@/filesystem.js";
import { cancel } from "@/terminal.js";
import { type DotEnv, DotEnvSchema, validate } from "@/validation.js";
import { config } from "@dotenvx/dotenvx";
import type { DotenvParseOutput } from "dotenv";

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
  validateEnv?: T,
): Promise<T extends true ? DotEnv : DotenvParseOutput> {
  return loadEnvironmentEnv(validateEnv ?? true);
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
  environment?: string,
  override?: boolean,
): Promise<T extends true ? DotEnv : DotenvParseOutput> {
  const projectDir = await projectRoot();

  const paths: string[] = [
    `.env.${process.env.NODE_ENV ?? "development"}.local`,
    ".env.local",
    ...(environment ? [`.env.${environment}.local`, `.env.${environment}`] : []),
    `.env.${process.env.NODE_ENV ?? "development"}`,
    ".env",
  ].map((file) => join(projectDir, file));

  let { parsed } = config({ path: paths, logLevel: "error", override: !!override });

  if (!parsed) {
    parsed = {};
  }

  const envToUse = environment || parsed.SETTLEMINT_ENVIRONMENT || "development";

  if (envToUse && envToUse !== environment) {
    return loadEnvironmentEnv(validateEnv, envToUse, true);
  }

  if (validateEnv) {
    try {
      return validate(DotEnvSchema, process.env);
    } catch (error) {
      cancel((error as Error).message);
    }
  }

  return parsed as T extends true ? DotEnv : DotenvParseOutput;
}
