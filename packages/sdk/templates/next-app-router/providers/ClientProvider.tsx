"use client";

import { settleMintWagmiConfig } from "@/.settlemint/node/wagmi";
import { SettleMintProvider } from "@settlemint/sdk-react";
import { QueryClient } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

// biome-ignore lint/suspicious/noEmptyInterface: currently there are no custom props for this provider
export interface ClientProviderProps {}

// Create a React Query client -> https://tanstack.com/query/latest/docs/framework/react/quick-start
const queryClient = new QueryClient();

// Create the Wagmi Config
const wagmiConfig = settleMintWagmiConfig();

export const ClientProvider: FC<PropsWithChildren<ClientProviderProps>> = ({ children }) => {
  return (
    <SettleMintProvider
      wagmi={{ enabled: true, config: wagmiConfig }}
      reactQuery={{ enabled: true, client: queryClient }}
    >
      {children}
    </SettleMintProvider>
  );
};
