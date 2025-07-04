import { createExamples } from "@/utils/commands/create-examples";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";

export function hardhatScriptLocalCommand() {
  return new Command("local")
    .description("Run a Hardhat script on a local development network.")
    .requiredOption("-s, --script <script>", 'The script to run with Hardhat , e.g. "scripts/deploy.ts"')
    .option("--no-compile", "Don't compile before running this task")
    .usage(
      createExamples([
        {
          description: "Run a Hardhat script on a local network",
          command: "scs hardhat script local --script scripts/deploy.ts",
        },
      ]),
    )
    .action(async ({ script, compile }) => {
      intro("Running Hardhat script on local network");
      await validateIfRequiredPackagesAreInstalled(["hardhat"]);

      const { command, args } = await getPackageManagerExecutable();
      await executeCommand(command, [
        ...args,
        "hardhat",
        "run",
        script,
        "--network",
        "localhost",
        ...(compile ? ["--no-compile"] : []),
      ]);
      outro("Script execution completed successfully");
    });
}
