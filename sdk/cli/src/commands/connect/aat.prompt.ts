import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import password from "@inquirer/password";
import type { Application, SettlemintClient } from "@settlemint/sdk-js";
import { ApplicationAccessTokenSchema, type DotEnv, validate } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";
import { z } from "zod";

/**
 * Prompts the user for the access token of their SettleMint application.
 * If the access token is already present in the environment variables and valid,
 * it will be used. Otherwise, the user will be prompted to enter it.
 *
 * @param env - Partial environment variables, potentially containing a pre-configured access token
 * @param application - The application to create the access token for
 * @param settlemint - The SettleMint client instance
 * @param accept - Whether to accept existing token without prompting
 * @returns A promise that resolves to the validated access token
 * @throws Will throw an error if the input validation fails
 *
 * @example
 * const env: Partial<DotEnv> = { SETTLEMINT_ACCESS_TOKEN: "your-access-token" };
 * const accessToken = await applicationAccessTokenPrompt(env, application, settlemint, false);
 */
export async function applicationAccessTokenPrompt(
  env: Partial<DotEnv>,
  application: Omit<Application, "workspace">,
  settlemint: SettlemintClient,
  accept: boolean | undefined,
): Promise<string | undefined> {
  const autoAccept = !!accept || isInCi;
  const defaultAccessToken = env.SETTLEMINT_ACCESS_TOKEN;
  const defaultPossible = autoAccept && defaultAccessToken;

  if (defaultPossible || isInCi) {
    return defaultAccessToken;
  }

  if (defaultAccessToken) {
    const keep = await confirm({
      message: "Do you want to use the existing application access token?",
      default: true,
    });
    if (keep) {
      return defaultAccessToken;
    }
  }

  const create = await confirm({
    message: "Do you want to create a new application access token?",
    default: false,
  });

  if (create) {
    const name = await input({
      message: "How would you like to name this application access token?",
      default: `SettleMint CLI (${Date.now()}${process.env.USER ? ` ${process.env.USER}` : ""})`,
      required: true,
      validate(value) {
        try {
          validate(z.string(), value);
          return true;
        } catch (error) {
          return "Invalid token name";
        }
      },
    });

    const aat = await settlemint.applicationAccessToken.create({
      applicationUniqueName: application.uniqueName,
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
      validityPeriod: "NONE",
    });

    try {
      validate(ApplicationAccessTokenSchema, aat);
      return aat;
    } catch (error) {
      // invalid, ask for it
    }
  }

  return password({
    message: "What is the application access token for your application in SettleMint? (format: sm_aat_...)",
    validate(value) {
      try {
        validate(ApplicationAccessTokenSchema, value);
        return true;
      } catch (error) {
        return "Invalid application access token";
      }
    },
  });
}
