import { cn } from "@/lib/utils";

interface DataTableColumnCellProps<TData, TValue extends React.ReactNode> extends React.HTMLAttributes<HTMLDivElement> {
  value: TValue;
  type?: "default" | "numeric";
  formatter?: (value: TValue) => React.ReactNode;
}

export function DataTableColumnCell<TData, TValue extends React.ReactNode>({
  value,
  className,
  type = "default",
  formatter,
}: DataTableColumnCellProps<TData, TValue>) {
  const formattedValue = formatter ? formatter(value) : value;

  return (
    <div className={cn("flex items-center space-x-2 px-4 py-2", type === "numeric" && "justify-end", className)}>
      <span className={cn("truncate", type === "numeric" && "text-right mr-8")}>
        {formattedValue as React.ReactNode}
      </span>
    </div>
  );
}
