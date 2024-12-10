import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";
import { note } from "@settlemint/sdk-utils/terminal";

export function foundryFormatCommand() {
  const format = new Command("format");
  format.description("Format the smart contracts using Foundry/forge");
  format.action(async () => {
    await executeCommand("forge", ["fmt"]);
    note("Smart contract set formatted successfully!");
  });

  return format;
}
