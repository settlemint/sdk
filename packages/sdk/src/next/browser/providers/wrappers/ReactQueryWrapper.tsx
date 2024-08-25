"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

/**
 * Creates a new QueryClient instance with default options.
 * Configures a stale time of 1 minute for all queries.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

/**
 * ReactQueryWrapper component.
 * Provides a QueryClientProvider with a pre-configured QueryClient to its children.
 *
 * @component
 * @param {PropsWithChildren} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped.
 * @returns {JSX.Element} The wrapped children with QueryClientProvider.
 */
export const ReactQueryWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
