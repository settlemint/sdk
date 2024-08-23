"use client";

import { cn } from "@/lib/utils";

export function FormPage({ title, page = 0, children }: { title?: string; page?: number; children: React.ReactNode }) {
  return (
    <div className={cn("FormPage space-y-4", { hidden: page === 1 })}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
