"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { Fragment, useMemo } from "react";

interface ProcessedBreadcrumbItems {
  visibleItems: (BreadcrumbItemType | null)[];
  collapsedItems: BreadcrumbItemType[];
}

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

/**
 * Processes breadcrumb items to determine which should be visible and which should be collapsed.
 * @param items - The array of breadcrumb items to process.
 * @param maxVisibleItems - The maximum number of items to display visibly.
 * @returns An object containing visible items and collapsed items.
 */
function processBreadcrumbItems(items: BreadcrumbItemType[], maxVisibleItems: number): ProcessedBreadcrumbItems {
  if (items.length <= maxVisibleItems) {
    return { visibleItems: items, collapsedItems: [] };
  }

  return {
    visibleItems: [
      items[0],
      null, // placeholder for ellipsis
      ...items.slice(-maxVisibleItems),
    ],
    collapsedItems: items.slice(1, -maxVisibleItems),
  };
}

/**
 * Renders a single breadcrumb item.
 * @param item - The breadcrumb item to render.
 * @param collapsedItems - The array of collapsed items (used for the ellipsis dropdown).
 * @returns The rendered breadcrumb item.
 */
function renderBreadcrumbItem(item: BreadcrumbItemType | null, collapsedItems: BreadcrumbItemType[]) {
  if (!item) {
    return <EllipsisDropdown items={collapsedItems} />;
  }

  if (item.href) {
    return (
      <BreadcrumbLink asChild>
        <Link href={item.href}>{item.label}</Link>
      </BreadcrumbLink>
    );
  }

  return <BreadcrumbPage>{item.label}</BreadcrumbPage>;
}

interface BreadcrumbsProps {
  maxVisibleItems: number;
  items: BreadcrumbItemType[];
}

/**
 * Renders a breadcrumb component with collapsible items.
 * @param props - The component props.
 * @returns The rendered Breadcrumb component.
 */
export default function CollapsedBreadcrumbs({ items, maxVisibleItems }: BreadcrumbsProps) {
  const { visibleItems, collapsedItems } = useMemo(
    () => processBreadcrumbItems(items, maxVisibleItems),
    [items, maxVisibleItems],
  );

  if (items.length === 0) {
    return null;
  }

  const visibleBreadcrumbs = visibleItems.map((item, i) => {
    if (i === visibleItems.length - 1 && item?.href) {
      return { label: item.label };
    }
    return item;
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visibleBreadcrumbs.map((item, index) => {
          return (
            <Fragment key={item ? item.label : `ellipsis-${index}`}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>{renderBreadcrumbItem(item, collapsedItems)}</BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

interface EllipsisDropdownProps {
  items: BreadcrumbItemType[];
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

interface EllipsisDropdownItemProps {
  href: string;
  children: React.ReactNode;
}

/**
 * Renders a single item in the ellipsis dropdown.
 * @param props - The component props.
 * @returns The rendered EllipsisDropdownItem component.
 */
function EllipsisDropdownItem({ href, children }: EllipsisDropdownItemProps) {
  return (
    <Link
      href={href}
      className="block px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded transition-colors"
    >
      {children}
    </Link>
  );
}
