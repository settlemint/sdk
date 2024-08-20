import { ClientProvider } from "@/components/providers/ClientProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PublicHeader } from "@/components/public/header";
import { wagmiConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
import Link from "next/link";
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
      <ClientProvider initialState={initialState}>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex flex-col min-h-[100dvh] relative">
              <div className="absolute inset-0 z-[-1] bg-[url('/background-lm.svg')] dark:bg-[url('/background-dm.svg')] bg-cover bg-center" />
              <PublicHeader title="SettleMint Asset Tokenization Starterkit" />
              <main>{children}</main>
              <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-white">
                  &copy; {new Date().getFullYear()}{" "}
                  <Link href="https://settlemint.com" className="hover:underline" prefetch={false}>
                    SettleMint
                  </Link>
                  . Freely available under the Functional Source License, Version 1.1, MIT Future License.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                  <Link
                    href="https://console.settlemint.com/documentation/docs/terms-and-policies/terms-of-service/"
                    className="text-xs hover:underline underline-offset-4 text-white/80"
                    prefetch={false}
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="https://console.settlemint.com/documentation/docs/terms-and-policies/privacy-policy/"
                    className="text-xs hover:underline underline-offset-4 text-white/80"
                    prefetch={false}
                  >
                    Privacy
                  </Link>
                  <Link
                    href="https://console.settlemint.com/documentation/docs/terms-and-policies/cookie-policy/"
                    className="text-xs hover:underline underline-offset-4 text-white/80"
                    prefetch={false}
                  >
                    Cookies
                  </Link>
                </nav>
              </footer>
            </div>
          </ThemeProvider>
        </body>
      </ClientProvider>
    </html>
  );
}
