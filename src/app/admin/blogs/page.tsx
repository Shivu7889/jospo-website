"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((r) => r.json())
      .then(setBlogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (res.ok) setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) { console.error(err); }
  };

  const filtered = blogs.filter((b) => {
    if (filter === "published") return b.isPublished;
    if (filter === "draft") return !b.isPublished;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">Blog Posts</h1>
          <p className="text-sm text-gray-400 mt-1">{blogs.length} total posts</p>
        </div>
        <Link href="/admin/blogs/new"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0A4DA2] to-[#00B4D8] text-white text-sm font-semibold hover:opacity-90 transition-all">
          + Write Post
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "published", "draft"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              filter === f ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20" : "text-gray-400 hover:text-white bg-gray-800/50 border border-gray-800"
            }`}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-gray-800/50 animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-2">📝</p>
          <p>No blog posts yet. Write your first post!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((blog) => (
            <div key={blog._id} className="bg-[#1A2332] border border-gray-800 rounded-2xl p-5 flex items-center gap-4 hover:border-gray-700 transition-all">
              <div className="w-20 h-16 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
                {blog.coverImage && <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{blog.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    blog.isPublished ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  }`}>{blog.isPublished ? "Published" : "Draft"}</span>
                  {blog.category && <span className="text-xs text-gray-500">{blog.category}</span>}
                  <span className="text-xs text-gray-600">
                    {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/admin/blogs/${blog._id}/edit`}
                  className="p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-gray-800 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                <button onClick={() => deleteBlog(blog._id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
