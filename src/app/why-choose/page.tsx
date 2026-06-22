import PageHero from "@/components/PageHero";
import WhyChoose from "@/components/WhyChoose";
import { getPageSeo } from "@/lib/seo";

export async function generateMetadata() {
  return getPageSeo("why-choose");
}

export default function WhyChoosePage() {
  return (
    <main>
      <PageHero
        label="Our Advantages"
        title="Why Choose"
        titleHighlight="JOSPO?"
        subtitle="Every JOSPO cooler is engineered with precision, built for performance, and designed to last."
      />
      <WhyChoose />
    </main>
  );
}
