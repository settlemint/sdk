import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { type BreadcrumbItemType, EllipsisDropdown } from "./ellipsis-dropdown";

interface ProcessedBreadcrumbItems {
  visibleItems: (BreadcrumbItemType | null)[];
  collapsedItems: BreadcrumbItemType[];
}

function processBreadcrumbItems(items: BreadcrumbItemType[]): ProcessedBreadcrumbItems {
  if (items.length <= 3) {
    return { visibleItems: items, collapsedItems: [] };
  }

  return {
    visibleItems: [
      items[0],
      null, // placeholder for ellipsis
      ...items.slice(-2),
    ],
    collapsedItems: items.slice(1, -2),
  };
}

function renderBreadcrumbItem(item: BreadcrumbItemType | null, index: number, collapsedItems: BreadcrumbItemType[]) {
  if (item === null) {
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

export default function SecureBreadcrumb({ items }: { items: BreadcrumbItemType[] }) {
  const { visibleItems, collapsedItems } = processBreadcrumbItems(items);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visibleItems.map((item, index) => (
          <>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem key={item ? item.label : `ellipsis-${index}`}>
              {renderBreadcrumbItem(item, index, collapsedItems)}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
