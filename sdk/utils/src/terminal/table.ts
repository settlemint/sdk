import { camelCaseToWords } from "@/string.js";
import { Table } from "console-table-printer";
import { whiteBright } from "yoctocolors";
import { note } from "./note.js";
/**
 * Displays data in a formatted table in the terminal.
 *
 * @param title - Title to display above the table
 * @param data - Array of objects to display in table format
 * @example
 * import { table } from "@settlemint/sdk-utils/terminal";
 *
 * const data = [
 *   { name: "Item 1", value: 100 },
 *   { name: "Item 2", value: 200 }
 * ];
 *
 * table("My Table", data);
 */
export function table(title: string, data: unknown[]): void {
  note(title);

  if (!data || data.length === 0) {
    note("No data to display");
    return;
  }

  const columnKeys = Object.keys(data[0] as Record<string, unknown>);
  const table = new Table({
    columns: columnKeys.map((key) => ({
      name: key,
      title: whiteBright(camelCaseToWords(key)),
      alignment: "left",
    })),
  });
  table.addRows(data);
  table.printTable();
}
