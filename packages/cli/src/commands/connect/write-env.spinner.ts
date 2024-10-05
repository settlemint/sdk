import { writeEnv } from "@settlemint/sdk-utils/environment";
import { spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Writes environment variables to .env files with a spinner for visual feedback.
 *
 * @param env - Partial environment variables to be written.
 * @param environment - The name of the environment (e.g., "development", "production").
 * @returns A promise that resolves when the environment variables are written.
 * @throws If there's an error writing the environment files.
 *
 * @example
 * await writeEnvSpinner(
 *   { SETTLEMINT_INSTANCE: "https://example.com", SETTLEMINT_ACCESS_TOKEN: "token123" },
 *   "development"
 * );
 */
export async function writeEnvSpinner(env: Partial<DotEnv>, environment: string) {
  return spinner({
    startMessage: `Saving .env.${environment} and .env.${environment}.local files`,
    stopMessage: `Written .env.${environment} and .env.${environment}.local file`,
    task: async () => {
      await writeEnv(
        {
          SETTLEMINT_INSTANCE: env.SETTLEMINT_INSTANCE,
          SETTLEMINT_WORKSPACE: env.SETTLEMINT_WORKSPACE,
          SETTLEMINT_APPLICATION: env.SETTLEMINT_APPLICATION,
        },
        environment,
        false,
      );

      await writeEnv(
        {
          SETTLEMINT_ACCESS_TOKEN: env.SETTLEMINT_ACCESS_TOKEN,
        },
        environment,
        true,
      );
    },
  });
}
