import { randomBytes } from "node:crypto";
import { printAsciiArt, printCancel, printIntro, printNote, printOutro, printSpinner } from "@/cli/lib/cli-message";
import { type Works, getServices } from "@/cli/lib/cluster-manager";
import { coerceSelect, coerceText } from "@/cli/lib/coerce";
import { config } from "@/cli/lib/config/config";
import { createConfig } from "@/cli/lib/config/create-config";
import { createEnv } from "@/cli/lib/config/create-env";
import { detectFramework } from "@/cli/lib/framework";
import { updateGitignore } from "@/cli/lib/git";
import { getExecutor, getPkgManager } from "@/cli/lib/package-manager";
import type { ConfigEnv } from "@/common/config/schemas";
import { Command } from "@commander-js/extra-typings";
import { greenBright } from "yoctocolors";

/**
 * Creates and returns the 'connect' command for the SettleMint SDK.
 * This command initializes the setup of the SettleMint SDK in the user's project.
 * It guides the user through a series of prompts to configure their environment,
 * select services, and set up necessary files.
 *
 * @returns {Command} The configured 'init' command
 */
export function connectCommand(): Command {
  return (
    new Command("connect")
      // Add options for various configuration parameters
      .option("-p, --pat <key>", "Personal Access Token for authentication (SETTLEMINT_PAT_TOKEN environment variable)")
      .option(
        "-i, --instance <url>",
        "The url to your SettleMint instance, defaults to https://console.settlemint.com (SETTLEMINT_INSTANCE_URL environment variable)",
      )
      .option(
        "-au, --app-url <url>",
        "The development url to your application, defaults to http://localhost:3000 (SETTLEMINT_APP_URL environment variable)",
      )
      .option("-w, --workspace <id>", "The id of the workspace to use (SETTLEMINT_WORKSPACE environment variable)")
      .option(
        "-cw, --child-workspace <id>",
        "The id of the child workspace to use (SETTLEMINT_CHILD_WORKSPACE environment variable)",
      )
      .option(
        "-a, --application <id>",
        "The id of the application to use (SETTLEMINT_APPLICATION environment variable)",
      )
      .option(
        "-da, --default-application <id>",
        "The id of the default application (SETTLEMINT_DEFAULT_APPLICATION environment variable)",
      )
      .option(
        "-pr, --portal-rest <url>",
        "The url to the portal rest api (SETTLEMINT_PORTAL_REST_URL environment variable)",
      )
      .option(
        "-pg, --portal-gql <url>",
        "The url to the portal gql api (SETTLEMINT_PORTAL_GQL_URL environment variable)",
      )
      .option(
        "-tg, --the-graph-gql <url>",
        "The url to the graph gql api (SETTLEMINT_THE_GRAPH_GQL_URL environment variable)",
      )
      .option(
        "-h, --hasura-gql <url>",
        "The url to the hasura gql api (SETTLEMINT_HASURA_GQL_URL environment variable)",
      )
      .option(
        "-n, --node-json-rpc <url>",
        "The url to the node rpc api (SETTLEMINT_NODE_JSON_RPC_URL environment variable)",
      )
      .option(
        "-nd, --node-json-rpc-deploy <url>",
        "The url to the node rpc api for deployment (SETTLEMINT_NODE_JSON_RPC_URL_DEPLOY environment variable)",
      )
      .option(
        "-c, --session-secret <secret>",
        "The secret to use to encrypt the session, 32 characters (SETTLEMINT_AUTH_SECRET environment variable)",
      )
      .option(
        "-wc, --wallet-connect <id>",
        "The project id to use for Wallet Connect (WALLET_CONNECT_PROJECT_ID environment variable)",
      )
      // Set the command description
      .description("Connects your project to your application on SettleMint")
      // Define the action to be executed when the command is run
      .action(
        async ({
          pat,
          instance,
          appUrl,
          portalRest,
          portalGql,
          theGraphGql,
          hasuraGql,
          nodeJsonRpc,
          nodeJsonRpcDeploy,
          workspace,
          application,
          childWorkspace,
          defaultApplication,
          sessionSecret,
          walletConnect,
        }) => {
          printAsciiArt();
          printIntro("Setting up the SettleMint SDK in your project");
          try {
            // Attempt to load existing configuration
            let cfg: ConfigEnv | undefined;
            try {
              cfg = config();
            } catch {
              // Invalid config, continue with undefined cfg
            }

            // Framework selection
            const selectedFramework = await detectFramework();

            // Personal Access Token input
            const personalAccessToken = await coerceText({
              type: "password",
              envValue: process.env.SETTLEMINT_PAT_TOKEN,
              cliParamValue: pat,
              configValue: cfg?.pat,
              validate: (value) => /^sm_pat_[a-f0-9]{16}$/.test(value?.trim() ?? ""),
              promptMessage: "Enter a Personal Access Token for authentication",
              existingMessage: "A valid Personal Access Token is already provided. Do you want to change it?",
              invalidMessage: "Invalid Personal Access Token",
            });

            // SettleMint instance URL input
            const instanceUrl = await coerceText({
              type: "text",
              envValue: process.env.SETTLEMINT_INSTANCE_URL,
              cliParamValue: instance,
              defaultValue: "https://console.settlemint.com",
              configValue: cfg?.instance,
              validate: (value) => new URL(value ?? "").protocol === "https:",
              promptMessage: "Enter the URL of your SettleMint instance",
              existingMessage: "A valid SettleMint instance URL is already provided. Do you want to change it?",
              invalidMessage: "Invalid SettleMint instance URL. Please enter a valid HTTPS URL.",
            });

            // Fetch services
            const services = await printSpinner({
              startMessage: "Fetching services",
              task: async () => {
                return getServices({ instance: instanceUrl, pat: personalAccessToken });
              },
              stopMessage: "Services fetched",
            });

            // Exit if no workspaces are found
            if (services.length === 0) {
              throw new Error("No workspaces found using the provided personal access token");
            }

            // Workspace selection
            const selectedWorkspace = await coerceSelect({
              choices: services.map((service) => ({
                value: service,
                label: service.name,
              })),
              envValue: services.find((svc) => svc.id === process.env.SETTLEMINT_WORKSPACE),
              cliParamValue: services.find((svc) => svc.id === workspace),
              configValue: services.find((svc) => svc.id === cfg?.workspace.id),
              validate: (value) => !!services.find((svc) => svc.id === value?.id),
              message: "Select a top level workspace",
              existingMessage: "A valid top level workspace is already provided. Do you want to change it?",
            });

            // Exit if no workspace is selected
            if (!selectedWorkspace) {
              throw new Error("No workspace selected");
            }

            let lowestWorkspace = selectedWorkspace;

            // Child workspace selection (if available)
            let selectedChildWorkspace: Works | undefined;
            if (selectedWorkspace.childWorkspaces.length > 0) {
              const list = [
                { ...selectedWorkspace, name: `Top level: ${selectedWorkspace.name}` },
                ...selectedWorkspace.childWorkspaces,
              ];
              const choices = list.map((childWorkspace) => ({
                value: childWorkspace,
                label: childWorkspace.name,
              }));
              selectedChildWorkspace = await coerceSelect({
                choices,
                envValue: list.find((svc) => svc.id === process.env.SETTLEMINT_CHILD_WORKSPACE),
                cliParamValue: list.find((svc) => svc.id === childWorkspace),
                configValue: list.find((svc) => svc.id === cfg?.childWorkspace?.id),
                validate: (value) => !!list.find((svc) => svc.id === value?.id),
                message: "Select a child workspace",
                existingMessage: "A valid child workspace is already provided. Do you want to change it?",
              });

              // Exit if no sub-workspace is selected
              if (!selectedChildWorkspace) {
                throw new Error("No sub-workspace selected");
              }

              lowestWorkspace = selectedChildWorkspace;
            }

            // Exit if no applications are found
            if (lowestWorkspace.applications.length === 0) {
              throw new Error("No applications found using the provided personal access token and workspace");
            }

            // Application selection
            const selectedApplication = await coerceSelect({
              choices: lowestWorkspace.applications.map((app) => ({ value: app, label: app.name })),
              envValue: lowestWorkspace.applications.find((svc) => svc.id === process.env.SETTLEMINT_APPLICATION),
              cliParamValue: lowestWorkspace.applications.find((svc) => svc.id === application),
              validate: (value) => !!lowestWorkspace.applications.find((svc) => svc.id === value?.id),
              message: "Select an application",
              existingMessage: "A valid application is already provided. Do you want to change it?",
            });

            // Exit if no application is selected
            if (!selectedApplication) {
              throw new Error("No application selected");
            }

            // Application URL input (only for Next.js)
            let selectedAppUrl: string | undefined;
            let selectedSessionSecret: string | undefined;
            let selectedWalletConnectProjectId: string | undefined;
            if (selectedFramework === "nextjs") {
              selectedAppUrl = await coerceText({
                type: "text",
                envValue: process.env.SETTLEMINT_APP_URL,
                cliParamValue: appUrl,
                defaultValue: "http://localhost:3000",
                configValue: cfg?.appUrl,
                validate: (value) => !!new URL(value ?? "").toString(),
                promptMessage: "Enter the development URL of your application instance",
                existingMessage: "A valid application URL is already provided. Do you want to change it?",
                invalidMessage: "Invalid application instance URL. Please enter a valid URL.",
              });

              selectedSessionSecret = await coerceText({
                type: "password",
                envValue: process.env.SETTLEMINT_AUTH_SECRET,
                cliParamValue: sessionSecret,
                configValue: cfg?.sessionSecret ?? randomBytes(16).toString("hex"),
                validate: (value) => (value?.trim() ?? "").length === 32,
                promptMessage: "Enter a secret to encrypt the session",
                existingMessage:
                  "A valid session secret is already provided or was auto generated for you. Do you want to change it?",
                invalidMessage: "Invalid session secret",
              });

              selectedWalletConnectProjectId = await coerceText({
                type: "text",
                envValue: process.env.WALLET_CONNECT_PROJECT_ID,
                cliParamValue: walletConnect,
                configValue: cfg?.walletConnectProjectId,
                validate: (value) => (value?.trim() ?? "").length > 0,
                promptMessage:
                  "Enter the Wallet Connect project id, get one for free at https://cloud.walletconnect.com",
                existingMessage: "A valid Wallet Connect project id is already provided. Do you want to change it?",
                invalidMessage: "Invalid Wallet Connect project id. Please enter a valid project id.",
              });
            }

            const configApplication = cfg?.applications?.[selectedApplication.id];

            // Portal REST URL selection
            const portalRestUrl = await coerceSelect({
              choices: selectedApplication.portals.map((portal) => ({
                value: portal.restUrl,
                label: `${portal.name} (${portal.uniqueName})`,
              })),
              noneOption: true,
              envValue: process.env.SETTLEMINT_PORTAL_REST_URL,
              cliParamValue: portalRest,
              configValue: configApplication?.portalRest,
              validate: (value) => !!new URL(value ?? "").toString(),
              message: "Select your Smart Contract Set Portal instance (REST API)",
              existingMessage:
                "A valid Smart Contract Set Portal instance URL for REST is already provided. Do you want to change it?",
            });

            // Portal GraphQL URL selection
            const portalGqlUrl = await coerceSelect({
              choices: selectedApplication.portals.map((portal) => ({
                value: portal.gqlUrl,
                label: `${portal.name} (${portal.uniqueName})`,
              })),
              noneOption: true,
              envValue: process.env.SETTLEMINT_PORTAL_GQL_URL,
              cliParamValue: portalGql,
              configValue: configApplication?.portalGql,
              validate: (value) => !!new URL(value ?? "").toString(),
              message: "Select your Smart Contract Set Portal instance (GraphQL API)",
              existingMessage:
                "A valid Smart Contract Set Portal instance URL for GraphQL is already provided. Do you want to change it?",
            });

            // The Graph GraphQL URL selection
            const thegraphGqlUrl = await coerceSelect({
              choices: selectedApplication.graphs.map((graph) => ({
                value: graph.gqlUrl,
                label: `${graph.name} (${graph.uniqueName})`,
              })),
              noneOption: true,
              envValue: process.env.SETTLEMINT_THE_GRAPH_GQL_URL,
              cliParamValue: theGraphGql,
              configValue: configApplication?.thegraphGql,
              validate: (value) => !!new URL(value ?? "").toString(),
              message: "Select your The Graph instance",
              existingMessage: "A valid The Graph URL is already provided. Do you want to change it?",
            });

            // Hasura URL selection
            const hasuras = selectedApplication.hasuras.map((hasura) => ({
              value: { gqlUrl: hasura.gqlUrl, adminSecret: hasura.adminSecret },
              label: `${hasura.name} (${hasura.uniqueName})`,
            }));
            const hasuraUrl = await coerceSelect({
              choices: hasuras,
              noneOption: true,
              envValue: hasuras.find((h) => h.value.gqlUrl === process.env.SETTLEMINT_HASURA_GQL_URL)?.value,
              cliParamValue: hasuras.find((h) => h.value.gqlUrl === hasuraGql)?.value,
              configValue: hasuras.find((h) => h.value.gqlUrl === configApplication?.hasuraGql)?.value,
              validate: (value) => !!new URL(value?.gqlUrl ?? "").toString(),
              message: "Select your Hasura instance",
              existingMessage: "A valid Hasura URL is already provided. Do you want to change it?",
            });

            // Node URL selection
            const nodeUrl = await coerceSelect({
              choices: selectedApplication.nodes.map((node) => ({
                value: node.rpcUrl,
                label: `${node.name} (${node.uniqueName})`,
              })),
              noneOption: true,
              envValue: process.env.SETTLEMINT_NODE_JSON_RPC_URL,
              cliParamValue: nodeJsonRpc,
              configValue: configApplication?.nodeJsonRpc,
              validate: (value) => !!new URL(value ?? "").toString(),
              message: "Select a blockchain node or loadbalancer",
              existingMessage: "A valid blockchain node URL is already provided. Do you want to change it?",
            });

            const nodeDeployUrl = await coerceSelect({
              choices: selectedApplication.nodes.map((node) => ({
                value: node.rpcUrl,
                label: `${node.name} (${node.uniqueName})`,
              })),
              noneOption: true,
              envValue: process.env.SETTLEMINT_NODE_JSON_RPC_URL_DEPLOY,
              cliParamValue: nodeJsonRpcDeploy,
              configValue: configApplication?.nodeJsonRpcDeploy,
              validate: (value) => !!new URL(value ?? "").toString(),
              message: "Select a blockchain node for deployment",
              existingMessage:
                "A valid blockchain node URL for deployment is already provided. Do you want to change it?",
            });

            const possibleApplications = cfg?.applications ?? {};
            if (!possibleApplications[selectedApplication.id]) {
              possibleApplications[selectedApplication.id] = {
                application: {
                  id: selectedApplication.id,
                  displayName: selectedApplication.name,
                },
              };
            }

            const selectedDefaultApplication = await coerceSelect({
              choices: Object.values(possibleApplications).map((penv) => ({
                value: penv.application,
                label: penv.application.displayName,
              })),
              envValue: possibleApplications[defaultApplication ?? selectedApplication.id]?.application,
              configValue: cfg?.defaultApplication,
              validate: (value) => !!value?.id,
              message:
                "Select a default application (used when no application is specified on the command line or environment variable)",
              existingMessage:
                "A valid default environment is already provided. Do you want to select a different one?",
            });

            if (!selectedDefaultApplication) {
              throw new Error("No default environment selected");
            }

            await printSpinner({
              startMessage: "Creating or updating the .env.local file",
              task: async () => {
                await createEnv({
                  SETTLEMINT_PAT_TOKEN: personalAccessToken,
                  SETTLEMINT_APP_URL: selectedAppUrl,
                  NEXTAUTH_URL: selectedAppUrl,
                  SETTLEMINT_HASURA_GQL_ADMIN_SECRET: hasuraUrl?.adminSecret ?? undefined,
                  SETTLEMINT_AUTH_SECRET: selectedSessionSecret,
                  WALLET_CONNECT_PROJECT_ID: selectedWalletConnectProjectId,
                });
              },
              stopMessage: ".env.local file created or updated",
            });

            await printSpinner({
              startMessage: "Creating or updating the .settlemintrc.json config file",
              task: async () => {
                await createConfig({
                  defaultApplication: selectedDefaultApplication,
                  framework: selectedFramework,
                  instance: instanceUrl,
                  workspace: {
                    id: selectedWorkspace.id,
                    displayName: selectedWorkspace.name,
                  },
                  ...(selectedChildWorkspace && {
                    childWorkspace: {
                      id: selectedChildWorkspace?.id,
                      displayName: selectedChildWorkspace?.name,
                    },
                  }),
                  applications: {
                    [selectedApplication.id]: {
                      application: {
                        id: selectedApplication.id,
                        displayName: selectedApplication.name,
                      },
                      portalGql: portalGqlUrl,
                      portalRest: portalRestUrl,
                      thegraphGql: thegraphGqlUrl,
                      hasuraGql: hasuraUrl?.gqlUrl,
                      nodeJsonRpc: nodeUrl,
                      nodeJsonRpcDeploy: nodeDeployUrl,
                    },
                  },
                });
              },
              stopMessage: ".settlemintrc.json config file created or updated",
            });

            await printSpinner({
              startMessage: "Modifying configuration files",
              task: async () => {
                updateGitignore();
              },
              stopMessage: "Configuration files modified",
            });

            printNote(
              `To generate the code for using the SettleMint services, run the following command:

${greenBright(`${getExecutor(getPkgManager())} settlemint codegen`)}

or for another environment:

${greenBright(
  `${getExecutor(getPkgManager())} settlemint codegen -a <${Object.values(possibleApplications)
    .map((app) => app.application.id)
    .join(" | ")}>`,
)}`,
            );

            printOutro("You're all set!");
          } catch (error) {
            printCancel(`Error: ${(error as Error).message}`);
            console.error((error as Error).stack);
            process.exit(1);
          }
          process.exit(0);
        },
      )
  );
}
