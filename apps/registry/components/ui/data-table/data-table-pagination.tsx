import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PaginationState, Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useMemo } from "react";

/**
 * Props for the DataTablePagination component.
 * @template TData The type of data in the table.
 */
interface DataTablePaginationProps<TData> {
  /** The table instance from react-table. */
  table: Table<TData>;
}

/**
 * Renders pagination controls for a data table.
 * @template TData The type of data in the table.
 * @param props The component props.
 * @returns The rendered DataTablePagination component.
 */
export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const pagination: PaginationState = table.getState().pagination;
  const pageCount = table.getPageCount();
  const pageNumbers = useMemo(() => {
    const totalPageNumbers = 5;
    const pageNumbers = [];

    const startPage = Math.max(1, pagination.pageIndex - Math.floor(totalPageNumbers / 2));
    const endPage = Math.min(pageCount, startPage + totalPageNumbers - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [pageCount, pagination]);

  return (
    <div className="flex items-center justify-between px-2 mt-4">
      <div className="w-full flex items-center justify-between space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pagination.pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={pagination.pageIndex + 1 === page ? "secondary" : "outline"}
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(page - 1)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
