import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";

export function foundryNetworkCommand() {
  const network = new Command("network");
  network.description("Start a development network Foundry/anvil");
  network.action(async () => {
    await $`anvil`;
  });

  return network;
}
