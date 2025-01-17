import { camelCaseToWords } from "@/string.js";
import TTYTable from "tty-table";
import { whiteBright } from "yoctocolors";
import { note } from "./note.js";

/**
 * Displays data in a formatted table in the terminal.
 *
 * @param title - Title to display above the table
 * @param data - Array of objects to display in table format
 * @param compact - Whether to display the table in compact mode
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
export function table(title: string, data: unknown[], compact = true): void {
  note(title);

  if (!data || data.length === 0) {
    note("No data to display");
    return;
  }

  const columnKeys = Object.keys(data[0] as Record<string, unknown>);
  const headers: TTYTable.Header[] = columnKeys.map((key) => ({
    value: key,
    alias: whiteBright(camelCaseToWords(key)),
    headerAlign: "left",
    headerColor: "",
    align: "left",
  }));
  const config: TTYTable.Options = {
    compact,
  };
  const ttyTable = TTYTable(headers, data, config);
  console.log(ttyTable.render());
}
