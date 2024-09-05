import { connectSettlemint } from "@/.settlemint/index";

export const settlemint = connectSettlemint({
  wagmi: {
    appName: "SettleMint Asset Tokenization",
    appIcon: `${process.env.SETTLEMINT_APP_URL}/apple-icon.png`,
  },
});
