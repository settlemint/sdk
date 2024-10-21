"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type React from "react";
import type { ReactNode } from "react";

interface SidePanelProps {
  title: string;
  description: string;
  trigger: React.ReactNode;
  children: ReactNode;
}

export function SidePanel({ children, title, description, trigger }: SidePanelProps) {
  return (
    <div className="SidePanel">
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="w-[33%] lg:max-w-[33%]">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="-ml-8 -mr-8">{children}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
