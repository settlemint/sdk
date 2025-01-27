import { cancel, executeCommand } from "@settlemint/sdk-utils/terminal";
import which from "which";

export async function executeForgeCommand(args: string[]) {
  try {
    await which("forge");
  } catch (error) {
    cancel(
      "Foundry is not installed. Instructions to install Foundry can be found here: https://book.getfoundry.sh/getting-started/installation",
    );
  }
  return executeCommand("forge", args);
}
