import type { SettlemintClient, Workspace } from "@settlemint/sdk-js";
import { spinner } from "@settlemint/sdk-utils/terminal";

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
export async function workspaceSpinner(settlemint: SettlemintClient): Promise<Workspace[]> {
  return spinner({
    startMessage: "Loading your workspaces",
    stopMessage: "Loaded your workspaces",
    task: async () => {
      return settlemint.workspace.list();
    },
  });
}
