"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";

const categories = [
  { value: "personal", label: "Personal" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "industrial", label: "Industrial" },
];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", slug: "", category: "personal", image: "",
    fanSize: "", airFlow: "", tankCapacity: "", powerConsumption: "",
    coolingArea: "", coolingAreaSqM: 0, dimensions: "", badge: "",
    description: "", features: [""], isActive: true, sortOrder: 0,
    seo: { metaTitle: "", metaDescription: "" },
  });

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name || "", slug: data.slug || "", category: data.category || "personal",
          image: data.image || "", fanSize: data.fanSize || "", airFlow: data.airFlow || "",
          tankCapacity: data.tankCapacity || "", powerConsumption: data.powerConsumption || "",
          coolingArea: data.coolingArea || "", coolingAreaSqM: data.coolingAreaSqM || 0,
          dimensions: data.dimensions || "", badge: data.badge || "",
          description: data.description || "", features: data.features?.length ? data.features : [""],
          isActive: data.isActive ?? true, sortOrder: data.sortOrder || 0,
          seo: { metaTitle: data.seo?.metaTitle || "", metaDescription: data.seo?.metaDescription || "" },
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addFeature = () => setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  const updateFeature = (index: number, value: string) => {
    setForm((prev) => { const f = [...prev.features]; f[index] = value; return { ...prev, features: f }; });
  };
  const removeFeature = (index: number) => {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = { ...form, features: form.features.filter((f) => f.trim()) };
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Failed"); }
      router.push("/admin/products");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update product");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">Edit Product</h1>
        <p className="text-sm text-gray-400 mt-1">{form.name}</p>
      </div>
      {error && <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Product Name *</label>
              <input type="text" required value={form.name} onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => updateField("slug", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Category *</label>
              <select value={form.category} onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30">
                {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Badge</label>
              <input type="text" value={form.badge} onChange={(e) => updateField("badge", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => updateField("sortOrder", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
          </div>
          <ImageUploader currentImage={form.image} onImageUploaded={(url) => updateField("image", url)} folder="products" label="Product Image *" />
        </div>

        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{ key: "fanSize", label: "Fan Size *" }, { key: "airFlow", label: "Air Flow *" },
              { key: "tankCapacity", label: "Tank Capacity *" }, { key: "powerConsumption", label: "Power *" },
              { key: "coolingArea", label: "Cooling Area *" }, { key: "dimensions", label: "Dimensions *" }].map((s) => (
              <div key={s.key}><label className="block text-sm font-medium text-gray-300 mb-1.5">{s.label}</label>
                <input type="text" required value={(form as Record<string, unknown>)[s.key] as string}
                  onChange={(e) => updateField(s.key, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>))}
            <div><label className="block text-sm font-medium text-gray-300 mb-1.5">Cooling Area (sq.m) *</label>
              <input type="number" required value={form.coolingAreaSqM} onChange={(e) => updateField("coolingAreaSqM", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" /></div>
          </div>
        </div>

        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Features</h2>
          {form.features.map((feature, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={feature} onChange={(e) => updateFeature(i, e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" />
              <button type="button" onClick={() => removeFeature(i)} className="px-3 text-red-400 hover:bg-red-500/10 rounded-xl">✕</button>
            </div>))}
          <button type="button" onClick={addFeature} className="text-sm text-cyan-400 hover:text-cyan-300">+ Add Feature</button>
        </div>

        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">SEO</h2>
          <input type="text" value={form.seo.metaTitle}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, metaTitle: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            placeholder="Meta Title" />
          <textarea rows={2} value={form.seo.metaDescription}
            onChange={(e) => setForm((p) => ({ ...p, seo: { ...p.seo, metaDescription: e.target.value } }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none"
            placeholder="Meta Description" />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#0A4DA2] to-[#00B4D8] text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
            {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Updating...</> : "Update Product"}</button>
          <button type="button" onClick={() => router.push("/admin/products")}
            className="px-6 py-3 rounded-xl bg-gray-800 text-gray-300 text-sm hover:bg-gray-700">Cancel</button>
        </div>
      </form>
    </div>
  );
}
