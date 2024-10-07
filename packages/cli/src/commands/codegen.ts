import { gqltadaSpinner } from "@/commands/codegen/gqltada.spinner";
import { Command } from "@commander-js/extra-typings";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { cancel, intro, outro } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

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
      .option("--prod", "Connect to your production environment")
      // Set the command description
      .description("Generate GraphQL and REST types and queries")
      // Define the action to be executed when the command is run
      .action(async ({ prod }) => {
        intro("Generating GraphQL types and queries for your dApp");

        const env: DotEnv = await loadEnv(true, !!prod);

        try {
          await gqltadaSpinner(env);
        } catch (error) {
          cancel((error as Error).message);
        }

        outro("Codegen complete");
      })
  );
}
