"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  createdAt: string;
}

export default function BlogPostClient({ blog }: { blog: BlogPost }) {
  const publishedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });

  const shareOnWhatsApp = () => {
    const url = `${window.location.origin}/blog/${blog.slug}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(`${blog.title}\n\n${url}`)}`, "_blank");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/blog/${blog.slug}`);
    alert("Link copied!");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1B2A] to-[#023E8A]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="relative z-10 section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              {blog.category && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/10">
                  {blog.category}
                </span>
              )}
              <span className="text-sm text-white/50">{publishedDate}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 font-[family-name:var(--font-heading)] tracking-tight max-w-4xl">
              {blog.title}
            </h1>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {blog.author.charAt(0)}
              </div>
              <span className="text-sm text-white/70">{blog.author}</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L48 73.3C96 66.7 192 53.3 288 46.7C384 40 480 40 576 43.3C672 46.7 768 53.3 864 56.7C960 60 1056 60 1152 56.7C1248 53.3 1344 46.7 1392 43.3L1440 40V80H0Z" style={{ fill: 'var(--bg-primary)' }} />
          </svg>
        </div>
      </section>

      {/* Content */}
      <article className="section-container pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Cover Image */}
          {blog.coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 border"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}

          {/* Blog content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="prose prose-lg max-w-none
              prose-headings:font-[family-name:var(--font-heading)] prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:mb-5
              prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
              prose-strong:font-semibold
              prose-img:rounded-xl prose-img:border prose-img:mx-auto
              prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:pl-5 prose-blockquote:italic
              prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
              prose-li:mb-1"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-10 pt-6 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--border-color)' }}>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Share:</span>
            <button
              onClick={shareOnWhatsApp}
              className="p-2.5 rounded-xl transition-all duration-300 hover:bg-[#25D366] hover:text-white"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </button>
            <button
              onClick={copyLink}
              className="p-2.5 rounded-xl transition-all duration-300 hover:bg-primary hover:text-white"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            </button>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#0A4DA2]/10 to-[#00B4D8]/10 border text-center" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>
              Looking for the perfect air cooler?
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Get in touch with us for expert recommendations and the best deals.
            </p>
            <a
              href={company.whatsapp.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !rounded-xl !py-3 !px-6"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Get Quote on WhatsApp
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
