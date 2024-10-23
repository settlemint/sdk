"use client";

import { type PropsWithChildren, createContext, useContext, useState } from "react";
import type { BreadcrumbItemType } from "./collapsed-breadcrumb";

interface CollapsedBreadcrumbContextType {
  breadcrumbItems: BreadcrumbItemType[];
  setItems: React.Dispatch<React.SetStateAction<BreadcrumbItemType[]>>;
}

const CollapsedBreadcrumbContext = createContext<CollapsedBreadcrumbContextType | undefined>(undefined);

export function useCollapsedBreadcrumb() {
  const context = useContext(CollapsedBreadcrumbContext);
  if (!context) {
    throw new Error("useCollapsedBreadcrumb must be used within a CollapsedBreadcrumbProvider");
  }
  return context;
}

export function CollapsedBreadcrumbProvider({ children }: PropsWithChildren) {
  const [breadcrumbItems, setItems] = useState<BreadcrumbItemType[]>([]);

  return (
    <CollapsedBreadcrumbContext.Provider value={{ breadcrumbItems, setItems }}>
      {children}
    </CollapsedBreadcrumbContext.Provider>
  );
}
