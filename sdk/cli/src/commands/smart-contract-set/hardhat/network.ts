import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";

export function hardhatNetworkCommand() {
  const network = new Command("network");
  network.description("Start a development network using Hardhat");
  network.action(async () => {
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(command, [...args, "hardhat", "node"]);
  });

  return network;
}
