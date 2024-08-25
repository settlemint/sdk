"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import type { PropsWithChildren } from "react";

/**
 * ThemeWrapper component for providing theme context to the application.
 *
 * @param props - The props for the ThemeProvider component
 * @returns A wrapped component with theme context
 */
export function ThemeWrapper({ children, ...props }: PropsWithChildren<ThemeProviderProps>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
