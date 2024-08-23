import { TokenizationWizard } from "@/components/features/tokenization-wizard";
import { PublicFeatures } from "@/components/public/features";
import { PublicHero } from "@/components/public/hero";
import { SidePanel } from "@/components/ui/sidepanel";

export default function Home() {
  return (
    <div>
      <PublicHero />
      <PublicFeatures />
      <SidePanel>
        <TokenizationWizard />
      </SidePanel>
    </div>
  );
}
