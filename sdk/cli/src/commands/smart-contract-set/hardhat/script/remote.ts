import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { ServiceNotConfiguredError } from "@/error/serviceNotConfiguredError";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";

export function hardhatScriptRemoteCommand() {
  const build = new Command("remote")
    .description("Run a Hardhat script to deploy a contract on the platform or interact with a deployed contract.")
    .requiredOption("-s, --script <script>", 'The script to run with Hardhat , e.g. "scripts/deploy.ts"')
    .option("--prod", "Connect to your production environment");

  build.action(async ({ script, prod }) => {
    const env = await loadEnv(false, !!prod);

    if (!env.SETTLEMINT_BLOCKCHAIN_NODE) {
      throw new ServiceNotConfiguredError("Blockchain node");
    }

    const accessToken = await accessTokenPrompt(env, true);
    const instance = await instancePrompt(env, true);
    const settlemint = createSettleMintClient({
      accessToken,
      instance,
    });

    const envConfig = await settlemint.foundry.env(env.SETTLEMINT_BLOCKCHAIN_NODE);
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(command, [...args, "hardhat", "run", script, "--network", "btp"], { env: envConfig });
  });

  return build;
}
