import { dirname } from "node:path";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { serviceNotRunningError } from "@/error/service-not-running-error";
import { deleteConfirmationPrompt } from "@/prompts/delete-confirmation.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { subgraphPrompt } from "@/prompts/smart-contract-set/subgraph.prompt";
import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getGraphEndpoint } from "@/utils/get-cluster-service-endpoint";
import { getTheGraphMiddleware } from "@/utils/subgraph/setup";
import { getSubgraphYamlFile } from "@/utils/subgraph/subgraph-config";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { retryWhenFailed } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";

export function subgraphRemoveCommand() {
  return new Command("remove")
    .description("Remove a subgraph")
    .usage(
      createExamples([
        {
          description: "Remove a subgraph",
          command: "scs subgraph remove my-subgraph",
        },
      ]),
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .option("-f, --force", "Force remove the subgraph without confirmation")
    .argument("[subgraph-name]", "The name of the subgraph to remove (defaults to value in .env if not provided)")
    .action(async (subgraphName, { prod, acceptDefaults, force }) => {
      intro("Removing subgraph");

      await validateIfRequiredPackagesAreInstalled(["@graphprotocol/graph-cli"]);

      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const selectedSubgraphs = subgraphName
        ? [subgraphName]
        : await subgraphPrompt({
            env,
            accept: autoAccept,
            message: "Which subgraph do you want to remove?",
          });
      const graphName = selectedSubgraphs[0];

      if (!force) {
        await deleteConfirmationPrompt(`the subgraph ${graphName}`);
      }

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

      const subgraphYamlFile = await getSubgraphYamlFile();
      const cwd = dirname(subgraphYamlFile);

      const { command, args } = await getPackageManagerExecutable();
      const middlewareAdminUrl = new URL(
        `/${encodeURIComponent(accessToken)}/admin`,
        theGraphMiddleware.serviceUrl,
      ).toString();

      await executeCommand(command, [...args, "graph", "remove", "--node", middlewareAdminUrl, graphName]);

      const settlemintClient = createSettleMintClient({
        accessToken,
        instance,
      });

      const graphEndpoints = await spinner({
        startMessage: "Waiting for subgraph to be removed",
        task: () =>
          retryWhenFailed(
            async () => {
              const middleware = await settlemintClient.middleware.read(theGraphMiddleware.uniqueName);
              const endpoints = await getGraphEndpoint(settlemintClient, middleware);
              if (endpoints.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?.some((endpoint) => endpoint.endsWith(graphName))) {
                throw new Error(
                  `Subgraph '${graphName}' not removed from middleware '${theGraphMiddleware.uniqueName}'`,
                );
              }
              return endpoints;
            },
            5,
            5_000,
          ),
        stopMessage: "Waiting finished",
      });

      await writeEnvSpinner(!!prod, {
        ...env,
        SETTLEMINT_THEGRAPH: theGraphMiddleware.uniqueName,
        ...graphEndpoints,
        SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH:
          env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH === graphName ? undefined : env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH,
      });
      outro(`Subgraph ${graphName} removed successfully`);
    });
}
