"use client";

import { settlemint } from "@/lib/settlemint";
import { RainbowKitProvider, darkTheme, getDefaultConfig, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, isServer } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { WagmiProvider, deserialize, serialize } from "wagmi";
import { hashFn } from "wagmi/query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1_000 * 60 * 60 * 24, // 24 hours
        structuralSharing: false, // TODO: https://github.com/wevm/wagmi/issues/4233
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

const persister = createSyncStoragePersister({
  serialize,
  storage: isServer ? undefined : window.localStorage,
  deserialize,
});

export function SettleMintProvider({ children }: PropsWithChildren) {
  const wagmiConfig = getDefaultConfig(settlemint.node.wagmi);
  const queryClient = getQueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange={true}>
      <WagmiProvider config={wagmiConfig} reconnectOnMount={true}>
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
          <ReactQueryStreamedHydration>
            <RainbowKitProvider
              {...wagmiConfig}
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
