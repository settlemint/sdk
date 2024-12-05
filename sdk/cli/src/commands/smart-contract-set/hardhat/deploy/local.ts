import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";

export function hardhatDeployLocalCommand() {
  const build = new Command("local")
    .description("Deploy the smart contracts using Hardhat/ignition to the local development network")
    .requiredOption(
      "-m, --module <ignitionmodule>",
      'The module to deploy with Ignition, e.g. "ignition/modules/Counter.ts"',
    )
    .option("-r, --reset", "Reset the deployment")
    .option("--verify", "Verify the deployment");

  build.action(async ({ module, reset, verify }) => {
    await executeCommand(
      "npx",
      [
        "hardhat",
        "ignition",
        "deploy",
        ...(reset ? ["--reset"] : []),
        ...(verify ? ["--verify"] : []),
        "--network",
        "localhost",
        module,
      ].filter(Boolean),
    );
  });

  return build;
}
