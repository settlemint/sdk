import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import type { BreadcrumbItemType } from "./collapsed-breadcrumb";

interface EllipsisDropdownProps extends PropsWithChildren {
  items: BreadcrumbItemType[];
  className?: string;
}

/**
 * Renders a dropdown component for collapsed breadcrumb items.
 */
export function EllipsisDropdown({ items, className }: EllipsisDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn("h-auto py-0 px-2 font-normal", className)}
          aria-label="Toggle hidden breadcrumb items"
        >
          …
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        {items.map(({ label, href }) => (
          <Link
            key={label}
            href={href ?? ""}
            className={cn(
              "block px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded transition-colors",
              className,
            )}
          >
            {label}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}
