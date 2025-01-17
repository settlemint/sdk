import type { SettlemintClient, Workspace } from "@settlemint/sdk-js";
import { spinner } from "@settlemint/sdk-utils/terminal";

/**
 * Lists workspaces with a spinner for visual feedback.
 *
 * @param settlemint - The SettleMint client instance
 * @returns A promise that resolves with the list of workspaces
 * @throws If there's an error fetching the workspaces
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
