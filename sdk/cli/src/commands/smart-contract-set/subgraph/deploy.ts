import { dirname } from "node:path";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { serviceNotRunningError } from "@/error/service-not-running-error";
import { instancePrompt } from "@/prompts/instance.prompt";
import { subgraphNamePrompt } from "@/prompts/smart-contract-set/subgraph-name.prompt";
import { subgraphPrompt } from "@/prompts/smart-contract-set/subgraph.prompt";
import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getGraphEndpoint } from "@/utils/get-cluster-service-endpoint";
import { getTheGraphMiddleware, getTheGraphNetwork, subgraphSetup } from "@/utils/subgraph/setup";
import {
  getSubgraphConfig,
  getSubgraphYamlConfig,
  getSubgraphYamlFile,
  isGenerated,
  updateSubgraphYamlConfig,
} from "@/utils/subgraph/subgraph-config";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";
import { cancel } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";

export function subgraphDeployCommand() {
  return new Command("deploy")
    .description("Deploy the subgraph")
    .usage(
      createExamples([
        {
          description: "Deploy the subgraph",
          command: "scs subgraph deploy",
        },
        {
          description: "Deploy the subgraph with a specific name",
          command: "scs subgraph deploy my-subgraph",
        },
      ]),
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .argument("[subgraph-name]", "The name of the subgraph to deploy (defaults to value in .env if not provided)")
    .action(async (subgraphName, { prod, acceptDefaults }) => {
      intro("Deploying subgraph");
      await validateIfRequiredPackagesAreInstalled(["@graphprotocol/graph-cli"]);

      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const instance = await instancePrompt(env, true);
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance,
        prefer: "application",
      });

      const theGraphMiddleware = await getTheGraphMiddleware({ env, instance, accessToken, autoAccept });
      if (!theGraphMiddleware) {
        return nothingSelectedError("graph middleware");
      }
      if (theGraphMiddleware.status !== "COMPLETED") {
        serviceNotRunningError("graph middleware", theGraphMiddleware.status);
      }

      const network = await getTheGraphNetwork({ theGraphMiddleware, env, instance, accessToken });
      await subgraphSetup({
        network,
      });

      const subgraphYamlFile = await getSubgraphYamlFile();
      await updateSpecVersion(theGraphMiddleware.specVersion as string);

      const { command, args } = await getPackageManagerExecutable();
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], {
        cwd: dirname(subgraphYamlFile),
      });

      const generated = await isGenerated();
      if (generated) {
        const currentConfig = await getSubgraphConfig();
        if (
          !currentConfig ||
          currentConfig?.datasources.some((ds) => ds.address === "0x0000000000000000000000000000000000000000")
        ) {
          cancel(
            'The "subgraph/subgraph.config.json" config has not been set, ensure all the contracts listed have an address added',
          );
        }
      }

      let graphName: string | undefined;
      if (!subgraphName) {
        const selectedSubgraphs = await subgraphPrompt({
          env,
          accept: autoAccept,
          message: "Which subgraph do you want to deploy to?",
          allowNew: true,
        });
        graphName = selectedSubgraphs[0];
      } else {
        graphName = await subgraphNamePrompt({
          defaultName: subgraphName,
          env,
          accept: autoAccept,
        });
      }

      if (!graphName) {
        cancel("No subgraph name provided. Please provide a graph name to continue.");
      }

      const middlewareAdminUrl = new URL(
        `/${encodeURIComponent(accessToken)}/admin`,
        theGraphMiddleware.serviceUrl,
      ).toString();

      await executeCommand(command, [...args, "graph", "create", "--node", middlewareAdminUrl, graphName]);
      await executeCommand(command, [
        ...args,
        "graph",
        "deploy",
        "--version-label",
        `v1.0.${Date.now()}`,
        "--node",
        middlewareAdminUrl,
        "--ipfs",
        "https://ipfs.console.settlemint.com",
        graphName,
        subgraphYamlFile,
      ]);

      const settlemintClient = createSettleMintClient({
        accessToken,
        instance,
      });
      const middleware = await settlemintClient.middleware.read(theGraphMiddleware.uniqueName);
      const graphEndpoints = await getGraphEndpoint(settlemintClient, middleware, graphName);
      await writeEnvSpinner(!!prod, {
        ...env,
        SETTLEMINT_THEGRAPH: theGraphMiddleware.uniqueName,
        ...graphEndpoints,
      });
      outro(`Subgraph ${graphName} deployed successfully`);
    });
}

async function updateSpecVersion(specVersion: string) {
  const yamlConfig = await getSubgraphYamlConfig();
  yamlConfig.specVersion = specVersion;
  await updateSubgraphYamlConfig(yamlConfig);
}
