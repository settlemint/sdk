import Image from "next/image";

export function PublicFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/background-lm.svg')] bg-cover bg-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              Unlock New Possibilities with Asset Tokenization
            </h2>
            <p className="max-w-[900px] mx-auto text-center text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
                  <h3 className="text-xl font-bold text-white">Issue Stablecoins & financial assets</h3>
                  <p className="text-white/80">
                    Create and manage coins backed by real-world assets or entirely digital assets, providing a store of
                    value and medium of exchange.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold text-white">Fractional Ownership</h3>
                  <p className="text-white/80">
                    Tokenize assets and enable fractional ownership, opening up new investment opportunities.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold text-white">Improved Liquidity</h3>
                  <p className="text-white/80">
                    Increase the liquidity of your assets by making them tradable on secondary markets.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
