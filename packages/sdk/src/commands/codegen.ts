import { Command } from "@commander-js/extra-typings";
import { greenBright } from "yoctocolors";
import { printAsciiArt, printCancel, printIntro, printNote, printOutro, printSpinner } from "../lib/cli-message";
import { config } from "../lib/config";
import { createGqlClient } from "../lib/graphql";
import { createRestClient } from "../lib/rest";
import { writeTsConfig } from "../lib/tsconfig";
import { createViemClient } from "../lib/viem";
import { createWagmiClient } from "../lib/wagmi";

/**
 * Creates and returns the 'codegen' command for the SettleMint SDK.
 * This command generates the code for using the SettleMint services in the user's project.
 *
 * @returns {Command} The configured 'codegen' command
 */
export function codegenCommand(): Command {
  return (
    new Command("codegen")
      // Set the command description
      .description("Generates the code for using the SettleMint services")
      // Add an option for specifying the environment
      .option(
        "-a, --application <id>",
        "The name of the environment to use (SETTLEMINT_APPLICATION environment variable)",
      )
      // Define the action to be executed when the command is run
      .action(async ({ application }) => {
        // Display ASCII art and intro message
        printAsciiArt();
        printIntro("Code generating");

        try {
          // Fetch the configuration
          const cfg = await config();

          // Check if configuration exists
          if (!cfg) {
            throw new Error("No configuration found");
          }

          const { pat, defaultApplication, applications } = cfg;

          // Check if environments are defined in the configuration
          if (!applications || Object.keys(applications).length === 0) {
            throw new Error("No environments found in configuration");
          }

          // Determine the environment to use
          const environmentConfig =
            applications[process.env.SETTLEMINT_APPLICATION ?? application ?? defaultApplication.id];
          if (!environmentConfig) {
            throw new Error("No environment found");
          }
          const { portalRest, portalGql, thegraphGql, hasuraGql, nodeJsonRpc } = environmentConfig;

          // Generate Portal REST client if portalRest is defined
          if (portalRest) {
            await printSpinner({
              startMessage: "Generating the Portal REST client",
              task: async () => {
                // Create the Portal REST client
                await createRestClient({ framework: cfg.framework, restURL: portalRest, personalAccessToken: pat });
              },
              stopMessage: "Portal REST client generated",
            });
          }

          if (portalGql) {
            await printSpinner({
              startMessage: "Generating the Portal GQL client",
              task: async () => {
                // Create the Portal REST client
                await createGqlClient({
                  framework: cfg.framework,
                  type: "portal",
                  gqlUrl: portalGql,
                  personalAccessToken: pat,
                });
              },
              stopMessage: "Portal GQL client generated",
            });
          }

          if (thegraphGql) {
            await printSpinner({
              startMessage: "Generating the The Graph GQL client",
              task: async () => {
                // Create the Portal REST client
                await createGqlClient({
                  framework: cfg.framework,
                  type: "thegraph",
                  gqlUrl: thegraphGql,
                  personalAccessToken: pat,
                });
              },
              stopMessage: "The Graph GQL client generated",
            });
          }

          if (hasuraGql) {
            const adminSecret = cfg.hasuraAdminSecret;
            if (!adminSecret) {
              printCancel("No Hasura Admin Secret found");
              process.exit(1);
            }
            await printSpinner({
              startMessage: "Generating the Hasura GQL client",
              task: async () => {
                // Create the Portal REST client
                await createGqlClient({
                  framework: cfg.framework,
                  type: "hasura",
                  gqlUrl: hasuraGql,
                  personalAccessToken: pat,
                  hasuraAdminSecret: adminSecret,
                });
              },
              stopMessage: "Hasura GQL client generated",
            });
          }

          if (nodeJsonRpc) {
            await printSpinner({
              startMessage: "Generating the Viem client",
              task: async () => {
                // Create the Portal REST client
                await createViemClient({
                  framework: cfg.framework,
                  nodeUrl: nodeJsonRpc,
                  personalAccessToken: pat,
                });
              },
              stopMessage: "Viem client generated",
            });

            await printSpinner({
              startMessage: "Generating the Wagmi client",
              task: async () => {
                // Create the Portal REST client
                await createWagmiClient({
                  framework: cfg.framework,
                  nodeUrl: nodeJsonRpc,
                  personalAccessToken: pat,
                });
              },
              stopMessage: "Wagmi client generated",
            });
          }

          await printSpinner({
            startMessage: "Modifying configuration files",
            task: async () => {
              writeTsConfig();
            },
            stopMessage: "Configuration files modified",
          });

          printNote(
            greenBright("Read the documentation to learn how to use the generated SDK <link here>"),
            "Usage hints",
          );

          // Display completion message
          printOutro("Code generation complete");
        } catch (error) {
          // Handle and display any errors that occur during execution
          printCancel(`Error: ${(error as Error).message}`);
          console.error((error as Error).stack);
          process.exit(1);
        }
        process.exit(0);
      })
  );
}
