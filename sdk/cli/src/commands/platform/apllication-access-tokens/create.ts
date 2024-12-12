import { Option } from "@commander-js/extra-typings";
import type { DotEnv } from "@settlemint/sdk-utils";
import { getCreateCommand } from "../common/create-command";

/**
 * Creates and returns the 'application-access-token' command for the SettleMint SDK.
 * This command creates a new application access token for an application.
 * It takes a token name and optional flags.
 */
export function applicationAccessTokenCreateCommand() {
  return getCreateCommand({
    name: "application-access-token",
    type: "application access token",
    alias: "aat",
    execute: (cmd, baseAction) => {
      cmd
        .option(
          "-a, --application-id <applicationId>",
          "The application ID to create the application access token for (defaults to application from env)",
        )
        .addOption(
          new Option("-v, --validity-period <period>", "The validity period for the token")
            .choices(["DAYS_7", "DAYS_30", "DAYS_60", "DAYS_90", "NONE"])
            .default("DAYS_7"),
        )
        .action(async (name, { applicationId, validityPeriod, ...defaultArgs }) => {
          return baseAction(defaultArgs, async (settlemint, env) => {
            const aatToken = await settlemint.applicationAccessToken.create({
              applicationId: applicationId ?? env.SETTLEMINT_APPLICATION!,
              name,
              blockchainNetworkScope: {
                type: "ALL",
                values: [],
              },
              blockchainNodeScope: {
                type: "ALL",
                values: [],
              },
              customDeploymentScope: {
                type: "ALL",
                values: [],
              },
              insightsScope: {
                type: "ALL",
                values: [],
              },
              integrationScope: {
                type: "ALL",
                values: [],
              },
              loadBalancerScope: {
                type: "ALL",
                values: [],
              },
              middlewareScope: {
                type: "ALL",
                values: [],
              },
              privateKeyScope: {
                type: "ALL",
                values: [],
              },
              smartContractSetScope: {
                type: "ALL",
                values: [],
              },
              storageScope: {
                type: "ALL",
                values: [],
              },
              validityPeriod: validityPeriod as "DAYS_7" | "DAYS_30" | "DAYS_60" | "DAYS_90" | "NONE",
            });
            return {
              result: {
                id: "",
                name,
              },
              mapDefaultEnv: (): Partial<DotEnv> => ({
                SETTLEMINT_ACCESS_TOKEN: aatToken,
              }),
            };
          });
        });
    },
    examples: [
      {
        description: "Create an application access token and save as default",
        command: "platform create application-access-token my-token --accept-defaults -d",
      },
      {
        description: "Create an application access token with custom validity period",
        command: "platform create application-access-token my-token --validity-period ONE_DAY -a -d",
      },
      {
        description: "Create an application access token (shorthand)",
        command: "platform create aat my-token",
      },
    ],
  });
}
