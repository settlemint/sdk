import { Command } from "@commander-js/extra-typings";
import { runHardhat } from "../../../../lib/hardhat";

export function hardhatDeployLocalCommand() {
  const build = new Command("local")
    .description("Deploy the smart contracts using Hardhat/ignition to the local development network")
    .option("-m, --module <ignitionmodule>", 'The module to deploy with Ignition, e.g. "ignition/modules/Counter.ts"')
    .option("-r, --reset", "Reset the deployment");

  build.action(async ({ module, reset }) => {
    await runHardhat(
      `deploy ${reset ? "--reset" : ""}  --network localhost ${module ?? "ignition/modules/main.ts"}`,
      "deploy",
    );
  });

  return build;
}
