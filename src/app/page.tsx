import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import Testimonials from "@/components/Testimonials";
import FoundingTeam from "@/components/FoundingTeam";
import Contact from "@/components/Contact";
import { getPageSeo } from "@/lib/seo";

export async function generateMetadata() {
  return getPageSeo("home");
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCatalog />
      <Testimonials />
      <FoundingTeam />
      <Contact />
    </main>
  );
}
