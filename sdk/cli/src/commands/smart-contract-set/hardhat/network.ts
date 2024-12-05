import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";

export function hardhatNetworkCommand() {
  const network = new Command("network");
  network.description("Start a development network using Hardhat");
  network.action(async () => {
    await $`npx hardhat node`;
  });

  return network;
}
