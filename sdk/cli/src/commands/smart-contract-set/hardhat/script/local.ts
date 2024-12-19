import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";

export function hardhatScriptLocalCommand() {
  return new Command("local")
    .description("Run a Hardhat script to deploy a contract on the platform or interact with a deployed contract.")
    .requiredOption("-s, --script <script>", 'The script to run with Hardhat , e.g. "scripts/deploy.ts"')
    .option("--no-compile", "Don't compile before running this task")
    .action(async ({ script, compile }) => {
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
    });
}
