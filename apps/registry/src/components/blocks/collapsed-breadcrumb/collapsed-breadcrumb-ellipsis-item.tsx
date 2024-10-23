import { cn } from "@/lib/utils";
import Link from "next/link";
import type { PropsWithChildren } from "react";

interface EllipsisDropdownItemProps extends PropsWithChildren {
  href: string;
  className?: string;
}

/**
 * Renders a single item in the ellipsis dropdown.
 */
export function EllipsisDropdownItem({ href, children, className }: EllipsisDropdownItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded transition-colors",
        className,
      )}
    >
      {children}
    </Link>
  );
}
