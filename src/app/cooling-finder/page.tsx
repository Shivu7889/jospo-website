import PageHero from "@/components/PageHero";
import CoolingFinder from "@/components/CoolingFinder";
import { getPageSeo } from "@/lib/seo";

export async function generateMetadata() {
  return getPageSeo("cooling-finder");
}

export default function CoolingFinderPage() {
  return (
    <main>
      <PageHero
        label="Smart Recommendation"
        title="Cooling"
        titleHighlight="Finder"
        subtitle="Answer a few questions and we'll recommend the perfect JOSPO cooler for your space."
      />
      <CoolingFinder />
    </main>
  );
}
