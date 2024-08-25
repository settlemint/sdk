import { chain } from "@/.settlemint/node/chain";
import type { paths } from "@/.settlemint/portal/rest/portal-schema.d.ts";
import { createSdk } from "@settlemint/sdk/browser";
import config from "../../../.settlemintrc.json";

export const settlemint = createSdk<paths>(config, {
  chain,
  wagmi: {
    web3ModalConfig: {
      metadata: {
        name: "SettleMint Asset Tokenization",
        description: "SettleMint Asset Tokenization StarterKit",
        icons: [`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/apple-icon.png`],
      },
      themeVariables: {
        "--w3m-color-mix": "#3b82f6",
      },
    },
  },
});
