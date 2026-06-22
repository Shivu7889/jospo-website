import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import PageSeo from "@/models/PageSeo";

// Default SEO values as fallback when database is unreachable
const defaultSeo: Record<string, { metaTitle: string; metaDescription: string }> = {
  home: {
    metaTitle: "JOSPO Cooling Solutions Pvt. Ltd. | India's Trusted Air Cooler Manufacturer",
    metaDescription: "JOSPO is a leading manufacturer of high-performance desert, commercial & industrial air coolers in Bhiwadi, Rajasthan.",
  },
  about: {
    metaTitle: "About Us | JOSPO Cooling Solutions",
    metaDescription: "Learn about JOSPO Cooling Solutions — India's trusted manufacturer of high-performance air coolers.",
  },
  faq: {
    metaTitle: "FAQ | JOSPO Cooling Solutions",
    metaDescription: "Frequently asked questions about JOSPO air coolers.",
  },
  "cooling-finder": {
    metaTitle: "Cooling Finder | JOSPO Cooling Solutions",
    metaDescription: "Find the perfect air cooler for your space with JOSPO's smart recommendation tool.",
  },
  manufacturing: {
    metaTitle: "Manufacturing | JOSPO Cooling Solutions",
    metaDescription: "Explore JOSPO's state-of-the-art manufacturing facility in Bhiwadi, Rajasthan.",
  },
  "why-choose": {
    metaTitle: "Why Choose JOSPO | JOSPO Cooling Solutions",
    metaDescription: "Discover why JOSPO is India's trusted air cooler manufacturer.",
  },
  blog: {
    metaTitle: "Blog | JOSPO Cooling Solutions",
    metaDescription: "Read the latest articles about cooling tips, product guides, and industry news.",
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
