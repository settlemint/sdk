import { gqltadaSpinner } from "@/commands/codegen/gqltada.spinner";
import { Command } from "@commander-js/extra-typings";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { cancel, intro, outro } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { bold, italic, underline } from "yoctocolors";

/**
 * Creates and returns the 'connect' command for the SettleMint SDK.
 * This command initializes the setup of the SettleMint SDK in the user's project.
 * It guides the user through a series of prompts to configure their environment,
 * select services, and set up necessary files.
 *
 * @returns {Command} The configured 'connect' command
 */
export function codegenCommand(): Command {
  return (
    new Command("codegen")
      // Add options for various configuration parameters
      .option("-e, --environment <environment>", "The name of your environment, defaults to development", "development")
      // Set the command description
      .description("Generate GraphQL and REST types and queries")
      // Define the action to be executed when the command is run
      .action(async ({ environment }) => {
        intro(
          `Generating GraphQL types and queries for your dApp's ${italic(underline(bold(environment)))} environment`,
        );

        const env: DotEnv = await loadEnv();

        try {
          await gqltadaSpinner(env);
        } catch (error) {
          cancel((error as Error).message);
        }

        outro("Codegen complete");
      })
  );
}
