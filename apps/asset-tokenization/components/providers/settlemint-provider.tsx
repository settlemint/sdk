"use client";

import { settlemint } from "@/lib/settlemint";
import { RainbowKitProvider, darkTheme, getDefaultConfig, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, isServer } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { PersistQueryClientProvider, type Persister } from "@tanstack/react-query-persist-client";
import { structuralSharing } from "@wagmi/core/query";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { WagmiProvider, cookieToInitialState, deserialize, serialize } from "wagmi";
import { hashFn } from "wagmi/query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1_000 * 60 * 60 * 24, // 24 hours
        structuralSharing, // https://github.com/wevm/wagmi/issues/4233
        queryKeyHashFn: hashFn,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

let browserPersister: Persister | undefined = undefined;

function getPersister() {
  if (isServer) {
    return createSyncStoragePersister({
      serialize,
      storage: isServer ? undefined : window.localStorage,
      deserialize,
    });
  }
  if (!browserPersister) {
    browserPersister = createSyncStoragePersister({
      serialize,
      storage: isServer ? undefined : window.localStorage,
      deserialize,
    });
  }
  return browserPersister;
}

export function SettleMintProvider({ children, cookie }: PropsWithChildren<{ cookie?: string | null }>) {
  const queryClient = getQueryClient();
  const wConfig = getDefaultConfig(settlemint.node.wagmi);
  const initialState = cookieToInitialState(wConfig, cookie);
  const persister = getPersister();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <WagmiProvider config={wConfig} initialState={initialState} reconnectOnMount={true}>
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
          <ReactQueryStreamedHydration>
            <RainbowKitProvider
              {...wConfig}
              showRecentTransactions={true}
              theme={{
                lightMode: lightTheme({ fontStack: "system" }),
                darkMode: darkTheme({ fontStack: "system" }),
              }}
            >
              {children}
            </RainbowKitProvider>
          </ReactQueryStreamedHydration>
        </PersistQueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
