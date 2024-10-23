import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import CollapsedBreadcrumbItems from "./collapsed-breadcrumb-items";

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  maxVisibleItems?: number;
  className?: string;
}

/**
 * Renders a breadcrumb component with collapsible items.
 * @param props - The component props.
 * @returns The rendered Breadcrumb component.
 */
export default function CollapsedBreadcrumbs({ maxVisibleItems = 3, className }: BreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <CollapsedBreadcrumbItems maxVisibleItems={maxVisibleItems} />
      </BreadcrumbList>
    </Breadcrumb>
  );
}
