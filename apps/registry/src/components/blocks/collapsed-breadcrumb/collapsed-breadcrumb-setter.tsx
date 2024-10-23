"use client";

import type { BreadcrumbItemType } from "@/components/blocks/collapsed-breadcrumb/collapsed-breadcrumb";
import { useEffect } from "react";
import { useCollapsedBreadcrumb } from "./collapsed-breadcrumb-provider";

export function CollapsedBreadcrumbSetter({ items }: { items: BreadcrumbItemType[] }) {
  const { setItems } = useCollapsedBreadcrumb();

  useEffect(() => {
    setItems(items);
  }, [setItems, items]);

  return null;
}
