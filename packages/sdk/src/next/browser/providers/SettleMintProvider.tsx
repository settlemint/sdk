"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { ReactQueryWrapper } from "./wrappers/ReactQueryWrapper";
import { ThemeWrapper } from "./wrappers/ThemeWrapper";
import { type WagmiProps, WagmiWrapper } from "./wrappers/WagmiWrapper";

interface SettleMintProviderProps extends PropsWithChildren, WagmiProps {
  session: Session | null;
}

/**
 * SettleMintProvider component that wraps the application with various providers.
 *
 * This component combines SessionProvider, ThemeWrapper, WagmiWrapper, and ReactQueryWrapper
 * to provide authentication, theming, Ethereum interactions, and data fetching capabilities.
 *
 * @param props - The properties for the SettleMintProvider.
 * @param props.children - The child components to be wrapped.
 * @param props.wagmiConfig - The configuration object for Wagmi.
 * @param props.initialState - The initial state for Wagmi.
 * @param props.session - The session object for authentication.
 * @returns The wrapped application components.
 *
 * @example
 * ```tsx
 * <SettleMintProvider
 *   wagmiConfig={wagmiConfig}
 *   initialState={initialState}
 *   session={session}
 * >
 *   <YourApp />
 * </SettleMintProvider>
 * ```
 */
export function SettleMintProvider({ children, wagmiConfig, initialState, session }: SettleMintProviderProps) {
  return (
    <SessionProvider session={session}>
      <ThemeWrapper attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <WagmiWrapper wagmiConfig={wagmiConfig} initialState={initialState}>
          <ReactQueryWrapper>{children}</ReactQueryWrapper>
        </WagmiWrapper>
      </ThemeWrapper>
    </SessionProvider>
  );
}
