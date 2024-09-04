import { connectSettlemint } from "@/.settlemint/index";

export const settlemint = connectSettlemint({
  wagmi: {
    appName: "SettleMint Asset Tokenization",
    appIcon: `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/apple-icon.png`,
  },
});
