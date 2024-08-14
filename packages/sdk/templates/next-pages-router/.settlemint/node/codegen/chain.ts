
import { defineChain } from "viem";

export const chain = defineChain({
  id: 48881,
  name: "settlemint-48881",
  nativeCurrency: {
    decimals: 18,
    name: "SettleMint",
    symbol: "SM",
  },
  rpcUrls: {
    default: {
      http: [`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/node/jsonrpc`],
    },
  },
});
