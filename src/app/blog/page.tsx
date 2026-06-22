import { Metadata } from "next";
import { getPageSeo } from "@/lib/seo";
import BlogListClient from "./BlogListClient";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo("blog");
}

export default function BlogPage() {
  return <BlogListClient />;
}
