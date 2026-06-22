"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ImageUploader from "@/components/admin/ImageUploader";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), { ssr: false });

export default function NewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", coverImage: "",
    author: "JOSPO Team", category: "", tags: "",
    isPublished: false,
    seo: { metaTitle: "", metaDescription: "", ogImage: "", canonicalUrl: "", keywords: "" },
  });

  const updateField = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));
  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = {
        ...form,
        slug: form.slug || autoSlug(form.title),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        seo: {
          ...form.seo,
          keywords: form.seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
        },
        isPublished: publish,
        ...(publish ? { publishedAt: new Date() } : {}),
      };
      const res = await fetch("/api/admin/blogs", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Failed"); }
      router.push("/admin/blogs");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally { setSaving(false); }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">Write New Blog Post</h1>
      </div>
      {error && <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Title *</label>
            <input type="text" required value={form.title}
              onChange={(e) => { updateField("title", e.target.value); if (!form.slug) updateField("slug", autoSlug(e.target.value)); }}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              placeholder="Blog post title..." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => updateField("slug", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="auto-generated" /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Author</label>
              <input type="text" value={form.author} onChange={(e) => updateField("author", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
              <input type="text" value={form.category} onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="e.g. Cooling Tips" /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Tags (comma separated)</label>
              <input type="text" value={form.tags} onChange={(e) => updateField("tags", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="air cooler, summer, tips" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt *</label>
            <textarea rows={2} required value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none"
              placeholder="Short summary of the blog post..." /></div>
          <ImageUploader currentImage={form.coverImage} onImageUploaded={(url) => updateField("coverImage", url)} folder="blog" label="Cover Image *" />
        </div>

        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Content *</label>
          <RichTextEditor content={form.content} onChange={(html) => updateField("content", html)} placeholder="Write your blog post content here..." />
        </div>

        {/* SEO */}
        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">SEO (Optional)</h2>
          <input type="text" value={form.seo.metaTitle}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, metaTitle: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            placeholder="Meta Title (defaults to blog title)" />
          <textarea rows={2} value={form.seo.metaDescription}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, metaDescription: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none"
            placeholder="Meta Description (defaults to excerpt)" />
          <input type="text" value={form.seo.keywords}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, keywords: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            placeholder="Meta Keywords (comma separated)" />
          <input type="text" value={form.seo.canonicalUrl}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, canonicalUrl: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            placeholder="Canonical URL" />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="px-6 py-3 rounded-xl bg-gray-700 text-white text-sm font-semibold hover:bg-gray-600 disabled:opacity-50 flex items-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "💾"} Save Draft</button>
          <button type="button" disabled={saving} onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
            🚀 Publish</button>
          <button type="button" onClick={() => router.push("/admin/blogs")}
            className="px-6 py-3 rounded-xl bg-gray-800 text-gray-300 text-sm hover:bg-gray-700">Cancel</button>
        </div>
      </form>
    </div>
  );
}
