import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import type { BreadcrumbItemType } from "./collapsed-breadcrumb";
import { EllipsisDropdownItem } from "./collapsed-breadcrumb-ellipsis-item";

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
          variant="link"
          className={cn("h-auto p-0 font-normal", className)}
          aria-label="Toggle hidden breadcrumb items"
        >
          …
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        {items.map(({ label, href }) => (
          <EllipsisDropdownItem key={label} href={href ?? "#"}>
            {label}
          </EllipsisDropdownItem>
        ))}
      </PopoverContent>
    </Popover>
  );
}
