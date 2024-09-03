"use client";

import { settlemint } from "@/lib/settlemint";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { type GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";

interface SettleMintProviderProps {
  session: Session | null;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to the SettleMint Asset Tokenization Starter Kit",
});

export function SettleMintProvider({ children, session }: PropsWithChildren<SettleMintProviderProps>) {
  const wagmiConfig = getDefaultConfig(settlemint.node.wagmi);
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange={true}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={true}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
              <RainbowKitProvider {...wagmiConfig}>{children}</RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
