import { LABELS_MAP, type ResourceType } from "@/constants/resource-type";
import { spinner } from "@settlemint/sdk-utils/terminal";

/**
 * Loads a resource with a spinner for visual feedback.
 *
 * @param type - The type of resource to load.
 * @param task - The task to execute.
 * @returns The result of the task.
 */
export async function serviceSpinner<T>(type: ResourceType, task: () => Promise<T>): Promise<T> {
  const { plural } = LABELS_MAP[type];
  return spinner({
    startMessage: `Loading ${plural} services`,
    stopMessage: `Loaded ${plural} services`,
    task,
  });
}
