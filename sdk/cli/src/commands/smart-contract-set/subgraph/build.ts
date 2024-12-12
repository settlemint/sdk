import { instancePrompt } from "@/commands/connect/instance.prompt";
import { missingAccessTokenError } from "@/error/missing-config-error";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import isInCi from "is-in-ci";
import { isGenerated } from "./utils/is-generated";
import { subgraphSetup } from "./utils/setup";
import { getSubgraphYamlFile } from "./utils/subgraph-config";

export function subgraphBuildCommand() {
  return new Command("build")
    .description("Build the subgraph")
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .action(async ({ acceptDefaults, prod }) => {
      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
      if (!accessToken) {
        return missingAccessTokenError();
      }
      const instance = await instancePrompt(env, true);
      const settlemintClient = createSettleMintClient({
        accessToken,
        instance,
      });

      const generated = await isGenerated();
      await subgraphSetup({
        isGenerated: generated,
        env,
        settlemintClient,
        autoAccept,
      });

      const cwd = generated ? process.cwd() : "./subgraph";
      const { command, args } = await getPackageManagerExecutable();
      const subgraphYamlFile = await getSubgraphYamlFile();
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], { cwd });
      await executeCommand(command, [...args, "graph", "build", subgraphYamlFile], { cwd });
    });
}
