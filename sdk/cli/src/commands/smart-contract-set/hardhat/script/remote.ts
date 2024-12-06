import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";

export function hardhatScriptRemoteCommand() {
  const build = new Command("remote")
    .description("Run a Hardhat script to deploy a contract on the platform or interact with a deployed contract.")
    .requiredOption("-s, --script <script>", 'The script to run with Hardhat , e.g. "scripts/deploy.ts"');

  build.action(async ({ script }) => {
    const env = await fetch(`${process.env.BTP_CLUSTER_MANAGER_URL}/ide/foundry/${process.env.BTP_SCS_ID}/env`, {
      headers: {
        "x-auth-token": process.env.BTP_SERVICE_TOKEN!,
      },
    });
    const envText = await env.text();

    const envVars = envText.split("\n").map((line) => line.trim());
    for (const envVar of envVars) {
      const [key, value] = envVar.split("=");
      process.env[key as string] = value;
    }
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(command, [...args, "hardhat", "run", script, "--network", "btp"]);
  });

  return build;
}
