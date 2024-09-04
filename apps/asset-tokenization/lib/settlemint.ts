import { connectSettlemint } from "@/.settlemint/index";
import "@rainbow-me/rainbowkit/styles.css";
import { cookieStorage, createConfig, createStorage } from "wagmi";

export const settlemint = connectSettlemint({
  wagmi: {
    appName: "SettleMint Asset Tokenization",
    appIcon: `${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/apple-icon.png`,
  },
});

export function getConfig() {
  return createConfig({
    ...settlemint.node.wagmi,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
