import PageHero from "@/components/PageHero";
import Manufacturing from "@/components/Manufacturing";
import { getPageSeo } from "@/lib/seo";

export async function generateMetadata() {
  return getPageSeo("manufacturing");
}

export default function ManufacturingPage() {
  return (
    <main>
      <PageHero
        label="Our Factory"
        title="Manufacturing"
        titleHighlight="Excellence"
        subtitle="State-of-the-art production facility with advanced machinery and skilled workforce delivering premium quality coolers."
      />
      <Manufacturing />
    </main>
  );
}
