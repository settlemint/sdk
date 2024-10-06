import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { workspaceSpinner } from "@/commands/connect/workspaces.spinner";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";
import { bold, italic, underline } from "yoctocolors";
import { applicationPrompt } from "./connect/application.prompt";
import { hasuraPrompt } from "./connect/hasura.prompt";
import { instancePrompt } from "./connect/instance.prompt";
import { portalPrompt } from "./connect/portal.prompt";
import { servicesSpinner } from "./connect/services.spinner";
import { theGraphPrompt } from "./connect/thegraph.prompt";
import { workspacePrompt } from "./connect/workspace.prompt";

/**
 * Creates and returns the 'connect' command for the SettleMint SDK.
 * This command initializes the setup of the SettleMint SDK in the user's project.
 * It guides the user through a series of prompts to configure their environment,
 * select services, and set up necessary files.
 *
 * @returns {Command} The configured 'connect' command
 */
export function connectCommand(): Command {
  return (
    new Command("connect")
      // Add options for various configuration parameters
      .option("-e, --environment <environment>", "The name of your environment, defaults to development", "development")
      .option("-a, --accept", "Accept the default and previously set values")
      // Set the command description
      .description("Connects your project to your application on SettleMint")
      // Define the action to be executed when the command is run
      .action(async ({ environment, accept }) => {
        intro(`Connecting your dApp's ${italic(underline(bold(environment)))} environment to SettleMint`);

        const env: Partial<DotEnv> = await loadEnv(false);

        const accessToken = await accessTokenPrompt(env, !!accept || isInCi);
        const instance = await instancePrompt(env, !!accept || isInCi);

        const settlemint = createSettleMintClient({
          accessToken,
          instance,
        });

        const workspaces = await workspaceSpinner(settlemint);

        const workspace = await workspacePrompt(env, workspaces, !!accept || isInCi);
        const application = await applicationPrompt(env, workspace?.applications ?? [], !!accept || isInCi);

        const {
          blockchainNetworks,
          blockchainNodes,
          middleware,
          integrationTool,
          storage,
          privateKey,
          insights,
          customDeployment,
        } = await servicesSpinner(settlemint, application);

        const hasura = await hasuraPrompt(env, integrationTool, !!accept || isInCi);
        const thegraph = await theGraphPrompt(env, middleware, !!accept || isInCi);
        const portal = await portalPrompt(env, middleware, !!accept || isInCi);

        await writeEnvSpinner(
          {
            SETTLEMINT_ACCESS_TOKEN: accessToken,
            SETTLEMINT_INSTANCE: instance,
            SETTLEMINT_WORKSPACE: workspace.id,
            SETTLEMINT_APPLICATION: application.id,
            SETTLEMINT_HASURA: hasura?.id,
            SETTLEMINT_HASURA_ENDPOINT: hasura?.endpoints.find((endpoint) => endpoint.id === "graphql")?.displayValue,
            SETTLEMINT_HASURA_ADMIN_SECRET: hasura?.credentials.find((credential) => credential.id === "admin-secret")
              ?.displayValue,
            SETTLEMINT_THEGRAPH: thegraph?.id,
            SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT: thegraph?.endpoints.find((endpoint) => endpoint.id === "graphql")
              ?.displayValue,
            SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT_FALLBACK: thegraph?.endpoints.find(
              (endpoint) => endpoint.id === "default-subgraph-graphql",
            )?.displayValue,
            SETTLEMINT_PORTAL: portal?.id,
            SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT: portal?.endpoints.find((endpoint) => endpoint.id === "graphql")
              ?.displayValue,
            SETTLEMINT_PORTAL_REST_ENDPOINT: portal?.endpoints.find((endpoint) => endpoint.id === "rest")?.displayValue,
          },
          environment,
        );

        outro("Connected to SettleMint");
      })
  );
}
