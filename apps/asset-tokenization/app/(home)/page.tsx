import { PublicFeatures } from "@/components/public/features";
import { PublicHero } from "@/components/public/hero";

export default function Home() {
  return (
    <main>
      <PublicHero />
      <PublicFeatures />
    </main>
  );
}
