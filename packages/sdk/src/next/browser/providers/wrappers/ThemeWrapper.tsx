"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import type { PropsWithChildren } from "react";

/**
 * ThemeWrapper component for providing theme context to the application.
 *
 * This component wraps the application with the ThemeProvider from next-themes,
 * enabling easy theme management and switching.
 *
 * @param props - The properties for the ThemeWrapper component.
 * @returns A wrapped component with theme context.
 *
 * @example
 * ```tsx
 * <ThemeWrapper attribute="class" defaultTheme="system" enableSystem>
 *   <YourApp />
 * </ThemeWrapper>
 * ```
 */
export function ThemeWrapper({ children, ...props }: PropsWithChildren<ThemeProviderProps>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
