import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";

export function foundryNetworkCommand() {
  const network = new Command("network");
  network.description("Start a development network Foundry/anvil");
  network.action(async () => {
    await executeCommand("anvil", []);
  });

  return network;
}
