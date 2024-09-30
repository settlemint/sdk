import { printAsciiArt, printCancel, printIntro, printNote, printOutro, printSpinner } from "@/lib/cli-message";
import { type Works, getServices } from "@/lib/cluster-manager";
import { coerceSelect, coerceText } from "@/lib/coerce";
import { detectFramework } from "@/lib/framework";
import { updateGitignore } from "@/lib/git";
import { getExecutor, getPkgManager } from "@/lib/package-manager";
import { randomString } from "@/lib/random";
import { Command } from "@commander-js/extra-typings";
import { loadSettleMintConfig, loadSettleMintPartialEnvironmentConfig } from "@settlemint/sdk-config/loader";
import { createConfig, createEnv } from "@settlemint/sdk-config/writer";
import { greenBright } from "yoctocolors";

// TODO: Select an explorer for custom networks (and put it in the chain codegen)

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
      .option("-ds, --default-subgraph", "Use the default subgraph (starterkits)")
      .option(
        "-h, --hasura-gql <url>",
        "The url to the hasura gql api (SETTLEMINT_HASURA_GQL_URL environment variable)",
      )
      .option(
        "-n, --node-json-rpc <url>",
        "The url to the node rpc api (SETTLEMINT_NODE_JSON_RPC_URL environment variable)",
      )
      .option(
        "-cd, --custom-deployment <id>",
        "The id of the custom deployment where the application will be deployed to (SETTLEMINT_CUSTOM_DEPLOYMENT_ID environment variable)",
      )
      .option(
        "-as, --auth-secret <secret>",
        "The secret to use for authentication (SETTLEMINT_AUTH_SECRET environment variable, default is 32 random characters)",
      )
      .option(
        "-uw, --user-wallet <name>",
        "The name of the user wallet to use for the application (SETTLEMINT_USER_WALLET environment variable)",
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
          workspace,
          application,
          childWorkspace,
          defaultApplication,
          authSecret,
          userWallet,
          defaultSubgraph,
          customDeployment,
        }) => {
          printAsciiArt();
          printIntro("Setting up the SettleMint SDK in your project");
          try {
            // Attempt to load existing configuration
            const cfg = await loadSettleMintConfig();
            const envCfg = loadSettleMintPartialEnvironmentConfig();

            // Framework selection
            const selectedFramework = await detectFramework();

            // Personal Access Token input
            const personalAccessToken = await coerceText({
              type: "password",
              envValue: process.env.SETTLEMINT_PAT_TOKEN,
              cliParamValue: pat,
              configValue: envCfg?.SETTLEMINT_PAT_TOKEN,
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
                name: service.name,
              })),
              envValue: services.find((svc) => svc.id === process.env.SETTLEMINT_WORKSPACE),
              cliParamValue: services.find((svc) => svc.id === workspace),
              configValue: services.find((svc) => svc.id === cfg?.workspace.id),
              validate: (value) => services.some((svc) => svc.id === value?.id),
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
                name: childWorkspace.name,
              }));
              selectedChildWorkspace = await coerceSelect({
                choices,
                envValue: list.find((svc) => svc.id === process.env.SETTLEMINT_CHILD_WORKSPACE),
                cliParamValue: list.find((svc) => svc.id === childWorkspace),
                configValue: list.find((svc) => svc.id === cfg?.workspace?.id || svc.id === cfg?.childWorkspace?.id),
                validate: (value) => list.some((svc) => svc.id === value?.id),
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
              choices: lowestWorkspace.applications.map((app) => ({ value: app, name: app.name })),
              envValue: lowestWorkspace.applications.find((svc) => svc.id === process.env.SETTLEMINT_APPLICATION),
              cliParamValue: lowestWorkspace.applications.find((svc) => svc.id === application),
              validate: (value) => lowestWorkspace.applications.some((svc) => svc.id === value?.id),
              message: "Select an application",
              existingMessage: "A valid application is already provided. Do you want to change it?",
            });

            // Exit if no application is selected
            if (!selectedApplication) {
              throw new Error("No application selected");
            }

            // Application URL input (only for Next.js)
            let selectedAppUrl: string | undefined;
            let selectedAuthSecret: string | undefined;
            if (selectedFramework === "nextjs") {
              selectedAppUrl = await coerceText({
                type: "text",
                envValue: process.env.SETTLEMINT_APP_URL,
                cliParamValue: appUrl,
                defaultValue: "http://localhost:3000",
                configValue: envCfg?.SETTLEMINT_APP_URL,
                validate: (value) => !!new URL(value ?? "").toString(),
                promptMessage: "Enter the development URL of your application instance",
                existingMessage: "A valid application URL is already provided. Do you want to change it?",
                invalidMessage: "Invalid application instance URL. Please enter a valid URL.",
              });

              selectedAuthSecret = await coerceText({
                type: "password",
                envValue: process.env.SETTLEMINT_AUTH_SECRET,
                cliParamValue: authSecret,
                configValue: envCfg?.SETTLEMINT_AUTH_SECRET,
                defaultValue: randomString(32),
                validate: (value) => (value?.trim() ?? "").length === 32,
                promptMessage: "Enter a secret for authentication",
                existingMessage: "A valid authentication secret is already provided. Do you want to change it?",
                invalidMessage: "Invalid authentication secret",
              });
            }

            const configApplication = cfg?.applications?.[selectedApplication.id];

            // Portal REST URL selection
            const portalRestUrl = await coerceSelect({
              choices: selectedApplication.portals.map((portal) => ({
                value: portal.restUrl,
                name: `${portal.name} (${portal.uniqueName})`,
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
                name: `${portal.name} (${portal.uniqueName})`,
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
              choices: selectedApplication.graphs.map((graph) => {
                return {
                  value: graph.gqlUrl,
                  name: `${graph.name} (${graph.uniqueName})`,
                };
              }),
              noneOption: true,
              envValue: process.env.SETTLEMINT_THE_GRAPH_GQL_URL,
              cliParamValue: theGraphGql,
              configValue: configApplication?.thegraphGql,
              validate: (value) => !!new URL(value ?? "").toString(),
              message: "Select your The Graph instance",
              existingMessage: "A valid The Graph URL is already provided. Do you want to change it?",
            });

            let subgraphName: string | undefined;
            if (thegraphGqlUrl) {
              subgraphName = await coerceSelect({
                choices: [
                  {
                    value: thegraphGqlUrl.split("/").pop(),
                    name: `Custom subgraph (${thegraphGqlUrl.split("/").pop()})`,
                  },
                  {
                    value: "starterkits",
                    name: "Default subgraph (starterkits)",
                  },
                ],
                noneOption: false,
                cliParamValue: defaultSubgraph ? "starterkits" : undefined,
                configValue: configApplication?.subgraphName,
                validate: (value) => !!value?.trim(),
                message: "Select the subgraph to use",
                existingMessage: "A valid subgraph is already provided. Do you want to change it?",
              });
            }

            // Hasura URL selection
            const hasuras = selectedApplication.hasuras.map((hasura) => ({
              value: { gqlUrl: hasura.gqlUrl, adminSecret: hasura.adminSecret },
              name: `${hasura.name} (${hasura.uniqueName})`,
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
                name: `${node.name} (${node.uniqueName})`,
              })),
              noneOption: true,
              envValue: process.env.SETTLEMINT_NODE_JSON_RPC_URL,
              cliParamValue: nodeJsonRpc,
              configValue: configApplication?.nodeJsonRpc,
              validate: (value) => !!new URL(value ?? "").toString(),
              message: "Select a blockchain node or loadbalancer",
              existingMessage: "A valid blockchain node URL is already provided. Do you want to change it?",
            });

            const customDeploymentId = await coerceSelect({
              choices: selectedApplication.customDeployments.map((customDeployment) => ({
                value: customDeployment.id,
                name: `${customDeployment.name} (${customDeployment.uniqueName})`,
              })),
              noneOption: true,
              envValue: process.env.SETTLEMINT_CUSTOM_DEPLOYMENT_ID,
              cliParamValue: customDeployment,
              configValue: configApplication?.customDeploymentId,
              validate: (value) => selectedApplication.customDeployments.some((svc) => svc.id === value),
              message: "Select a custom deployment",
              existingMessage: "A valid custom deployment is already provided. Do you want to change it?",
            });

            const userWalletName = await coerceSelect({
              choices: selectedApplication.userWallets.map((uw) => ({
                value: uw.uniqueName,
                name: `${uw.name} (${uw.uniqueName})`,
              })),
              noneOption: true,
              envValue: process.env.SETTLEMINT_USER_WALLET,
              cliParamValue: userWallet,
              configValue: configApplication?.userWallet,
              validate: (value) => !!value?.trim(),
              message: "Select a HD private key to manage your user wallets",
              existingMessage: "A valid HD private key for user wallets is already provided. Do you want to change it?",
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
                  SETTLEMINT_APP_URL: selectedAppUrl,
                  SETTLEMINT_AUTH_SECRET: selectedAuthSecret,
                  SETTLEMINT_PAT_TOKEN: personalAccessToken,
                  SETTLEMINT_HASURA_GQL_ADMIN_SECRET: hasuraUrl?.adminSecret ?? undefined,
                });
              },
              stopMessage: ".env.local file created or updated",
            });

            await printSpinner({
              startMessage: "Creating or updating the settlemint.config.mjs config file",
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
                      subgraphName,
                      hasuraGql: hasuraUrl?.gqlUrl,
                      nodeJsonRpc: nodeUrl,
                      customDeploymentId,
                      userWallet: userWalletName,
                    },
                  },
                });
              },
              stopMessage: "settlemint.config.mjs config file created or updated",
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
