"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Unlock the Power of Asset Tokenization
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  This starterkit is pre-configured to leverage your{" "}
                  <Link href="https://settlemint.com">SettleMint</Link> application and provide an easy way to get
                  started with your own asset tokenization solution.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <p className="flex justify-center backdrop-blur-2xl static w-auto rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
                  <code className="font-mono font-bold">bunx @settlemint/sdk create -t asset-tokenization</code>
                </p>
              </div>
            </div>
            <Image
              src="/platform.png"
              width="550"
              height="550"
              alt="SettleMint Platform"
              className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Unlock New Possibilities with Asset Tokenization
              </h2>
              <p className="max-w-[900px] mx-auto text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                This starterkit and the SettleMint platform provides a comprehensive suite of tools to streamline the
                tokenization process, enabling businesses to unlock new investment opportunities and improve liquidity.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <Image
              src="/benefits.png"
              width="550"
              height="500"
              alt="Benefits of Asset Tokenization"
              className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Issue Stablecoins & financial assets</h3>
                    <p className="text-muted-foreground">
                      Create and manage coins backed by real-world assets or entirely digital assets, providing a store
                      of value and medium of exchange.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Fractional Ownership</h3>
                    <p className="text-muted-foreground">
                      Tokenize assets and enable fractional ownership, opening up new investment opportunities.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Improved Liquidity</h3>
                    <p className="text-muted-foreground">
                      Increase the liquidity of your assets by making them tradable on secondary markets.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
