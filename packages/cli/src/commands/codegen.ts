import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { printAsciiArt, printCancel, printIntro, printNote, printOutro, printSpinner } from "@/lib/cli-message";
import { Command } from "@commander-js/extra-typings";
import {
  loadSettleMintApplicationConfig,
  loadSettleMintConfig,
  loadSettleMintEnvironmentConfig,
} from "@settlemint/sdk-config/loader";
import { findProjectRoot } from "@settlemint/sdk-config/path";
import { merge } from "ts-deepmerge";
import { greenBright } from "yoctocolors";
import { createChainConfig } from "../lib/codegen/chain";
import { createGqlClient } from "../lib/codegen/graphql";
import { createRestClient } from "../lib/codegen/rest";
import { writeTsConfig } from "../lib/codegen/tsconfig";
import { createViemClients } from "../lib/codegen/viem";
import { createWagmiConfig } from "../lib/codegen/wagmi";

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
          const cfg = await loadSettleMintConfig();
          if (!cfg) {
            throw new Error("No configuration found");
          }
          const appCfg = await loadSettleMintApplicationConfig(application);
          if (!appCfg) {
            throw new Error("No application configuration found");
          }

          const envCfg = loadSettleMintEnvironmentConfig();

          const { portalRest, portalGql, thegraphGql, hasuraGql, nodeJsonRpc, nodeJsonRpcDeploy } = appCfg;

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
                    personalAccessToken: envCfg.SETTLEMINT_PAT_TOKEN,
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
                    personalAccessToken: envCfg.SETTLEMINT_PAT_TOKEN,
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
                    personalAccessToken: envCfg.SETTLEMINT_PAT_TOKEN,
                  }),
                );
              }
              if (hasuraGql && envCfg.SETTLEMINT_HASURA_GQL_ADMIN_SECRET) {
                sdkParts.push(
                  createGqlClient({
                    settleMintDir,
                    framework: cfg.framework,
                    type: "hasura",
                    gqlUrl: process.env.LOCAL_HASURA ?? hasuraGql,
                    personalAccessToken: envCfg.SETTLEMINT_PAT_TOKEN,
                    hasuraAdminSecret: envCfg.SETTLEMINT_HASURA_GQL_ADMIN_SECRET,
                  }),
                );
              }
              if (nodeJsonRpc || nodeJsonRpcDeploy) {
                sdkParts.push(
                  createChainConfig({
                    framework: cfg.framework,
                    nodeUrl: nodeJsonRpc,
                    personalAccessToken: envCfg.SETTLEMINT_PAT_TOKEN,
                  }),
                );
              }
              if (nodeJsonRpc) {
                sdkParts.push(createViemClients());
                sdkParts.push(createWagmiConfig());
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
import { sdkGenerator, type ViemConfig, type WagmiConfig } from "@settlemint/sdk-next/browser";
${importLines.filter((line) => line.trim() !== "").join("\n")}

export const connectSettlemint = (config: {viem?: ViemConfig, wagmi: WagmiConfig}) => (${JSON.stringify(
                  settlemintObject,
                  null,
                  2,
                )
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
