'use client';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider, isServer } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import type { PropsWithChildren } from 'react';

/**
 * Creates and configures a new QueryClient instance.
 * @returns A new QueryClient instance.
 */
function makeQueryClient(): QueryClient {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  if (typeof window !== 'undefined') {
    const persister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient: client,
      persister,
    });
  }

  return client;
}

let browserQueryClient: QueryClient | undefined;

/**
 * Gets or creates a QueryClient instance.
 * @returns A QueryClient instance.
 */
function getQueryClient(): QueryClient {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

/**
 * Provides a QueryClient context for the application.
 * @param props - The component props.
 * @returns The QueryClientProvider component.
 */
export function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <ReactQueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryClientProvider>
  );
}