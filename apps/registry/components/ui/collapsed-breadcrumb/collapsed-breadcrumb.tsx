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
import { usePathname } from "next/navigation";
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
 * @returns An object containing visible items and collapsed items.
 */
function processBreadcrumbItems(items: BreadcrumbItemType[]): ProcessedBreadcrumbItems {
  if (items.length <= 3) {
    return { visibleItems: items, collapsedItems: [] };
  }

  return {
    visibleItems: [items[0], null, items[items.length - 2], items[items.length - 1]],
    collapsedItems: items.slice(1, -2),
  };
}

/**
 * Renders a single breadcrumb item.
 * @param item - The breadcrumb item to render.
 * @param collapsedItems - The array of collapsed items (used for the ellipsis dropdown).
 * @param LinkComponent - The Link component to use for rendering the breadcrumb item.
 * @returns The rendered breadcrumb item.
 */
function renderBreadcrumbItem(
  item: BreadcrumbItemType | null,
  collapsedItems: BreadcrumbItemType[],
  LinkComponent: React.ComponentType<React.ComponentProps<typeof Link>>,
) {
  if (item === null) {
    return <EllipsisDropdown items={collapsedItems} linkComponent={LinkComponent} />;
  }

  if (item.href) {
    return (
      <BreadcrumbLink asChild>
        <LinkComponent href={item.href}>{item.label}</LinkComponent>
      </BreadcrumbLink>
    );
  }

  return <BreadcrumbPage>{item.label}</BreadcrumbPage>;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemType[];
  linkComponent?: React.ComponentType<React.ComponentProps<typeof Link>>;
}

/**
 * Renders a breadcrumb component with collapsible items.
 * @param props - The component props.
 * @returns The rendered Breadcrumb component.
 */
export default function CollapsedBreadcrumbs({ items, linkComponent: LinkComponent = Link }: BreadcrumbsProps) {
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    const currentPageItem = items.find((item) => item.href === pathname);
    return currentPageItem ? [items[0], currentPageItem] : [items[0]];
  }, [items, pathname]);

  const { visibleItems, collapsedItems } = useMemo(() => processBreadcrumbItems(breadcrumbItems), [breadcrumbItems]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
          return (
            <Fragment key={item ? item.label : `ellipsis-${index}`}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>{renderBreadcrumbItem(item, collapsedItems, LinkComponent)}</BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

interface EllipsisDropdownProps {
  items: BreadcrumbItemType[];
  linkComponent: React.ComponentType<React.ComponentProps<typeof Link>>;
}

/**
 * Renders a dropdown component for collapsed breadcrumb items.
 * @param props - The component props.
 * @returns The rendered EllipsisDropdown component.
 */
export function EllipsisDropdown({ items, linkComponent: LinkComponent }: EllipsisDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="h-auto p-0 font-normal" aria-label="Toggle hidden breadcrumb items">
          …
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        {items.map(({ label, href }) => (
          <EllipsisDropdownItem key={label} href={href ?? "#"} linkComponent={LinkComponent}>
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
  linkComponent: React.ComponentType<React.ComponentProps<typeof Link>>;
}

/**
 * Renders a single item in the ellipsis dropdown.
 * @param props - The component props.
 * @returns The rendered EllipsisDropdownItem component.
 */
function EllipsisDropdownItem({ href, children, linkComponent: LinkComponent }: EllipsisDropdownItemProps) {
  return (
    <LinkComponent
      href={href}
      className="block px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded transition-colors"
    >
      {children}
    </LinkComponent>
  );
}
