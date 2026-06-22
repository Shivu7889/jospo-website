import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import { getPageSeo } from "@/lib/seo";

export async function generateMetadata() {
  return getPageSeo("faq");
}

export default function FAQPage() {
  return (
    <main>
      <PageHero
        label="Help Center"
        title="Frequently Asked"
        titleHighlight="Questions"
        subtitle="Find answers to common questions about JOSPO coolers, ordering, and support."
      />
      <FAQ />
    </main>
  );
}
