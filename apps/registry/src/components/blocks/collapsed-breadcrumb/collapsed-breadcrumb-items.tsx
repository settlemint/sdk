"use client";

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment, useMemo } from "react";
import { EllipsisDropdown } from "./collapsed-breadcrumb-ellipsis";
import { useCollapsedBreadcrumb } from "./collapsed-breadcrumb-provider";

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
}

/**
 * Renders a breadcrumb component with collapsible items.
 * @param props - The component props.
 * @returns The rendered Breadcrumb component.
 */
export default function CollapsedBreadcrumbItems({ maxVisibleItems }: BreadcrumbsProps) {
  const { breadcrumbItems } = useCollapsedBreadcrumb();

  const { visibleItems, collapsedItems } = useMemo(
    () => processBreadcrumbItems(breadcrumbItems, maxVisibleItems),
    [maxVisibleItems, breadcrumbItems],
  );

  if (breadcrumbItems.length === 0) {
    return null;
  }

  const visibleBreadcrumbs = visibleItems.map((item, i) => {
    if (i === visibleItems.length - 1 && item?.href) {
      return { label: item.label };
    }
    return item;
  });

  return visibleBreadcrumbs.map((item, index) => {
    return (
      <Fragment key={item ? item.label : `ellipsis-${index}`}>
        {index > 0 && <BreadcrumbSeparator />}
        <BreadcrumbItem>{renderBreadcrumbItem(item, collapsedItems)}</BreadcrumbItem>
      </Fragment>
    );
  });
}
