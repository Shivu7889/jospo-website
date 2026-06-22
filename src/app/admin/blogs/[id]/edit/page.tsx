"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ImageUploader from "@/components/admin/ImageUploader";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), { ssr: false });

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", coverImage: "",
    author: "", category: "", tags: "", isPublished: false,
    seo: { metaTitle: "", metaDescription: "", ogImage: "", canonicalUrl: "", keywords: "" },
  });

  useEffect(() => {
    fetch(`/api/admin/blogs/${id}`)
      .then((r) => r.json())
      .then((blog) => {
        if (blog && !blog.error) {
          setForm({
            title: blog.title || "", slug: blog.slug || "", excerpt: blog.excerpt || "",
            content: blog.content || "", coverImage: blog.coverImage || "", author: blog.author || "",
            category: blog.category || "", tags: (blog.tags || []).join(", "),
            isPublished: blog.isPublished || false,
            seo: {
              metaTitle: blog.seo?.metaTitle || "", metaDescription: blog.seo?.metaDescription || "",
              ogImage: blog.seo?.ogImage || "", canonicalUrl: blog.seo?.canonicalUrl || "",
              keywords: (blog.seo?.keywords || []).join(", "),
            },
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const updateField = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent, publish?: boolean) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        seo: {
          ...form.seo,
          keywords: form.seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
        },
        isPublished: publish !== undefined ? publish : form.isPublished,
      };
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Failed"); }
      router.push("/admin/blogs");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">Edit Blog Post</h1>
        <p className="text-sm text-gray-400 mt-1">{form.title}</p>
      </div>
      {error && <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => updateField("title", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => updateField("slug", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Author</label>
              <input type="text" value={form.author} onChange={(e) => updateField("author", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
              <input type="text" value={form.category} onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Tags</label>
              <input type="text" value={form.tags} onChange={(e) => updateField("tags", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt *</label>
            <textarea rows={2} required value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none" /></div>
          <ImageUploader currentImage={form.coverImage} onImageUploaded={(url) => updateField("coverImage", url)} folder="blog" label="Cover Image" />
        </div>

        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Content *</label>
          <RichTextEditor content={form.content} onChange={(html) => updateField("content", html)} />
        </div>

        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">SEO</h2>
          <input type="text" value={form.seo.metaTitle}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, metaTitle: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" placeholder="Meta Title" />
          <textarea rows={2} value={form.seo.metaDescription}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, metaDescription: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none" placeholder="Meta Description" />
          <input type="text" value={form.seo.keywords}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, keywords: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" placeholder="Meta Keywords (comma separated)" />
          <input type="text" value={form.seo.canonicalUrl}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, canonicalUrl: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" placeholder="Canonical URL" />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0A4DA2] to-[#00B4D8] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50">
            {saving ? "Saving..." : "Update"}</button>
          {!form.isPublished && (
            <button type="button" disabled={saving} onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50">
              🚀 Publish</button>
          )}
          {form.isPublished && (
            <button type="button" disabled={saving} onClick={(e) => handleSubmit(e as unknown as React.FormEvent, false)}
              className="px-6 py-3 rounded-xl bg-amber-500/20 text-amber-400 text-sm font-semibold hover:bg-amber-500/30 disabled:opacity-50">
              Unpublish</button>
          )}
          <button type="button" onClick={() => router.push("/admin/blogs")}
            className="px-6 py-3 rounded-xl bg-gray-800 text-gray-300 text-sm hover:bg-gray-700">Cancel</button>
        </div>
      </form>
    </div>
  );
}
