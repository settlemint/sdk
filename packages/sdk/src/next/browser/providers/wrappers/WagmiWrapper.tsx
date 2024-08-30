"use client";

import type { PropsWithChildren } from "react";
import { WagmiProvider, type WagmiProviderProps } from "wagmi";

export type WagmiProps = {
  wagmiConfig: WagmiProviderProps["config"];
  initialState: WagmiProviderProps["initialState"];
};

/**
 * Wrapper component for WagmiProvider to enable Ethereum interactions in the application.
 *
 * This component wraps the application with Wagmi's WagmiProvider, allowing for
 * seamless integration of Ethereum functionality throughout the app.
 *
 * @param props - The properties for the WagmiWrapper component.
 * @param props.children - The child components to be wrapped.
 * @param props.wagmiConfig - The configuration object for Wagmi.
 * @param props.initialState - The initial state for Wagmi.
 * @returns The WagmiProvider component with the provided configuration and children.
 *
 * @example
 * ```tsx
 * <WagmiWrapper
 *   wagmiConfig={wagmiConfig}
 *   initialState={initialState}
 * >
 *   <YourApp />
 * </WagmiWrapper>
 * ```
 */
export function WagmiWrapper({ children, ...props }: PropsWithChildren<WagmiProps>) {
  return (
    <WagmiProvider config={props.wagmiConfig} initialState={props.initialState} reconnectOnMount={true}>
      {children}
    </WagmiProvider>
  );
}
