import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { printAsciiArt, printCancel, printIntro, printNote, printOutro, printSpinner } from "@/cli/lib/cli-message";
import { config } from "@/cli/lib/config/config";
import { findProjectRoot } from "@/common/path";
import { Command } from "@commander-js/extra-typings";
import { merge } from "ts-deepmerge";
import { greenBright } from "yoctocolors";
import { createChainConfig } from "../lib/codegen/chain";
import { createGqlClient } from "../lib/codegen/graphql";
import { createRestClient } from "../lib/codegen/rest";
import { writeTsConfig } from "../lib/codegen/tsconfig";
import { createViemClients } from "../lib/codegen/viem";

const formatObject = (obj: Record<string, unknown>, indent = 2): string => {
  const spaces = " ".repeat(indent);
  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return `${key}: {
${formatObject(value as Record<string, unknown>, indent + 2)}
${spaces}}`;
      }
      return `${key}: ${JSON.stringify(value)}`;
    })
    .join(`,\n${spaces}`);
};

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
          const cfg = config();

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
          const { portalRest, portalGql, thegraphGql, hasuraGql, nodeJsonRpc, nodeJsonRpcDeploy } = environmentConfig;

          await printSpinner({
            startMessage: "Generating SettleMint SDK",
            task: async () => {
              const settleMintDir = join(findProjectRoot(process.cwd()), ".settlemint");
              rmSync(settleMintDir, { recursive: true, force: true });
              mkdirSync(settleMintDir, { recursive: true });

              const sdkParts: Promise<
                { importLine: string | string[]; sdkLine: Record<string, unknown> } | undefined
              >[] = [];

              if (portalRest) {
                sdkParts.push(
                  createRestClient({
                    settleMintDir,
                    restURL: portalRest,
                    personalAccessToken: pat,
                  }),
                );
              }
              if (portalGql) {
                sdkParts.push(
                  createGqlClient({
                    settleMintDir,
                    framework: cfg.framework,
                    type: "portal",
                    gqlUrl: portalGql,
                    personalAccessToken: pat,
                  }),
                );
              }
              if (thegraphGql) {
                sdkParts.push(
                  createGqlClient({
                    settleMintDir,
                    framework: cfg.framework,
                    type: "thegraph",
                    gqlUrl: thegraphGql,
                    personalAccessToken: pat,
                  }),
                );
              }
              if (hasuraGql) {
                sdkParts.push(
                  createGqlClient({
                    settleMintDir,
                    framework: cfg.framework,
                    type: "hasura",
                    gqlUrl: hasuraGql,
                    personalAccessToken: pat,
                    hasuraAdminSecret: cfg.hasuraAdminSecret ?? "",
                  }),
                );
              }
              if (nodeJsonRpc || nodeJsonRpcDeploy) {
                sdkParts.push(
                  createChainConfig({
                    framework: cfg.framework,
                    nodeUrl: nodeJsonRpc,
                    personalAccessToken: pat,
                  }),
                );
              }
              if (nodeJsonRpc) {
                sdkParts.push(createViemClients());
              }

              const sdkPartsResolved = await Promise.all(sdkParts);

              const importLinesSet = new Set<string>();
              const sdkLinesObjects: Record<string, unknown>[] = [];

              for (const part of sdkPartsResolved) {
                if (part) {
                  if (Array.isArray(part.importLine)) {
                    for (const line of part.importLine) {
                      importLinesSet.add(line);
                    }
                  } else {
                    importLinesSet.add(part.importLine);
                  }
                  sdkLinesObjects.push(part.sdkLine);
                }
              }

              const importLines = Array.from(importLinesSet);
              const mergedSdkLines = sdkLinesObjects.reduce((acc, obj) => merge(acc, obj), {});

              const settlemintObject = JSON.parse(JSON.stringify(mergedSdkLines));

              writeFileSync(
                join(settleMintDir, "index.ts"),
                `
import { sdkGenerator, type ViemConfigParameters } from "@settlemint/sdk/browser";
${importLines.filter((line) => line.trim() !== "").join("\n")}

export const settlemint = (config?: {viem?: ViemConfigParameters}) => (${JSON.stringify(settlemintObject, null, 2)
                  .replace(/"([^"]+)":/g, "$1:") // Remove quotes from keys
                  .replace(/: "(.+)"/g, ": $1") // Remove outer quotes from values
                  .replace(/\\"/g, '"')});`,
              );

              writeTsConfig();
            },
            stopMessage: "SettleMint SDK generated",
          });

          // if (existsSync("./contracts")) {
          //   await printSpinner({
          //     startMessage: "Generating the wagmi hooks",
          //     task: async () => {
          //       await runWagmiCli("generate --config ./.settlemint/wagmi/wagmi.config.ts");
          //     },
          //     stopMessage: "wagmi hooks generated",
          //   });
          // }

          printNote(greenBright("Read the documentation to learn how to use the generated SDK <link here>"));

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
