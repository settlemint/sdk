import { instancePrompt } from "@/commands/connect/instance.prompt";
import { missingAccessTokenError } from "@/error/missing-config-error";
import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import isInCi from "is-in-ci";
import { subgraphSetup } from "./utils/setup";
import { getSubgraphYamlFile, isGenerated } from "./utils/subgraph-config";

export function subgraphCodegenCommand() {
  return new Command("codegen")
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .description("Codegen the subgraph types")
    .action(async ({ acceptDefaults, prod }) => {
      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
      if (!accessToken) {
        return missingAccessTokenError();
      }

      const instance = await instancePrompt(env, true);
      const generated = await isGenerated();
      await subgraphSetup({
        isGenerated: generated,
        env,
        instance,
        accessToken,
        autoAccept,
      });

      const cwd = generated ? process.cwd() : "./subgraph";
      const { command, args } = await getPackageManagerExecutable();
      const subgraphYamlFile = await getSubgraphYamlFile();
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], { cwd });
    });
}
