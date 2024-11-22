"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

/**
 * A wrapper component that provides theme functionality to its children.
 * This component uses the NextThemesProvider from the next-themes library to manage theme state.
 *
 * @param props - The properties passed to the ThemeProvider component.
 * @param props.children - The child components to be wrapped by the ThemeProvider.
 * @returns A NextThemesProvider component wrapping the provided children.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
