import { codegenHasura } from "@/commands/codegen/codegen-hasura";
import { codegenPortal } from "@/commands/codegen/codegen-portal";
import { codegenTheGraph } from "@/commands/codegen/codegen-the-graph";
import { codegenTheGraphFallback } from "@/commands/codegen/codegen-the-graph-fallback";
import { codegenTsconfig } from "@/commands/codegen/codegen-tsconfig";
import { Command } from "@commander-js/extra-typings";
import { generateOutput } from "@gql.tada/cli-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { installDependencies } from "@settlemint/sdk-utils/package-manager";
import { intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
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

        const { hasura, portal, thegraph, thegraphFallback } = await spinner({
          startMessage: "Testing configured GraphQL schema",
          task: async () => {
            return codegenTsconfig(env);
          },
          stopMessage: "Tested GraphQL schemas",
        });

        const packages = new Set<string>();
        packages.add("@settlemint/sdk-next");

        const promises = [];
        if (hasura) {
          promises.push(codegenHasura(env));
          packages.add("@settlemint/sdk-hasura");
        }
        if (portal) {
          promises.push(codegenPortal(env));
          packages.add("@settlemint/sdk-portal");
        }
        if (thegraph) {
          promises.push(codegenTheGraph(env));
          packages.add("@settlemint/sdk-thegraph");
        }
        if (thegraphFallback) {
          promises.push(codegenTheGraphFallback(env));
          packages.add("@settlemint/sdk-thegraph");
        }

        if (shouldCodegenMinio(env)) {
          promises.push(codegenMinio(env));
          packages.add("@settlemint/sdk-minio");
        }
        if (shouldCodegenIpfs(env)) {
          promises.push(codegenIpfs(env));
          packages.add("@settlemint/sdk-ipfs");
        }

        await Promise.all(promises);

        await generateOutput({
          output: undefined,
          tsconfig: undefined,
        });

        await spinner({
          startMessage: "Installing dependencies",
          task: async () => {
            await installDependencies([...packages]);
          },
          stopMessage: "Installed dependencies",
        });

        outro("Codegen complete");
      })
  );
}
