import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { writeEnvSpinner } from "../../connect/write-env.spinner";

/**
 * Prompts the user for the deployment ID of their smart contract set.
 * If a deployment ID is already present in the environment variables,
 * it will be used. Otherwise, the user will be prompted to enter it.
 *
 * @param env - Partial environment variables, potentially containing a pre-configured deployment ID.
 * @param accept - Whether to automatically accept the existing deployment ID.
 * @param prod - Whether to write to production environment.
 * @returns A promise that resolves to the deployment ID.
 *
 * @example
 * const env: Partial<DotEnv> = { SETTLEMINT_SMART_CONTRACT_SET_DEPLOYMENT_ID: "deployment-123" };
 * const deploymentId = await deploymentIdPrompt(env, false, false);
 */
export async function deploymentIdPrompt(
  env: Partial<DotEnv>,
  accept: boolean,
  prod: boolean | undefined,
): Promise<string | undefined> {
  const defaultDeploymentId = env.SETTLEMINT_SMART_CONTRACT_SET_DEPLOYMENT_ID;

  if (accept) {
    return defaultDeploymentId;
  }

  if (defaultDeploymentId) {
    const keep = await confirm({
      message: "Do you want to use the existing deployment ID?",
      default: true,
    });
    if (keep) {
      return defaultDeploymentId;
    }
  }

  const deploymentId = await input({
    message: "What is the deployment ID of your smart contract set (optional)?",
    required: false,
  });

  await writeEnvSpinner(!!prod, {
    ...env,
    SETTLEMINT_SMART_CONTRACT_SET_DEPLOYMENT_ID: deploymentId,
  });

  return deploymentId;
}
