"use client";

import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";

/**
 * Props for the DataTableFilter component.
 * @template TData The type of data in the table.
 */
interface DataTableFilterProps<TData> {
  /** The table instance from react-table. */
  table: Table<TData>;
  /** The placeholder text for the input field. */
  placeholder: string;
  /** The name of the column to filter. */
  column: string;
}

/**
 * Renders an input field for filtering a specific column in a data table.
 * @template TData The type of data in the table.
 * @param props The component props.
 * @returns The rendered DataTableFilter component.
 */
export function DataTableFilter<TData>({ table, placeholder, column }: DataTableFilterProps<TData>) {
  return (
    <Input
      placeholder={placeholder}
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
      onChange={(event) => table.getColumn(column)?.setFilterValue(event.target.value)}
      className="max-w-sm "
    />
  );
}
