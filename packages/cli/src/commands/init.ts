import { Command } from "@commander-js/extra-typings";
import { type ConfigEnv, config, createConfig, createEnv, detectFramework } from "@settlemint/btp-sdk-config";
import { greenBright } from "yoctocolors";
import pkg from "../../package.json";
import {
  printAsciiArt,
  printCancel,
  printIntro,
  printNote,
  printOutro,
  printSpinner,
  promptConfirm,
} from "../lib/cli-message.js";
import { type Works, getServices } from "../lib/cluster-manager.js";
import { coerceSelect, coerceText } from "../lib/coerce.js";
import { updateGitignore } from "../lib/gitignore.js";
import { addDependencies } from "../lib/package-json.js";
import { install } from "../lib/package-manager.js";

/**
 * Creates and returns the 'init' command for the BTP SDK CLI.
 * This command initializes the setup of the BTP SDK in the user's project.
 * It guides the user through a series of prompts to configure their environment,
 * select services, and set up necessary files.
 *
 * @returns {Command} The configured 'init' command
 */
export function initCommand(): Command {
  return (
    new Command("init")
      // Add options for various configuration parameters
      .option("-p, --pat <key>", "Personal Access Token for authentication (BTP_PAT_TOKEN environment variable)")
      .option(
        "-i, --instance <url>",
        "The url to your BTP instance, defaults to https://console.settlemint.com (BTP_INSTANCE_URL environment variable)",
      )
      .option(
        "-au, --appUrl <url>",
        "The development url to your application, defaults to http://localhost:3000 (NEXT_PUBLIC_BTP_APP_URL environment variable)",
      )
      .option("-w, --workspace <id>", "The id of the workspace to use (BTP_WORKSPACE environment variable)")
      .option(
        "-cw, --childWorkspace <id>",
        "The id of the child workspace to use (BTP_CHILD_WORKSPACE environment variable)",
      )
      .option("-e, --environment <id>", "The name of the environment to use (BTP_ENVIRONMENT environment variable)")
      .option("-a, --application <id>", "The id of the application to use (BTP_APPLICATION environment variable)")
      .option("-pr, --portalRest <url>", "The url to the portal rest api (BTP_PORTAL_REST_URL environment variable)")
      .option("-pg, --portalGql <url>", "The url to the portal gql api (BTP_PORTAL_GQL_URL environment variable)")
      .option("-tg, --theGraph <url>", "The url to the graph gql api (BTP_THE_GRAPH_GQL_URL environment variable)")
      .option("-h, --hasura <url>", "The url to the hasura gql api (BTP_HASURA_GQL_URL environment variable)")
      .option("-n, --node <url>", "The url to the node rpc api (BTP_NODE_URL environment variable)")
      .option("-c, --create", "Create a new environment if it does not exist (BTP_CREATE environment variable)")
      // Set the command description
      .description("Initializes the setup of the BTP SDK")
      // Define the action to be executed when the command is run
      .action(
        async ({
          pat,
          instance,
          appUrl,
          portalRest,
          portalGql,
          theGraph,
          hasura,
          node,
          workspace,
          application,
          childWorkspace,
          environment,
          create,
        }) => {
          printAsciiArt();
          printIntro("Setting up the BTP SDK in your project");
          try {
            // Attempt to load existing configuration
            let cfg: ConfigEnv | undefined;
            try {
              cfg = await config();
            } catch {
              // Invalid config, continue with undefined cfg
            }

            // Framework selection
            const selectedFramework = await detectFramework();

            // Personal Access Token input
            const personalAccessToken = await coerceText({
              type: "password",
              envValue: process.env.BTP_PAT_TOKEN,
              cliParamValue: pat,
              configValue: cfg?.pat,
              validate: (value) => /^sm_pat_[a-f0-9]{16}$/.test(value?.trim() ?? ""),
              promptMessage: "Enter a Personal Access Token for authentication",
              existingMessage: "A valid Personal Access Token is already provided. Do you want to change it?",
              invalidMessage: "Invalid Personal Access Token",
            });

            // BTP instance URL input
            const instanceUrl = await coerceText({
              type: "text",
              envValue: process.env.BTP_INSTANCE_URL,
              cliParamValue: instance,
              defaultValue: "https://console.settlemint.com",
              configValue: cfg?.instance,
              validate: (value) => new URL(value ?? "").protocol === "https:",
              promptMessage: "Enter the URL of your BTP instance",
              existingMessage: "A valid BTP instance URL is already provided. Do you want to change it?",
              invalidMessage: "Invalid BTP instance URL. Please enter a valid HTTPS URL.",
            });

            // Environment handling
            const possibleEnvironments = Object.keys(cfg?.environments ?? {});
            if (possibleEnvironments.length === 0) {
              possibleEnvironments.push("development");
            }

            // Determine if a new environment should be created
            let createEnvironment = !!process.env.BTP_CREATE || !!create;
            if (!createEnvironment) {
              createEnvironment = await promptConfirm({
                message: `Do you want to create a new environment? (${possibleEnvironments.join(", ")})`,
                initialValue: false,
              });
            }

            // Environment selection or creation
            let currentEnvironment: string | undefined;
            if (!createEnvironment) {
              // Select existing environment
              currentEnvironment = await coerceSelect({
                options: possibleEnvironments.map((penv) => ({
                  value: penv,
                  label: penv,
                })),
                envValue: process.env.BTP_ENVIRONMENT,
                cliParamValue: environment,
                configValue: cfg?.defaultEnvironment,
                validate: (value) => !!value?.trim(),
                promptMessage: "Select an environment to configure",
                existingMessage: "A valid default environment is already provided. Do you want to add one?",
                skipCoerce: true,
              });
            } else {
              // Create new environment
              currentEnvironment = await coerceText({
                type: "text",
                envValue: process.env.BTP_ENVIRONMENT,
                cliParamValue: undefined,
                configValue: undefined,
                validate: (value) => !!value?.trim() && !possibleEnvironments.includes(value),
                promptMessage: "Enter a new environment name",
                existingMessage: "A valid environment name is already provided. Do you want to change it?",
                invalidMessage: "Invalid environment name or it already exists. Please enter a valid name.",
              });
              possibleEnvironments.push(currentEnvironment);
            }

            // Exit if no environment is selected
            if (!currentEnvironment) {
              throw new Error("No environment selected");
            }

            // Application URL input (only for Next.js)
            let selectedAppUrl: string | undefined;
            if (selectedFramework === "nextjs") {
              selectedAppUrl = await coerceText({
                type: "text",
                envValue: process.env.NEXT_PUBLIC_BTP_APP_URL,
                cliParamValue: appUrl,
                defaultValue: "http://localhost:3000",
                configValue: cfg?.appUrl,
                validate: (value) => !!new URL(value ?? "").toString(),
                promptMessage: "Enter the development URL of your application instance",
                existingMessage: "A valid application URL is already provided. Do you want to change it?",
                invalidMessage: "Invalid application instance URL. Please enter a valid URL.",
              });
            }

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
              options: services.map((service) => ({
                value: service,
                label: service.name,
              })),
              envValue: services.find((svc) => svc.id === process.env.BTP_WORKSPACE),
              cliParamValue: services.find((svc) => svc.id === workspace),
              configValue: services.find((svc) => svc.id === cfg?.environments?.[currentEnvironment]?.workspace),
              validate: (value) => !!value?.id,
              promptMessage: "Select a top level workspace",
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
              const options = list.map((childWorkspace) => ({
                value: childWorkspace,
                label: childWorkspace.name,
              }));
              selectedChildWorkspace = await coerceSelect({
                options,
                envValue: list.find((svc) => svc.id === process.env.BTP_CHILD_WORKSPACE),
                cliParamValue: list.find((svc) => svc.id === childWorkspace),
                configValue: list.find((svc) => svc.id === cfg?.environments?.[currentEnvironment]?.childWorkspace),
                validate: (value) => !!value?.id,
                promptMessage: "Select a child workspace",
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
              options: lowestWorkspace.applications.map((app) => ({ value: app, label: app.name })),
              envValue: lowestWorkspace.applications.find((svc) => svc.id === process.env.BTP_APPLICATION),
              cliParamValue: lowestWorkspace.applications.find((svc) => svc.id === application),
              configValue: lowestWorkspace.applications.find(
                (svc) => svc.id === cfg?.environments?.[currentEnvironment]?.application,
              ),
              validate: (value) => !!value?.id,
              promptMessage: "Select an application",
              existingMessage: "A valid application is already provided. Do you want to change it?",
            });

            // Exit if no application is selected
            if (!selectedApplication) {
              throw new Error("No application selected");
            }

            // Portal REST URL selection
            const portalRestUrl = await coerceSelect({
              options: selectedApplication.portals.map((portal) => ({
                value: portal.restUrl,
                label: `${portal.name} (${portal.uniqueName})`,
              })),
              noneOption: { value: undefined, label: "None" },
              envValue: process.env.BTP_PORTAL_REST_URL,
              cliParamValue: portalRest,
              configValue: cfg?.environments?.[currentEnvironment]?.portalRest,
              validate: (value) => !!new URL(value ?? "").toString(),
              promptMessage: "Select your Smart Contract Set Portal instance (REST API)",
              existingMessage:
                "A valid Smart Contract Set Portal instance URL for REST is already provided. Do you want to change it?",
            });

            // Portal GraphQL URL selection
            const portalGqlUrl = await coerceSelect({
              options: selectedApplication.portals.map((portal) => ({
                value: portal.gqlUrl,
                label: `${portal.name} (${portal.uniqueName})`,
              })),
              noneOption: { value: undefined, label: "None" },
              envValue: process.env.BTP_PORTAL_GQL_URL,
              cliParamValue: portalGql,
              configValue: cfg?.environments?.[currentEnvironment]?.portal,
              validate: (value) => !!new URL(value ?? "").toString(),
              promptMessage: "Select your Smart Contract Set Portal instance (GraphQL API)",
              existingMessage:
                "A valid Smart Contract Set Portal instance URL for GraphQL is already provided. Do you want to change it?",
            });

            // The Graph GraphQL URL selection
            const thegraphGqlUrl = await coerceSelect({
              options: selectedApplication.graphs.map((graph) => ({
                value: graph.gqlUrl,
                label: `${graph.name} (${graph.uniqueName})`,
              })),
              noneOption: { value: undefined, label: "None" },
              envValue: process.env.BTP_THE_GRAPH_GQL_URL,
              cliParamValue: theGraph,
              configValue: cfg?.environments?.[currentEnvironment]?.graph,
              validate: (value) => !!new URL(value ?? "").toString(),
              promptMessage: "Select your The Graph instance",
              existingMessage: "A valid The Graph URL is already provided. Do you want to change it?",
            });

            // Hasura URL selection
            const hasuras = selectedApplication.hasuras.map((hasura) => ({
              value: { gqlUrl: hasura.gqlUrl, adminSecret: hasura.adminSecret },
              label: `${hasura.name} (${hasura.uniqueName})`,
            }));
            const hasuraUrl = await coerceSelect({
              options: hasuras,
              noneOption: { value: undefined, label: "None" },
              envValue: hasuras.find((h) => h.value.gqlUrl === process.env.BTP_HASURA_GQL_URL)?.value,
              cliParamValue: hasuras.find((h) => h.value.gqlUrl === hasura)?.value,
              configValue: hasuras.find((h) => h.value.gqlUrl === cfg?.environments?.[currentEnvironment]?.hasura)
                ?.value,
              validate: (value) => !!new URL(value?.gqlUrl ?? "").toString(),
              promptMessage: "Select your Hasura instance",
              existingMessage: "A valid Hasura URL is already provided. Do you want to change it?",
            });

            // Node URL selection
            const nodeUrl = await coerceSelect({
              options: selectedApplication.nodes.map((node) => ({
                value: node.rpcUrl,
                label: `${node.name} (${node.uniqueName})`,
              })),
              noneOption: { value: undefined, label: "None" },
              envValue: process.env.BTP_NODE_URL,
              cliParamValue: node,
              configValue: cfg?.environments?.[currentEnvironment]?.node,
              validate: (value) => !!new URL(value ?? "").toString(),
              promptMessage: "Select a blockchain node or loadbalancer",
              existingMessage: "A valid blockchain node URL is already provided. Do you want to change it?",
            });

            const defaultEnvironment = await coerceSelect({
              options: possibleEnvironments.map((penv) => ({
                value: penv,
                label: penv,
              })),
              configValue: cfg?.defaultEnvironment,
              validate: (value) => !!value?.trim(),
              promptMessage: "Select a default environment (used when no environment is specified)",
              existingMessage:
                "A valid default environment is already provided. Do you want to select a different one?",
            });

            if (!defaultEnvironment) {
              throw new Error("No default environment selected");
            }

            await printSpinner({
              startMessage: "Creating or updating the .env.local file",
              task: async () => {
                await createEnv({
                  BTP_PAT_TOKEN: personalAccessToken,
                  NEXT_PUBLIC_BTP_APP_URL: selectedAppUrl,
                  BTP_HASURA_GQL_ADMIN_SECRET: hasuraUrl?.adminSecret ?? undefined,
                });
              },
              stopMessage: ".env.local file created or updated",
            });

            await printSpinner({
              startMessage: "Creating or updating the .btprc.json config file",
              task: async () => {
                await createConfig({
                  defaultEnvironment: defaultEnvironment,
                  framework: selectedFramework,
                  instance: instanceUrl,
                  environments: {
                    [currentEnvironment]: {
                      workspace: selectedWorkspace.id,
                      childWorkspace: selectedChildWorkspace?.id,
                      application: selectedApplication.id,
                      portal: portalGqlUrl,
                      portalRest: portalRestUrl,
                      graph: thegraphGqlUrl,
                      hasura: hasuraUrl?.gqlUrl,
                      node: nodeUrl,
                    },
                  },
                });
              },
              stopMessage: ".btprc.json config file created or updated",
            });

            await printSpinner({
              startMessage: "Modifying configuration files",
              task: async () => {
                updateGitignore();
              },
              stopMessage: "Configuration files modified",
            });

            await printSpinner({
              startMessage: "Installing dependencies",
              task: async () => {
                if (portalRestUrl) {
                  await addDependencies({ "openapi-fetch": pkg.peerDependencies["openapi-fetch"] });
                }
                if (!!portalGqlUrl || !!thegraphGqlUrl || !!hasuraUrl) {
                  await addDependencies({
                    graphql: pkg.peerDependencies.graphql,
                    "graphql-request": pkg.peerDependencies["graphql-request"],
                  });
                }

                await install();
              },
              stopMessage: "Dependencies installed",
            });

            printNote(
              `To generate the code for using the BTP services, run the following command:

${greenBright("btp-sdk-cli codegen")}

or for another environment:

${greenBright(`btp-sdk-cli codegen -e <${possibleEnvironments.join(" | ")}>`)}`,
              "Next steps",
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
