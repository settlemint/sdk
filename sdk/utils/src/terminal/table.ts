import { camelCaseToWords } from "@/string.js";
import TTYTable from "tty-table";
import { whiteBright } from "yoctocolors";
import { note } from "./note.js";

/**
 * Displays data in a formatted table in the terminal.
 *
 * @param data - Array of objects to display in table format
 * @example
 * import { table } from "@settlemint/sdk-utils/terminal";
 *
 * const data = [
 *   { name: "Item 1", value: 100 },
 *   { name: "Item 2", value: 200 }
 * ];
 *
 * table(data);
 */
export function table(title: string, data: unknown[]): void {
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
    compact: true,
  };
  const ttyTable = TTYTable(headers, data, config);
  console.log(ttyTable.render());
}
