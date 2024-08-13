import { QueryClientProvider, type QueryClientProviderProps } from "@tanstack/react-query";
import type { FC } from "react";

interface SettleMintProviderProps extends QueryClientProviderProps {}

export const SettleMintProvider: FC<SettleMintProviderProps> = ({ client, children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
