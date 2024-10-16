"use client";

import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";

interface DataTableFilterProps<TData> {
  table: Table<TData>;
  placeholder: string;
  column: string;
}

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
