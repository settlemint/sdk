import { connectSettlemint } from "@/.settlemint/index";
import { env } from "next-runtime-env";

export const settlemint = connectSettlemint({
  wagmi: {
    web3ModalConfig: {
      metadata: {
        name: "SettleMint Asset Tokenization",
        description: "SettleMint Asset Tokenization StarterKit",
        icons: [`${env("NEXT_PUBLIC_SETTLEMINT_APP_URL")}/apple-icon.png`],
      },
    },
  },
});
