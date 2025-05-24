import { SETTLEMINT_CLIENT_MAP } from "@/constants/resource-type";
import type { ResourceType } from "@/constants/resource-type";
import type { SettlemintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { SpinnerError, note, spinner } from "@settlemint/sdk-utils/terminal";

type Action = "deploy" | "destroy" | "restart";

class TimeoutError extends Error {}

/**
 * Waits for a resource to complete deployment/destruction or fails after a specified timeout.
 * @param settlemint - The SettlemintClient instance
 * @param type - The type of resource to check
 * @param uniqueName - The unique name of the resource to monitor
 * @param action - The action being performed ('deploy' or 'destroy')
 * @param maxTimeout - Maximum time to wait in milliseconds before timing out (defaults to 10 minutes)
 * @param restartIfTimeout - Whether to restart the resource if it times out
 * @returns A promise that resolves to true if the resource completes successfully
 * @throws Error if the operation times out after the specified maxTimeout
 */
export async function waitForCompletion({
  settlemint,
  type,
  uniqueName,
  action,
  maxTimeout = 10 * 60 * 1000, // 10 minutes in milliseconds
  restartIfTimeout = false,
}: {
  settlemint: SettlemintClient;
  type: ResourceType;
  uniqueName: string;
  action: Action;
  maxTimeout?: number;
  restartIfTimeout?: boolean;
}): Promise<boolean> {
  const serviceType = SETTLEMINT_CLIENT_MAP[type];
  if (
    serviceType === "workspace" ||
    serviceType === "application" ||
    serviceType === "foundry" ||
    serviceType === "applicationAccessToken" ||
    serviceType === "platform" ||
    serviceType === "wallet"
  ) {
    return true;
  }

  const service = settlemint[serviceType];
  if (!service || !("read" in service)) {
    throw new Error(`Service ${serviceType} does not support status checking`);
  }

  function showSpinner() {
    return spinner({
      startMessage: `Waiting for ${type} to be ${getActionLabel(action)}`,
      stopMessage: `Waiting for ${type} to be ${getActionLabel(action)}`,
      task: async (spinner) => {
        const startTime = Date.now();

        while (true) {
          try {
            const resource = await service.read(uniqueName);

            if (resource.status === "COMPLETED") {
              if (spinner) {
                spinner.text = `${capitalizeFirstLetter(type)} is ${getActionLabel(action)}`;
              } else {
                note(`${capitalizeFirstLetter(type)} is ${getActionLabel(action)}`);
              }
              return true;
            }

            if (resource.status === "FAILED") {
              if (spinner) {
                spinner.text = `${capitalizeFirstLetter(type)} failed to ${getActionLabel(action)}`;
              } else {
                note(`${capitalizeFirstLetter(type)} failed to ${getActionLabel(action)}`);
              }
              return false;
            }

            if (spinner) {
              spinner.text = `${capitalizeFirstLetter(type)} is not ready yet (status: ${resource.status})`;
            } else {
              note(`${capitalizeFirstLetter(type)} is not ready yet (status: ${resource.status})`);
            }
          } catch (error) {
            if (spinner) {
              spinner.text = `${capitalizeFirstLetter(type)} is not ready yet (status: UNKNOWN)`;
            } else {
              note(`${capitalizeFirstLetter(type)} is not ready yet (status: UNKNOWN)`);
            }
          }

          if (Date.now() - startTime > maxTimeout) {
            throw new TimeoutError(
              `Operation timed out after ${maxTimeout / 60_000} minutes for ${type} with unique name ${uniqueName}`,
            );
          }
          await new Promise((resolve) => setTimeout(resolve, 5_000));
        }
      },
    });
  }

  try {
    return await showSpinner();
  } catch (error) {
    const isTimeoutError = error instanceof SpinnerError && error.originalError instanceof TimeoutError;
    if (restartIfTimeout && isTimeoutError) {
      note(`Restarting ${capitalizeFirstLetter(type)}`);
      await service.restart(uniqueName);
      return showSpinner();
    }
    throw error;
  }
}

function getActionLabel(action: Action): string {
  if (action === "restart") {
    return "restarted";
  }
  if (action === "destroy") {
    return "destroyed";
  }
  return "deployed";
}
