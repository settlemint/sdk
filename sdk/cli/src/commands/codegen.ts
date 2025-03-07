import { codegenHasura } from "@/commands/codegen/codegen-hasura";
import { codegenPortal } from "@/commands/codegen/codegen-portal";
import { codegenTheGraph } from "@/commands/codegen/codegen-the-graph";
import { codegenTsconfig } from "@/commands/codegen/codegen-tsconfig";
import { subgraphPrompt } from "@/prompts/smart-contract-set/subgraph.prompt";
import { createExamples } from "@/utils/commands/create-examples";
import { Command } from "@commander-js/extra-typings";
import { generateOutput } from "@gql.tada/cli-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { codegenBlockscout } from "./codegen/codegen-blockscout";
import { codegenIpfs, shouldCodegenIpfs } from "./codegen/codegen-ipfs";
import { codegenMinio, shouldCodegenMinio } from "./codegen/codegen-minio";

/**
 * Creates and returns the 'codegen' command for the SettleMint SDK.
 * This command generates TypeScript types and queries for GraphQL schemas and REST APIs.
 * It reads the environment configuration and generates code for configured services
 * like Hasura, Portal, TheGraph, Blockscout, Minio and IPFS.
 *
 * @returns {Command} The configured 'codegen' command
 */
export function codegenCommand(): Command {
  return (
    new Command("codegen")
      .option("--prod", "Connect to your production environment")
      .option(
        "--thegraph-subgraph-names <subgraph-names...>",
        "The name(s) of the TheGraph subgraph(s) to generate (skip if you want to generate all)",
      )
      // Set the command description
      .description("Generate GraphQL and REST types and queries")
      .usage(
        createExamples([
          {
            description: "Generate GraphQL types and queries for your dApp",
            command: "codegen",
          },
          {
            description: "Generate GraphQL types and queries for specific TheGraph subgraphs",
            command: "codegen --thegraph-subgraph-names subgraph1 subgraph2",
          },
        ]),
      )
      // Define the action to be executed when the command is run
      .action(async ({ prod, thegraphSubgraphNames }) => {
        intro("Generating GraphQL types and queries for your dApp");
        const env: DotEnv = await loadEnv(true, !!prod);

        if (!Array.isArray(thegraphSubgraphNames)) {
          thegraphSubgraphNames = await subgraphPrompt({
            env,
            accept: true,
            message: "Which The Graph subgraph do you want to generate types for?",
            allowAll: true,
          });
        }

        const { hasura, portal, thegraph, blockscout } = await spinner({
          startMessage: "Testing configured GraphQL schema",
          task: async () => {
            return codegenTsconfig(env, thegraphSubgraphNames);
          },
          stopMessage: "Tested GraphQL schemas",
        });

        if (hasura) {
          note("Generating Hasura resources");
          await codegenHasura(env);
        }
        if (portal) {
          note("Generating Portal resources");
          await codegenPortal(env);
        }
        if (thegraph) {
          note("Generating TheGraph resources");
          await codegenTheGraph(env, thegraphSubgraphNames);
        }
        if (blockscout) {
          note("Generating Blockscout resources");
          await codegenBlockscout(env);
        }
        if (shouldCodegenMinio(env)) {
          note("Generating Minio resources");
          await codegenMinio(env);
        }
        if (shouldCodegenIpfs(env)) {
          note("Generating IPFS resources");
          await codegenIpfs(env);
        }

        if (hasura || portal || thegraph || blockscout) {
          await generateOutput({
            output: undefined,
            tsconfig: undefined,
          });
        }

        outro("Codegen complete");
      })
  );
}
