import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import password from "@inquirer/password";
import type { Application, SettlemintClient } from "@settlemint/sdk-js";
import { ApplicationAccessTokenSchema, type DotEnv, validate } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
/**
 * Prompts the user for the access token of their SettleMint application.
 * If the access token is already present in the environment variables and valid,
 * it will be used. Otherwise, the user will be prompted to enter it.
 *
 * @param env - Partial environment variables, potentially containing a pre-configured access token.
 * @returns A promise that resolves to the validated access token.
 * @throws Will throw an error if the input validation fails.
 *
 * @example
 * const env: Partial<DotEnv> = { SETTLEMINT_ACCESS_TOKEN: "your-access-token" };
 * const accessToken = await accessTokenPrompt(env);
 * console.log(accessToken); // Output: your-access-token or user input
 */
export async function applicationAccessTokenPrompt(
  env: Partial<DotEnv>,
  application: Application,
  settlemint: SettlemintClient,
  accept: boolean,
): Promise<string> {
  const defaultAccessToken = env.SETTLEMINT_ACCESS_TOKEN;
  const defaultPossible = accept && defaultAccessToken;

  if (defaultPossible) {
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
      applicationId: application.id,
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
    message: "What is the application access token for your application in SettleMint?",
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
