import type { SettlemintClient } from "@settlemint/sdk-js";
import type { Id } from "@settlemint/sdk-utils/validation";

/**
 * Waits for a resource to complete or fails after 10 minutes.
 * @param settlemint - The SettlemintClient instance
 * @param type - The type of resource to check
 * @param id - The ID of the resource
 * @returns A promise that resolves to true if the resource completes, or rejects if it times out
 * @throws Error if the operation times out after 10 minutes
 */
export async function waitForCompletion(
  settlemint: SettlemintClient,
  type: keyof SettlemintClient,
  id: Id,
): Promise<boolean> {
  const startTime = Date.now();
  const timeoutDuration = 10 * 60 * 1000; // 10 minutes in milliseconds

  while (true) {
    const resource = await settlemint[type].read(id);

    if (type === "workspace") {
      return true;
    }

    if ((resource as { status: string }).status === "COMPLETED") {
      return true;
    }

    if (Date.now() - startTime > timeoutDuration) {
      throw new Error(`Operation timed out after 10 minutes for ${type} with id ${id}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
