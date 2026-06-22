"use client";

import { useEffect, useState } from "react";

interface PageSeo {
  _id: string;
  pageSlug: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  canonicalUrl?: string;
}

const pageNames: Record<string, string> = {
  home: "🏠 Home Page",
  about: "ℹ️ About Us",
  faq: "❓ FAQ",
  "cooling-finder": "🔍 Cooling Finder",
  manufacturing: "🏭 Manufacturing",
  "why-choose": "⭐ Why Choose",
  blog: "📝 Blog Listing",
};

export default function AdminSeoPage() {
  const [entries, setEntries] = useState<PageSeo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    metaTitle: "",
    metaDescription: "",
    ogTitle: "",
    ogDescription: "",
    keywords: "",
    canonicalUrl: "",
  });

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((r) => r.json())
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (entry: PageSeo) => {
    setEditing(entry.pageSlug);
    setEditForm({
      metaTitle: entry.metaTitle || "",
      metaDescription: entry.metaDescription || "",
      ogTitle: entry.ogTitle || "",
      ogDescription: entry.ogDescription || "",
      keywords: (entry.keywords || []).join(", "),
      canonicalUrl: entry.canonicalUrl || "",
    });
  };

  const saveSeo = async (slug: string) => {
    setSaving(true);
    try {
      const body = {
        ...editForm,
        keywords: editForm.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      };
      const res = await fetch(`/api/admin/seo/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const updated = await res.json();
        setEntries((prev) =>
          prev.map((e) => (e.pageSlug === slug ? { ...e, ...updated } : e))
        );
        setEditing(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
          SEO Settings
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage SEO metadata and canonical URLs for all pages
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-800/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.pageSlug}
              className="bg-[#1A2332] border border-gray-800 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">
                  {pageNames[entry.pageSlug] || entry.pageSlug}
                </h3>
                {editing !== entry.pageSlug ? (
                  <button
                    onClick={() => startEdit(entry)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveSeo(entry.pageSlug)}
                      disabled={saving}
                      className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg hover:bg-cyan-500/30 disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {editing === entry.pageSlug ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Meta Title{" "}
                      <span className="text-gray-600">
                        ({editForm.metaTitle.length}/60)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={editForm.metaTitle}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, metaTitle: e.target.value }))
                      }
                      className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Meta Description{" "}
                      <span className="text-gray-600">
                        ({editForm.metaDescription.length}/160)
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      value={editForm.metaDescription}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, metaDescription: e.target.value }))
                      }
                      className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      value={editForm.canonicalUrl}
                      placeholder="https://jospo.in/..."
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, canonicalUrl: e.target.value }))
                      }
                      className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editForm.keywords}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, keywords: e.target.value }))
                      }
                      className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm text-gray-300 font-medium truncate">
                    {entry.metaTitle}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {entry.metaDescription}
                  </p>
                  {entry.canonicalUrl && (
                    <p className="text-[10px] text-cyan-400/80 truncate">
                      🔗 <span className="underline">{entry.canonicalUrl}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
