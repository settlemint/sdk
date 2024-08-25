import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface EllipsisDropdownProps {
  items: BreadcrumbItemType[];
}

/**
 * Renders a single item in the ellipsis dropdown.
 * @param props - The component props.
 * @returns The rendered EllipsisDropdownItem component.
 */
function EllipsisDropdownItem({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className="block px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded transition-colors"
    >
      {children}
    </Link>
  );
}

/**
 * Renders a dropdown component for collapsed breadcrumb items.
 * @param props - The component props.
 * @returns The rendered EllipsisDropdown component.
 */
export function EllipsisDropdown({ items }: EllipsisDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="h-auto p-0 font-normal" aria-label="Toggle hidden breadcrumb items">
          ...
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
