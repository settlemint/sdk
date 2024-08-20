"use client";

import { wagmiConfig, web3ModalConfig } from "@/lib/config";
import { SettleMintProvider } from "@settlemint/sdk-next/providers/SettleMintProvider";
import { QueryClient } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import type { FC, PropsWithChildren } from "react";
import type { State } from "wagmi";

export interface ClientProviderProps {
  initialState?: State;
}

// Create a React Query client -> https://tanstack.com/query/latest/docs/framework/react/quick-start
const queryClient = new QueryClient();

createWeb3Modal(web3ModalConfig);

export const ClientProvider: FC<PropsWithChildren<ClientProviderProps>> = ({ children, initialState }) => {
  return (
    <SettleMintProvider
      wagmi={{ enabled: true, config: wagmiConfig, initialState }}
      reactQuery={{ enabled: true, client: queryClient }}
    >
      {children}
    </SettleMintProvider>
  );
};
