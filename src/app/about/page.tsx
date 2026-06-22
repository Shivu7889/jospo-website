import PageHero from "@/components/PageHero";
import AboutUs from "@/components/AboutUs";
import { getPageSeo } from "@/lib/seo";

export async function generateMetadata() {
  return getPageSeo("about");
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        label="Who We Are"
        title="About"
        titleHighlight="JOSPO"
        subtitle="India's trusted manufacturer of high-performance air coolers, delivering premium cooling solutions with innovation and quality."
      />
      <AboutUs />
    </main>
  );
}
