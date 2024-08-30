"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

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
 * ReactQueryWrapper component that provides a QueryClientProvider with a pre-configured QueryClient to its children.
 *
 * This component wraps the application with React Query's QueryClientProvider,
 * enabling efficient data fetching and state management capabilities.
 *
 * @param props - The properties for the ReactQueryWrapper component.
 * @returns The QueryClientProvider component with the provided QueryClient and children.
 *
 * @example
 * ```tsx
 * <ReactQueryWrapper>
 *   <YourApp />
 * </ReactQueryWrapper>
 * ```
 */
export function ReactQueryWrapper({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
