import input from "@inquirer/input";
import { outro } from "@settlemint/sdk-utils/terminal";

/**
 * Prompts the user for confirmation to delete an item.
 *
 * @param itemDescription - A description of the item to be deleted.
 * @returns A promise that resolves to void. Exits the process if the user does not confirm the deletion.
 *
 * @example
 * await deleteConfirmationPrompt("your item");
 * // If the user confirms, the function will return and the deletion can proceed.
 * // If the user aborts, the process will exit with a message.
 */
export async function deleteConfirmationPrompt(itemDescription: string): Promise<void> {
  const confirmation = await input({
    message: `Are you sure you want to delete ${itemDescription}? (yes/no)`,
    required: true,
    validate(value) {
      const lowerValue = value.toLowerCase();
      if (lowerValue === "yes" || lowerValue === "no") {
        return true;
      }
      return "Please enter 'yes' or 'no'";
    },
  });

  const confirmed = confirmation.toLowerCase() === "yes";
  if (!confirmed) {
    outro("User aborted deletion");
    process.exit(0);
  }
}
