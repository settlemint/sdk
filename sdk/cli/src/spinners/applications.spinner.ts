import type { Application, SettlemintClient } from "@settlemint/sdk-js";
import { spinner } from "@settlemint/sdk-utils/terminal";

/**
 * Lists applications with a spinner for visual feedback.
 *
 * @param settlemint - The SettleMint client instance
 * @param workspaceUniqueName - The unique name of the workspace to list applications for
 * @returns A promise that resolves with the list of applications
 * @throws If there's an error fetching the applications
 */
export async function applicationsSpinner(
  settlemint: SettlemintClient,
  workspaceUniqueName: string,
): Promise<Application[]> {
  return spinner({
    startMessage: "Loading your applications",
    stopMessage: "Loaded your applications",
    task: async () => {
      return settlemint.application.list(workspaceUniqueName);
    },
  });
}
