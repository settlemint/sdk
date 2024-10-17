import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";
import { ArrowDownUp, BadgeCheck, EyeOff, SortAsc, SortDesc } from "lucide-react";

/**
 * Props for the DataTableColumnHeader component.
 * @template TData The type of data in the table.
 * @template TValue The type of value in the column.
 */
interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  /** The column object from react-table. */
  column: Column<TData, TValue>;
  /** The title of the column. */
  title: string;
  /** Indicates if the column is verified. */
  isVerified?: boolean;
}

/**
 * Renders a header for a data table column with sorting and visibility options.
 * @template TData The type of data in the table.
 * @template TValue The type of value in the column.
 * @param props The component props.
 * @returns The rendered DataTableColumnHeader component.
 */
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  isVerified,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <SortDesc className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <SortAsc className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownUp className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Sort Ascending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Sort Descending
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isVerified && <BadgeCheck className="h-4 w-4 text-green-700" />}
    </div>
  );
}
