import type { PropsWithChildren, ReactNode } from "react";

export default function BlocksLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs: ReactNode }>) {
  return (
    <div className="container max-w-screen-lg mx-auto">
      {breadcrumbs}
      {children}
    </div>
  );
}
