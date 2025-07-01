import type { SettlemintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { note, SpinnerError, spinner } from "@settlemint/sdk-utils/terminal";
import type { Spinner } from "yocto-spinner";
import type { ResourceType } from "@/constants/resource-type";
import { SETTLEMINT_CLIENT_MAP } from "@/constants/resource-type";

type Action = "deploy" | "destroy" | "restart" | "pause" | "resume";

class TimeoutError extends Error {}

/**
 * Waits for a resource to complete an action or fails after a specified timeout.
 * @param settlemint - The SettlemintClient instance
 * @param type - The type of resource to check
 * @param uniqueName - The unique name of the resource to monitor
 * @param action - The action being performed ('deploy', 'destroy', 'restart', 'pause', or 'resume')
 * @param maxTimeout - Maximum time to wait in milliseconds before timing out (defaults to 10 minutes)
 * @param restartIfTimeout - Whether to restart the resource if it times out
 * @param restartOnError - Whether to restart the resource if it fails
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
  restartOnError = false,
}: {
  settlemint: SettlemintClient;
  type: ResourceType;
  uniqueName: string;
  action: Action;
  maxTimeout?: number;
  restartIfTimeout?: boolean;
  restartOnError?: boolean;
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

            // Check if operation failed
            if (resource.status === "FAILED") {
              updateStatus(spinner, `${capitalizeFirstLetter(type)} failed to ${getActionLabel(action)}`);
              if (restartOnError) {
                note(`Restarting ${capitalizeFirstLetter(type)}`);
                await service.restart(uniqueName);
              }
              return false;
            }

            // Check if operation completed successfully
            if (isActionComplete(action, resource.status)) {
              updateStatus(spinner, `${capitalizeFirstLetter(type)} is ${getActionLabel(action)}`);
              return true;
            }

            // Still in progress
            updateStatus(spinner, `${capitalizeFirstLetter(type)} is not ready yet (status: ${resource.status})`);
          } catch (_error) {
            updateStatus(spinner, `${capitalizeFirstLetter(type)} is not ready yet (status: UNKNOWN)`);
          }

          // Check for timeout
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

// Helper function to update spinner or show note
function updateStatus(spinner: Spinner | undefined, message: string) {
  if (spinner) {
    spinner.text = message;
  } else {
    note(message);
  }
}

// Helper function to check if the action is complete based on status
function isActionComplete(action: Action, status: string): boolean {
  switch (action) {
    case "pause":
      return status === "PAUSED" || status === "AUTO_PAUSED";
    case "resume":
    case "deploy":
    case "destroy":
    case "restart":
      return status === "COMPLETED";
    default:
      return false;
  }
}

function getActionLabel(action: Action): string {
  switch (action) {
    case "restart":
      return "restarted";
    case "destroy":
      return "destroyed";
    case "pause":
      return "paused";
    case "resume":
      return "resumed";
    case "deploy":
      return "deployed";
    default:
      return "deployed";
  }
}
