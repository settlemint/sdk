import { codegenHasura } from "@/commands/codegen/codegen-hasura";
import { codegenPortal } from "@/commands/codegen/codegen-portal";
import { codegenTheGraph } from "@/commands/codegen/codegen-the-graph";
import { codegenTsconfig } from "@/commands/codegen/codegen-tsconfig";
import { Command } from "@commander-js/extra-typings";
import { generateOutput } from "@gql.tada/cli-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { codegenBlockscout } from "./codegen/codegen-blockscout";
import { codegenIpfs, shouldCodegenIpfs } from "./codegen/codegen-ipfs";
import { codegenMinio, shouldCodegenMinio } from "./codegen/codegen-minio";

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

        const { hasura, portal, thegraph, blockscout } = await spinner({
          startMessage: "Testing configured GraphQL schema",
          task: async () => {
            return codegenTsconfig(env);
          },
          stopMessage: "Tested GraphQL schemas",
        });

        const promises: Promise<void>[] = [];
        if (hasura) {
          promises.push(codegenHasura(env));
        }
        if (portal) {
          promises.push(codegenPortal(env));
        }
        if (thegraph) {
          promises.push(codegenTheGraph(env));
        }
        if (blockscout) {
          promises.push(codegenBlockscout(env));
        }
        if (shouldCodegenMinio(env)) {
          promises.push(codegenMinio(env));
        }
        if (shouldCodegenIpfs(env)) {
          promises.push(codegenIpfs(env));
        }

        await Promise.all(promises);

        await generateOutput({
          output: undefined,
          tsconfig: undefined,
        });

        outro("Codegen complete");
      })
  );
}
