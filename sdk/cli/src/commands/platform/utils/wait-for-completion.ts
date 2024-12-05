import { SETTLEMINT_CLIENT_MAP } from "@/commands/platform/common/resource-type";
import type { SettlemintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { note, spinner } from "@settlemint/sdk-utils/terminal";
import type { Id } from "@settlemint/sdk-utils/validation";
import type { ResourceType } from "../common/resource-type";

type Action = "deploy" | "destroy";

/**
 * Waits for a resource to complete deployment/destruction or fails after a specified timeout.
 * @param settlemint - The SettlemintClient instance
 * @param type - The type of resource to check
 * @param id - The ID of the resource to monitor
 * @param action - The action being performed ('deploy' or 'destroy')
 * @param maxTimeout - Maximum time to wait in milliseconds before timing out (defaults to 10 minutes)
 * @returns A promise that resolves to true if the resource completes successfully
 * @throws Error if the operation times out after the specified maxTimeout
 */
export async function waitForCompletion({
  settlemint,
  type,
  id,
  action,
  maxTimeout = 15 * 60 * 1000, // 15 minutes in milliseconds
}: {
  settlemint: SettlemintClient;
  type: ResourceType;
  id: Id;
  action: Action;
  maxTimeout?: number;
}): Promise<boolean> {
  const serviceType = SETTLEMINT_CLIENT_MAP[type];
  if (serviceType === "workspace" || serviceType === "application") {
    return true;
  }

  return spinner({
    startMessage: `Waiting for ${type} to be ${getActionLabel(action)}`,
    stopMessage: `Waiting for ${type} to be ${getActionLabel(action)}`,
    task: async () => {
      const startTime = Date.now();

      while (true) {
        try {
          const resource = await settlemint[serviceType].read(id);

          if (resource.status === "COMPLETED") {
            note(`${capitalizeFirstLetter(type)} is ${getActionLabel(action)}`);
            return true;
          }

          if (resource.status === "FAILED") {
            note(`${capitalizeFirstLetter(type)} failed to ${getActionLabel(action)}`);
            return true;
          }

          note(`${capitalizeFirstLetter(type)} is not ready yet (status: ${resource.status})`);
        } catch (error) {
          note(`${capitalizeFirstLetter(type)} is not ready yet (status: UNKNOWN)`);
        }

        if (Date.now() - startTime > maxTimeout) {
          throw new Error(`Operation timed out after ${maxTimeout / 60_000} minutes for ${type} with id ${id}`);
        }
        await new Promise((resolve) => setTimeout(resolve, 5_000));
      }
    },
  });
}

function getActionLabel(action: Action): string {
  return action === "deploy" ? "deployed" : "destroyed";
}
