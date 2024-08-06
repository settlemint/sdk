import { Command } from "@commander-js/extra-typings";
import { greenBright } from "yoctocolors";
import { printAsciiArt, printCancel, printIntro, printNote, printOutro, printSpinner } from "../lib/cli-message";
import { config } from "../lib/config";
import { createGqlClient } from "../lib/graphql";
import { createRestClient } from "../lib/rest";
import { writeTsConfig } from "../lib/tsconfig";

/**
 * Creates and returns the 'codegen' command for the BTP SDK CLI.
 * This command generates the code for using the BTP services in the user's project.
 *
 * @returns {Command} The configured 'codegen' command
 */
export function codegenCommand() {
  return (
    new Command("codegen")
      // Set the command description
      .description("Generates the code for using the BTP services")
      // Add an option for specifying the environment
      .option("-e, --environment <id>", "The name of the environment to use (BTP_ENVIRONMENT environment variable)")
      // Define the action to be executed when the command is run
      .action(async ({ environment }) => {
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

          const { pat, defaultEnvironment, environments } = cfg;

          // Check if environments are defined in the configuration
          if (!environments) {
            throw new Error("No environments found in configuration");
          }

          // Determine the environment to use
          const environmentConfig = environments[process.env.BTP_ENVIRONMENT ?? environment ?? defaultEnvironment];
          if (!environmentConfig) {
            throw new Error("No environment found");
          }
          const { portalRest, portal, graph, hasura } = environmentConfig;

          let usageMessage = "";

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

            usageMessage += `
To use the Portal REST client:

${greenBright("import { portal } from './.btp/portal/rest'")}
`;
          }

          if (portal) {
            await printSpinner({
              startMessage: "Generating the Portal GQL client",
              task: async () => {
                // Create the Portal REST client
                await createGqlClient({
                  framework: cfg.framework,
                  type: "portal",
                  gqlUrl: portal,
                  personalAccessToken: pat,
                });
              },
              stopMessage: "Portal GQL client generated",
            });

            usageMessage += `
To use the Portal GQL client:

${greenBright("import { portal } from './.btp/portal/gql'")}
`;
          }

          if (graph) {
            await printSpinner({
              startMessage: "Generating the The Graph GQL client",
              task: async () => {
                // Create the Portal REST client
                await createGqlClient({
                  framework: cfg.framework,
                  type: "thegraph",
                  gqlUrl: graph,
                  personalAccessToken: pat,
                });
              },
              stopMessage: "The Graph GQL client generated",
            });

            usageMessage += `
To use the The Graph GQL client:

${greenBright("import { thegraph } from './.btp/thegraph/gql'")}
`;
          }

          if (hasura) {
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
                  gqlUrl: hasura,
                  personalAccessToken: pat,
                  hasuraAdminSecret: adminSecret,
                });
              },
              stopMessage: "Hasura GQL client generated",
            });

            usageMessage += `
To use the Hasura GQL client:

${greenBright("import { hasura } from './.btp/hasura/gql'")}
`;
          }

          await printSpinner({
            startMessage: "Modifying configuration files",
            task: async () => {
              writeTsConfig();
            },
            stopMessage: "Configuration files modified",
          });

          printNote(usageMessage, "Usage hints");

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
