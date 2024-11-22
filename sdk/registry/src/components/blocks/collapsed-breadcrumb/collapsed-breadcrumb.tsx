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

interface BreadcrumbsProps {
  maxVisibleItems?: number;
  className?: string;
  routeSegments: string[];
}

export default function CollapsedBreadcrumbs({ maxVisibleItems = 3, className, routeSegments }: BreadcrumbsProps) {
  if (!routeSegments.length) return null;

  const items = routeSegments.map((route, index) => ({
    label: route
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
    href: index < routeSegments.length - 1 ? `/${routeSegments.slice(0, index + 1).join("/")}` : undefined,
  }));

  const visibleItems =
    items.length <= maxVisibleItems
      ? items
      : [items[0], { label: "...", items: items.slice(1, -maxVisibleItems + 1) }, ...items.slice(-maxVisibleItems + 1)];

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {visibleItems.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {"items" in item ? (
                <EllipsisDropdown items={item.items} />
              ) : item.href ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
