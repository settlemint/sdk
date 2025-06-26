import { cancel, executeCommand } from "@settlemint/sdk-utils/terminal";
import which from "which";

export async function executeFoundryCommand(command: "forge" | "anvil", args: string[]) {
  try {
    await which(command);
  } catch (_error) {
    cancel(
      "Foundry is not installed. Instructions to install Foundry can be found here: https://book.getfoundry.sh/getting-started/installation",
    );
  }
  return executeCommand(command, args);
}
