import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import PageSeo from "@/models/PageSeo";

// Default SEO values as fallback when database is unreachable
const defaultSeo: Record<string, { metaTitle: string; metaDescription: string }> = {
  home: {
    metaTitle: "JOSPO Cooler | Best Cooler Manufacturing Company in India",
    metaDescription: "JOSPO (jospocooler) is India's leading air cooler manufacturing company specializing in high-performance residential, commercial, and industrial coolers.",
  },
  about: {
    metaTitle: "About JOSPO | India's Premier Cooler Manufacturing Company",
    metaDescription: "Discover JOSPO, India's trusted cooler manufacturing company. Delivering energy-efficient and high-performance jospocooler models across India.",
  },
  faq: {
    metaTitle: "FAQ | JOSPO Cooler & Cooling Solutions",
    metaDescription: "Frequently asked questions about JOSPO air coolers, jospocooler models, electricity consumption, and dealer services.",
  },
  "cooling-finder": {
    metaTitle: "Cooling Finder | Find Your Perfect JOSPO Cooler",
    metaDescription: "Not sure which cooler is best? Try JOSPO's cooling finder tool to choose the perfect air cooler for your space.",
  },
  manufacturing: {
    metaTitle: "Cooler Manufacturing Facility | JOSPO Cooling Solutions",
    metaDescription: "Step inside JOSPO's state-of-the-art air cooler manufacturing plant in Bhiwadi, Rajasthan. See how our heavy-duty coolers are built.",
  },
  "why-choose": {
    metaTitle: "Why Choose JOSPO | Best Air Cooler Manufacturer",
    metaDescription: "Find out why JOSPO is ranked as India's best air cooler manufacturer with premium components, warranty support, and dealer networks.",
  },
  blog: {
    metaTitle: "Cooler Guides & Industry Blog | JOSPO Cooler",
    metaDescription: "Get the latest air cooler guides, cooling tips, maintenance advice, and news from JOSPO, your trusted cooler manufacturer.",
  },
};

export async function getPageSeo(pageSlug: string): Promise<Metadata> {
  const fallback = defaultSeo[pageSlug] || {
    metaTitle: "JOSPO Cooling Solutions",
    metaDescription: "India's trusted air cooler manufacturer.",
  };

  try {
    await connectDB();
    const seo = await PageSeo.findOne({ pageSlug }).lean();

    if (!seo) {
      return {
        title: fallback.metaTitle,
        description: fallback.metaDescription,
      };
    }

    return {
      title: seo.metaTitle || fallback.metaTitle,
      description: seo.metaDescription || fallback.metaDescription,
      openGraph: {
        title: seo.ogTitle || seo.metaTitle || fallback.metaTitle,
        description: seo.ogDescription || seo.metaDescription || fallback.metaDescription,
        ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
      },
      ...(seo.keywords && seo.keywords.length > 0 ? { keywords: seo.keywords } : {}),
      ...(seo.canonicalUrl ? { alternates: { canonical: seo.canonicalUrl } } : {}),
    };
  } catch (error) {
    console.error(`Error fetching SEO for ${pageSlug}:`, error);
    return {
      title: fallback.metaTitle,
      description: fallback.metaDescription,
    };
  }
}
