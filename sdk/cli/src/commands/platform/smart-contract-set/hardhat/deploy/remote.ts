import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";
import { isEmpty } from "lodash";

export function hardhatDeployRemoteCommand() {
  const build = new Command("remote")
    .description("Deploy the smart contracts using Hardhat/ignition to the remote network on the platform")
    .requiredOption(
      "-m, --module <ignitionmodule>",
      'The module to deploy with Ignition, e.g. "ignition/modules/Counter.ts"',
    )
    .option("--deployment-id <deploymentId>", "Set a custom deployment id")
    .option("-r, --reset", "Reset the deployment")
    .option("--verify", "Verify the deployment");

  build.action(async ({ module, reset, verify, deploymentId }) => {
    const env = await fetch(`${process.env.BTP_CLUSTER_MANAGER_URL}/ide/foundry/${process.env.BTP_SCS_ID}/env`, {
      headers: {
        "x-auth-token": process.env.BTP_SERVICE_TOKEN!,
      },
    });
    const envText = await env.text();

    const envVars = envText.split("\n").map((line) => line.trim());
    for (const envVar of envVars) {
      const [key, value] = envVar.split("=");
      process.env[key] = value;
    }

    if (isEmpty(process.env.BTP_FROM)) {
      throw new Error(
        "No private key is activated on the node to sign the transaction. Activate a private key on the node this smart contract set is connected to in the Private Keys section.",
      );
    }

    if (verify && isEmpty(process.env.ETHERSCAN_API_KEY)) {
      throw new Error(
        "It is not possible to verify the deployment on this network unless you supply an Etherscan API key in the hardht.config.ts file",
      );
    }

    await $`npx hardhat ignition deploy ${reset ? "--reset" : ""} ${verify ? "--verify" : ""} ${deploymentId ? `--deployment-id ${deploymentId}` : ""} --network btp ${module}`;
  });

  return build;
}
