import { note } from "./note.js";

/**
 * Displays a list of items in a formatted manner, supporting nested items.
 *
 * @param title - The title of the list
 * @param items - The items to display, can be strings or arrays for nested items
 * @returns The formatted list
 * @example
 * import { list } from "@settlemint/sdk-utils/terminal";
 *
 * // Simple list
 * list("Use cases", ["use case 1", "use case 2", "use case 3"]);
 *
 * // Nested list
 * list("Providers", [
 *   "AWS",
 *   ["us-east-1", "eu-west-1"],
 *   "Azure",
 *   ["eastus", "westeurope"]
 * ]);
 */
export function list(title: string, items: Array<string | string[]>) {
  const formatItems = (items: Array<string | string[]>): string => {
    return items
      .map((item) => {
        if (Array.isArray(item)) {
          return item.map((subItem) => `  • ${subItem}`).join("\n");
        }
        return `• ${item}`;
      })
      .join("\n");
  };

  return note(`${title}:\n${formatItems(items)}`);
}
