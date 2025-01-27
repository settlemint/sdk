import { createExamples } from "@/utils/commands/create-examples";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand } from "@settlemint/sdk-utils/terminal";

export function hardhatDeployLocalCommand() {
  return new Command("local")
    .description("Deploy the smart contracts using Hardhat/ignition to the local development network")
    .usage(
      createExamples([
        {
          description: "Deploy smart contracts to local network using Hardhat/Ignition",
          command: "scs hardhat deploy local",
        },
        {
          description: "Deploy a specific Ignition module",
          command: "scs hardhat deploy local --module ignition/modules/custom.ts",
        },
        {
          description: "Deploy with a clean deployment state",
          command: "scs hardhat deploy local --reset",
        },
        {
          description: "Deploy and verify contracts on Etherscan",
          command: "scs hardhat deploy local --verify",
        },
      ]),
    )
    .option(
      "-m, --module <ignitionmodule>",
      'The module to deploy with Ignition, defaults to "ignition/modules/main.ts"',
    )
    .option("-r, --reset", "Wipes the existing deployment state before deploying")
    .option("-v, --verify", "Verify the deployment on Etherscan")
    .action(async ({ module, reset, verify }) => {
      await validateIfRequiredPackagesAreInstalled(["hardhat"]);

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
}
