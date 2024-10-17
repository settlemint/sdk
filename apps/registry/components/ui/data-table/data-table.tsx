"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTableFilter } from "./data-table-filter";
import { DataTablePagination } from "./data-table-pagination";

/**
 * Props for the DataTable component.
 * @template TData The type of data in the table.
 * @template TValue The type of values in the table cells.
 */
interface DataTableProps<TData, TValue> {
  /** The column definitions for the table. */
  columns: ColumnDef<TData, TValue>[];
  /** The data to be displayed in the table. */
  data: TData[];
  /** The placeholder text for the filter input. */
  filterPlaceholder: string;
  /** The column to be used for filtering. */
  filterColumn: string;
  /** Whether to show pagination controls. */
  isPagination?: boolean;
  /** Whether to show search functionality. */
  isSearch?: boolean;
}

/**
 * A reusable data table component with sorting, filtering, and pagination.
 * @template TData The type of data in the table.
 * @template TValue The type of values in the table cells.
 * @param props The component props.
 * @returns The rendered DataTable component.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder,
  isPagination = true,
  isSearch = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  if (!hydrated) {
    return (
      <div className="flex justify-center text-center align-middle p-[100px]">
        <div className="">
          <Loader className="h-8 w-8 animate-spin" />
          <span className="text-sm text-gray-600 relative -left-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="DataTable p-1">
      <div className="flex py-2 mb-2">
        {data.length > 0 && isSearch && (
          <DataTableFilter table={table} placeholder={filterPlaceholder} column={filterColumn} />
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getRowModel().rows?.length > 0 && isPagination && <DataTablePagination table={table} />}
    </div>
  );
}
