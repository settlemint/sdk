import { connectSettlemint } from "@/.settlemint/index";

export const settlemint = connectSettlemint({
  wagmi: {
    web3ModalConfig: {
      metadata: {
        name: "SettleMint Asset Tokenization",
        description: "SettleMint Asset Tokenization StarterKit",
        icons: [`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/apple-icon.png`],
      },
    },
  },
});
