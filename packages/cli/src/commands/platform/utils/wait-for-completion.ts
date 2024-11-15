import { SETTLEMINT_CLIENT_MAP } from "@/commands/platform/common/resource-type";
import type { SettlemintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { note, spinner } from "@settlemint/sdk-utils/terminal";
import type { Id } from "@settlemint/sdk-utils/validation";
import type { ResourceType } from "../common/resource-type";

type Action = "deploy" | "destroy";

/**
 * Waits for a resource to complete or fails after 10 minutes.
 * @param settlemint - The SettlemintClient instance
 * @param type - The type of resource to check
 * @param id - The ID of the resource
 * @returns A promise that resolves to true if the resource completes, or rejects if it times out
 * @throws Error if the operation times out after 10 minutes
 */
export async function waitForCompletion({
  settlemint,
  type,
  id,
  action,
}: { settlemint: SettlemintClient; type: ResourceType; id: Id; action: Action }): Promise<boolean> {
  const serviceType = SETTLEMINT_CLIENT_MAP[type];
  if (serviceType === "workspace" || serviceType === "application") {
    return true;
  }

  return spinner({
    startMessage: `Waiting for ${type} to be ${getActionLabel(action)}`,
    stopMessage: `Waiting for ${type} to be ${getActionLabel(action)}`,
    task: async () => {
      const startTime = Date.now();
      const timeoutDuration = 10 * 60 * 1000; // 10 minutes in milliseconds

      while (true) {
        const resource = await settlemint[serviceType].read(id);

        if (resource.status === "COMPLETED") {
          note(`${capitalizeFirstLetter(type)} is ${getActionLabel(action)}`);
          return true;
        }

        if (resource.status === "FAILED") {
          note(`${capitalizeFirstLetter(type)} failed to ${getActionLabel(action)}`);
          return true;
        }

        if (Date.now() - startTime > timeoutDuration) {
          throw new Error(`Operation timed out after 10 minutes for ${type} with id ${id}`);
        }
        note(`${capitalizeFirstLetter(type)} is not ready yet (status: ${resource.status})`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    },
  });
}

function getActionLabel(action: Action): string {
  return action === "deploy" ? "deployed" : "destroyed";
}
