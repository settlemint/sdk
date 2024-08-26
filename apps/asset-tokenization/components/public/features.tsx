import Image from "next/image";

/**
 * Array of feature objects representing key features of the asset tokenization platform.
 * Each feature has an id, title, and description.
 */
const FEATURES = [
  {
    id: "stablecoins",
    title: "Issue stablecoins & financial assets",
    description:
      "Create and manage coins backed by real-world assets or entirely digital assets, providing a store of value and medium of exchange.",
  },
  {
    id: "fractional",
    title: "Fractional ownership",
    description: "Tokenize assets and enable fractional ownership, opening up new investment opportunities.",
  },
  {
    id: "liquidity",
    title: "Improved liquidity",
    description: "Increase the liquidity of your assets by making them tradable on secondary markets.",
  },
];

/**
 * PublicFeatures component
 *
 * Renders a section showcasing the key features of the asset tokenization platform.
 * Includes a title, description, image, and a list of features.
 *
 * @returns {JSX.Element} The rendered PublicFeatures component
 */
export function PublicFeatures() {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-[url('/background-lm.svg')] bg-cover bg-center"
      aria-labelledby="features-heading"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <span className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</span>
            <h2 id="features-heading" className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              Unlock New Possibilities with Asset Tokenization
            </h2>
            <p className="max-w-[900px] mx-auto text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              This starterkit and the SettleMint platform provides a comprehensive suite of tools to streamline the
              tokenization process, enabling businesses to unlock new investment opportunities and improve liquidity.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <Image
            src="/benefits.png"
            width={550}
            height={500}
            alt="Benefits of Asset Tokenization"
            className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            priority
            quality={85}
          />
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              {FEATURES.map((feature) => (
                <li key={feature.id} aria-label={feature.title}>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
