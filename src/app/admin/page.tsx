"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  products: { total: number; active: number; inactive: number };
  blogs: { total: number; published: number; drafts: number };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        { label: "Active Products", value: stats.products.active, icon: "📦", color: "from-blue-500 to-cyan-500", href: "/admin/products" },
        { label: "Published Blogs", value: stats.blogs.published, icon: "📝", color: "from-emerald-500 to-teal-500", href: "/admin/blogs" },
        { label: "Draft Blogs", value: stats.blogs.drafts, icon: "📄", color: "from-amber-500 to-orange-500", href: "/admin/blogs" },
        { label: "Total Products", value: stats.products.total, icon: "📊", color: "from-purple-500 to-pink-500", href: "/admin/products" },
      ]
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome to JOSPO Admin Panel
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-gray-800/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="bg-[#1A2332] border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{card.icon}</span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity`}>
                    <span className="text-white text-lg font-bold">{card.value}</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
                  {card.value}
                </p>
                <p className="text-sm text-gray-400 mt-1">{card.label}</p>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link
                href="/admin/products/new"
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-cyan-500/30 transition-all text-sm text-gray-300 hover:text-white"
              >
                <span className="text-xl">➕</span> Add New Product
              </Link>
              <Link
                href="/admin/blogs/new"
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-cyan-500/30 transition-all text-sm text-gray-300 hover:text-white"
              >
                <span className="text-xl">✏️</span> Write Blog Post
              </Link>
              <Link
                href="/admin/seo"
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-cyan-500/30 transition-all text-sm text-gray-300 hover:text-white"
              >
                <span className="text-xl">🔍</span> Manage SEO
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-cyan-500/30 transition-all text-sm text-gray-300 hover:text-white"
              >
                <span className="text-xl">🌐</span> View Website
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
