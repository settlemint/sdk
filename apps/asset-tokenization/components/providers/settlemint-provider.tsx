"use client";

import { settlemint } from "@/lib/settlemint";
import { RainbowKitProvider, darkTheme, getDefaultConfig, lightTheme } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, useTheme } from "next-themes";
import type { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { hashFn } from "wagmi/query";

interface SettleMintProviderProps {
  session: Session | null;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      staleTime: 60 * 1000, // 1 minute
      structuralSharing: false, // TODO: https://github.com/wevm/wagmi/issues/4233
      refetchOnWindowFocus: false,
      queryKeyHashFn: hashFn,
    },
  },
});

export function SettleMintProvider({ children, session }: PropsWithChildren<SettleMintProviderProps>) {
  const wagmiConfig = getDefaultConfig(settlemint.node.wagmi);
  const { theme } = useTheme();

  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange={true}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={true}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitSiweNextAuthProvider>
              <RainbowKitProvider
                {...wagmiConfig}
                theme={{
                  lightMode: lightTheme({ fontStack: "system" }),
                  darkMode: darkTheme({ fontStack: "system" }),
                }}
              >
                {children}
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
