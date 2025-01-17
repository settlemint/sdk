import type { SettlemintClient, Workspace } from "@settlemint/sdk-js";
import { spinner } from "@settlemint/sdk-utils/terminal";

/**
 * Fetches the list of workspaces from the SettleMint platform with a loading spinner.
 *
 * @param settlemint - The SettleMint client instance to use for API calls.
 * @returns A promise that resolves to an array of Workspace objects.
 * @throws If there's an error fetching the workspaces.
 */
export async function loginSpinner(settlemint: SettlemintClient): Promise<Workspace[]> {
  return spinner({
    startMessage: "Logging in to your SettleMint account",
    stopMessage: "Connection successful",
    task: async () => {
      return settlemint.workspace.list();
    },
  });
}
