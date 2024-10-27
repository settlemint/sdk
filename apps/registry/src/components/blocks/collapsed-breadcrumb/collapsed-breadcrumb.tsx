import { EllipsisDropdown } from "@/components/blocks/collapsed-breadcrumb/collapsed-breadcrumb-ellipsis";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  maxVisibleItems?: number;
  className?: string;
  routeSegments: string[];
}

interface ProcessedBreadcrumbItems {
  visibleItems: (BreadcrumbItemType | null)[];
  collapsedItems: BreadcrumbItemType[];
}

function capitalizeLabel(route: string): string {
  return route
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function processBreadcrumbItems(items: BreadcrumbItemType[], maxVisibleItems: number): ProcessedBreadcrumbItems {
  if (items.length <= maxVisibleItems) {
    return { visibleItems: items, collapsedItems: [] };
  }

  return {
    visibleItems: [
      items[0],
      null, // placeholder for ellipsis
      ...items.slice(-(maxVisibleItems - 1)),
    ],
    collapsedItems: items.slice(1, -maxVisibleItems + 1),
  };
}

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

/**
 * Renders a breadcrumb component with collapsible items.
 * @param props - The component props.
 * @returns The rendered Breadcrumb component.
 */
export default function CollapsedBreadcrumbs({ maxVisibleItems = 3, className, routeSegments }: BreadcrumbsProps) {
  if (routeSegments.length === 0) {
    return null;
  }

  const breadcrumbItems = routeSegments.reduce<BreadcrumbItemType[]>((items, route, index) => {
    const isLastItem = index === routeSegments.length - 1;
    const href = !isLastItem
      ? items.length === 0
        ? `/${route}`
        : `${items[items.length - 1].href}/${route}`
      : undefined;

    items.push({
      label: capitalizeLabel(route),
      href,
    });
    return items;
  }, []);

  const { visibleItems, collapsedItems } = processBreadcrumbItems(breadcrumbItems, maxVisibleItems);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
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
