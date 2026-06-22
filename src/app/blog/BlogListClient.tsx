"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  publishedAt: string;
  createdAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function BlogListClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blogs?page=${page}&limit=9`)
      .then((r) => r.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setPagination(data.pagination || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <PageHero
        label="📝 Our Blog"
        title="Insights &"
        titleHighlight="Cooling Tips"
        subtitle="Stay informed with the latest articles about air cooling, product guides, and industry insights from the JOSPO team."
      />

      <section className="section-container py-14 sm:py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: 'var(--bg-card)' }}>
                <div className="h-48 bg-gray-700/30" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-700/30 rounded w-3/4" />
                  <div className="h-3 bg-gray-700/30 rounded w-full" />
                  <div className="h-3 bg-gray-700/30 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📝</p>
            <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>
              No Blog Posts Yet
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              We&apos;re working on some great content. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, i) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                  >
                    {/* Cover Image */}
                    <div className="relative h-48 overflow-hidden">
                      {blog.coverImage ? (
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0A4DA2] to-[#00B4D8] flex items-center justify-center">
                          <span className="text-4xl">📝</span>
                        </div>
                      )}
                      {blog.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-gray-800 backdrop-blur-sm">
                          {blog.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {blog.author}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>•</span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold mb-2 line-clamp-2 font-[family-name:var(--font-heading)] group-hover:text-secondary transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {blog.title}
                      </h3>

                      <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {blog.excerpt}
                      </p>

                      <div className="mt-4 flex items-center gap-1 text-secondary text-sm font-semibold">
                        Read More
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)', borderWidth: '1px' }}
                >
                  ← Previous
                </button>
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                      page === i + 1
                        ? "bg-gradient-to-r from-[#0A4DA2] to-[#00B4D8] text-white"
                        : ""
                    }`}
                    style={page !== i + 1 ? { background: 'var(--bg-card)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)', borderWidth: '1px' } : {}}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)', borderWidth: '1px' }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
