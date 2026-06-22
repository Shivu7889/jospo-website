import { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogPostClient from "./BlogPostClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, isPublished: true }).lean();
    if (!blog) return { title: "Blog Post Not Found | JOSPO" };

    const b = blog as unknown as {
      title: string; excerpt: string; coverImage: string;
      seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string; canonicalUrl?: string; keywords?: string[] };
    };

    return {
      title: b.seo?.metaTitle || `${b.title} | JOSPO Blog`,
      description: b.seo?.metaDescription || b.excerpt,
      openGraph: {
        title: b.seo?.metaTitle || b.title,
        description: b.seo?.metaDescription || b.excerpt,
        images: b.seo?.ogImage || b.coverImage ? [{ url: b.seo?.ogImage || b.coverImage }] : [],
        type: "article",
      },
      ...(b.seo?.keywords && b.seo.keywords.length > 0 ? { keywords: b.seo.keywords } : {}),
      ...(b.seo?.canonicalUrl ? { alternates: { canonical: b.seo.canonicalUrl } } : {}),
    };
  } catch {
    return { title: "Blog | JOSPO Cooling Solutions" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, isPublished: true }).lean();
    if (!blog) notFound();

    // Serialize for client
    const serialized = JSON.parse(JSON.stringify(blog));
    return <BlogPostClient blog={serialized} />;
  } catch {
    notFound();
  }
}
