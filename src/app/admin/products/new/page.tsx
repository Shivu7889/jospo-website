"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";

const categories = [
  { value: "personal", label: "Personal" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "industrial", label: "Industrial" },
];

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", slug: "", category: "personal", image: "",
    fanSize: "", airFlow: "", tankCapacity: "", powerConsumption: "",
    coolingArea: "", coolingAreaSqM: 0, dimensions: "", badge: "",
    description: "", features: [""], isActive: true, sortOrder: 0,
    seo: { metaTitle: "", metaDescription: "" },
  });

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const autoSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const addFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const updateFeature = (index: number, value: string) => {
    setForm((prev) => {
      const features = [...prev.features];
      features[index] = value;
      return { ...prev, features };
    });
  };

  const removeFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const body = {
        ...form,
        features: form.features.filter((f) => f.trim()),
        slug: form.slug || autoSlug(form.name),
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create product");
      }

      router.push("/admin/products");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
          Add New Product
        </h1>
        <p className="text-sm text-gray-400 mt-1">Fill in the product details below</p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Basic Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Product Name *</label>
              <input type="text" required value={form.name}
                onChange={(e) => { updateField("name", e.target.value); if (!form.slug) updateField("slug", autoSlug(e.target.value)); }}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="e.g. JOSPO Rolex 35L" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
              <input type="text" value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="auto-generated" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Category *</label>
              <select value={form.category} onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30">
                {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Badge</label>
              <input type="text" value={form.badge} onChange={(e) => updateField("badge", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="e.g. Best Seller" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => updateField("sortOrder", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" />
            </div>
          </div>

          <ImageUploader currentImage={form.image} onImageUploaded={(url) => updateField("image", url)} folder="products" label="Product Image *" />
        </div>

        {/* Specifications */}
        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "fanSize", label: "Fan Size *", placeholder: "e.g. 12 Inch" },
              { key: "airFlow", label: "Air Flow *", placeholder: "e.g. 2,400 m³/h" },
              { key: "tankCapacity", label: "Tank Capacity *", placeholder: "e.g. 35 Litres" },
              { key: "powerConsumption", label: "Power Consumption *", placeholder: "e.g. 114 Watts" },
              { key: "coolingArea", label: "Cooling Area *", placeholder: "e.g. 40 sq. m" },
              { key: "dimensions", label: "Dimensions *", placeholder: "e.g. 460 × 435 × 860 mm" },
            ].map((spec) => (
              <div key={spec.key}>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">{spec.label}</label>
                <input type="text" required value={(form as Record<string, unknown>)[spec.key] as string}
                  onChange={(e) => updateField(spec.key, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  placeholder={spec.placeholder} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Cooling Area (sq.m number) *</label>
              <input type="number" required value={form.coolingAreaSqM}
                onChange={(e) => updateField("coolingAreaSqM", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="e.g. 40" />
            </div>
          </div>
        </div>

        {/* Description & Features */}
        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Description & Features</h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none"
              placeholder="Product description..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Features</label>
            {form.features.map((feature, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input type="text" value={feature} onChange={(e) => updateFeature(i, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  placeholder={`Feature ${i + 1}`} />
                <button type="button" onClick={() => removeFeature(i)}
                  className="px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm">✕</button>
              </div>
            ))}
            <button type="button" onClick={addFeature}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">+ Add Feature</button>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-[#1A2332] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">SEO (Optional)</h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Meta Title</label>
            <input type="text" value={form.seo.metaTitle}
              onChange={(e) => setForm((prev) => ({ ...prev, seo: { ...prev.seo, metaTitle: e.target.value } }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              placeholder="Custom SEO title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Meta Description</label>
            <textarea rows={2} value={form.seo.metaDescription}
              onChange={(e) => setForm((prev) => ({ ...prev, seo: { ...prev.seo, metaDescription: e.target.value } }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none"
              placeholder="Custom SEO description" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#0A4DA2] to-[#00B4D8] text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2">
            {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : "Save Product"}
          </button>
          <button type="button" onClick={() => router.push("/admin/products")}
            className="px-6 py-3 rounded-xl bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-all">Cancel</button>
        </div>
      </form>
    </div>
  );
}
