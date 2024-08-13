import { QueryClientProvider, type QueryClientProviderProps } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface SettleMintProviderProps extends QueryClientProviderProps {}

export const SettleMintProvider: React.FC<SettleMintProviderProps> = ({ client, children }) => {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
