import { ClientProvider } from "@/components/providers/ClientProvider";
import { PublicFooter } from "@/components/public/footer";
import { PublicHeader } from "@/components/public/header";
import { wagmiConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SettleMint Asset Tokenization Starterkit",
  description: "SettleMint Asset Tokenization Starterkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(wagmiConfig, headers().get("cookie"));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ClientProvider initialState={initialState}>
          <div className="flex flex-col min-h-[100dvh] relative">
            <div className="absolute inset-0 z-[-1] bg-[url('/background-lm.svg')] dark:bg-[url('/background-dm.svg')] bg-cover bg-center" />
            <PublicHeader />
            <main>{children}</main>
            <PublicFooter />
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
