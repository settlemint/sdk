"use client";

import { settlemint } from "@/lib/settlemint";
import { SettleMintProvider } from "@settlemint/sdk/browser";
import { QueryClient } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import type { FC, PropsWithChildren } from "react";
import type { State } from "wagmi";

// Create a React Query client -> https://tanstack.com/query/latest/docs/framework/react/quick-start
const queryClient = new QueryClient();

createWeb3Modal(settlemint.wagmi.web3ModalConfig);

export const ClientProvider: FC<
  PropsWithChildren<{
    initialState?: State;
  }>
> = ({ children, initialState }) => {
  return (
    <SettleMintProvider
      wagmi={{ enabled: true, config: settlemint.wagmi.wagmiConfig, initialState }}
      reactQuery={{ enabled: true, client: queryClient }}
    >
      {children}
    </SettleMintProvider>
  );
};
