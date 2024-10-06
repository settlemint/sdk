import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { workspaceSpinner } from "@/commands/connect/workspaces.spinner";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro } from "@settlemint/sdk-utils/terminal";
import { bold, italic, underline } from "yoctocolors";
import { applicationPrompt } from "./connect/application.prompt";
import { instancePrompt } from "./connect/instance.prompt";
import { servicesSpinner } from "./connect/services.spinner";
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

        const accessToken = await accessTokenPrompt(env, !!accept);
        const instance = await instancePrompt(env, !!accept);

        const settlemint = createSettleMintClient({
          accessToken,
          instance,
        });

        const workspaces = await workspaceSpinner(settlemint);

        const workspace = await workspacePrompt(env, workspaces, !!accept);
        const application = await applicationPrompt(env, workspace?.applications ?? [], !!accept);

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

        // console.log({
        //   blockchainNetworks,
        //   blockchainNodes,
        //   middleware,
        //   integrationTool,
        //   storage,
        //   privateKey,
        //   insights,
        //   customDeployment,
        // });

        await writeEnvSpinner(
          {
            SETTLEMINT_ACCESS_TOKEN: accessToken,
            SETTLEMINT_INSTANCE: instance,
            SETTLEMINT_WORKSPACE: workspace.id,
            SETTLEMINT_APPLICATION: application.id,
          },
          environment,
        );

        outro("Connected to SettleMint");
      })
  );
}
