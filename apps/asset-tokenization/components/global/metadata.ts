import type { Metadata } from "next";
import { env } from "next-runtime-env";

export const metadata: Metadata = {
  metadataBase: new URL(env("NEXT_PUBLIC_SETTLEMINT_APP_URL") ?? ""),
  title: "Asset Tokenization, a SettleMint Starter Kit",
  description:
    "Unlock the Power of Asset Tokenization with this pre-configured to leverage your SettleMint application and provide an easy way to get started with your own asset tokenization solution.",
  keywords: ["asset tokenization", "blockchain", "SettleMint", "blockchain transformation"],
  authors: [{ name: "SettleMint", url: "https://settlemint.com" }],
  twitter: {
    title: "Asset Tokenization, a SettleMint Starter Kit",
    description:
      "Unlock the Power of Asset Tokenization with this pre-configured to leverage your SettleMint application and provide an easy way to get started with your own asset tokenization solution.",
  },
  openGraph: {
    title: "Asset Tokenization, a SettleMint Starter Kit",
    description:
      "Unlock the Power of Asset Tokenization with this pre-configured to leverage your SettleMint application and provide an easy way to get started with your own asset tokenization solution.",
    url: env("NEXT_PUBLIC_SETTLEMINT_APP_URL"),
    siteName: "Asset Tokenization",
    locale: "en_US",
    type: "website",
  },
};
