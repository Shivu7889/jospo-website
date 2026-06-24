import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jospocooler.com";

  const staticPages = [
    "",
    "/about",
    "/why-choose",
    "/manufacturing",
    "/cooling-finder",
    "/faq",
    "/blog",
  ];

  const staticUrls = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic fetching of blog posts
  let blogUrls: any[] = [];
  try {
    const res = await fetch(`${baseUrl}/api/blogs`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const result = await res.json();
      const blogs = Array.isArray(result) ? result : (result?.data || []);
      if (Array.isArray(blogs)) {
        blogUrls = blogs.map((blog: any) => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: new Date(blog.updatedAt || blog.createdAt || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error("Sitemap dynamic blogs fetch failed, using fallback static urls only.", error);
  }

  return [...staticUrls, ...blogUrls];
}
