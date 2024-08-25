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
          <EllipsisDropdownItem key={label} href={href || "#"}>
            {label}
          </EllipsisDropdownItem>
        ))}
      </PopoverContent>
    </Popover>
  );
}
