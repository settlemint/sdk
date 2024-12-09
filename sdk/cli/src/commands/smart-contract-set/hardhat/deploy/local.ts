import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";

export function hardhatDeployLocalCommand() {
  const build = new Command("local")
    .description("Deploy the smart contracts using Hardhat/ignition to the local development network")
    .option(
      "-m, --module <ignitionmodule>",
      'The module to deploy with Ignition, defaults to "ignition/modules/main.ts"',
    )
    .option("-r, --reset", "Reset the deployment")
    .option("--verify", "Verify the deployment");

  build.action(async ({ module, reset, verify }) => {
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(
      command,
      [
        ...args,
        "hardhat",
        "ignition",
        "deploy",
        ...(reset ? ["--reset"] : []),
        ...(verify ? ["--verify"] : []),
        "--network",
        "localhost",
        module ?? "ignition/modules/main.ts",
      ].filter(Boolean),
    );
  });

  return build;
}
