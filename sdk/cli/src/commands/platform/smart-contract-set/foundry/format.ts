import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";

export function foundryFormatCommand() {
  const format = new Command("format");
  format.description("Format the smart contracts using Foundry/forge");
  format.action(async () => {
    await $`forge fmt`;
  });

  return format;
}
