"use client";

import { useEffect, useState } from "react";

interface Testimonial { _id: string; name: string; location: string; role: string; rating: number; text: string; product: string; isActive: boolean; sortOrder: number; }

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", role: "", rating: 5, text: "", product: "", sortOrder: 0 });

  useEffect(() => { fetch("/api/admin/testimonials").then((r) => r.json()).then(setItems).catch(console.error).finally(() => setLoading(false)); }, []);

  const save = async () => {
    setSaving(true);
    try {
      const url = editing === "new" ? "/api/admin/testimonials" : `/api/admin/testimonials/${editing}`;
      const method = editing === "new" ? "POST" : "PUT";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) {
        const data = await res.json();
        if (editing === "new") setItems((p) => [...p, data]);
        else setItems((p) => p.map((i) => i._id === editing ? { ...i, ...data } : i));
        setEditing(null);
      }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) setItems((p) => p.filter((i) => i._id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">Testimonials</h1>
        <button onClick={() => { setEditing("new"); setForm({ name: "", location: "", role: "", rating: 5, text: "", product: "", sortOrder: items.length }); }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0A4DA2] to-[#00B4D8] text-white text-sm font-semibold">+ Add</button>
      </div>

      {editing && (
        <div className="bg-[#1A2332] border border-cyan-500/20 rounded-2xl p-6 mb-6 space-y-3">
          <h2 className="text-lg font-semibold text-white">{editing === "new" ? "Add Testimonial" : "Edit Testimonial"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input placeholder="Name *" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" />
            <input placeholder="Location *" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
              className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" />
            <input placeholder="Role *" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input placeholder="Product" value={form.product} onChange={(e) => setForm((p) => ({ ...p, product: e.target.value }))}
              className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" />
            <select value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: parseInt(e.target.value) }))}
              className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30">
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} ⭐</option>)}</select>
            <input type="number" placeholder="Sort Order" value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))}
              className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" />
          </div>
          <textarea rows={3} placeholder="Testimonial text *" value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
            className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none" />
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="px-5 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 text-sm font-semibold disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
            <button onClick={() => setEditing(null)} className="px-5 py-2 rounded-xl bg-gray-800 text-gray-400 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-gray-800/50 animate-pulse" />)}</div> : (
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t._id} className="bg-[#1A2332] border border-gray-800 rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{t.name}</span>
                    <span className="text-xs text-gray-500">{t.location}</span>
                    <span className="text-xs text-yellow-400">{"⭐".repeat(t.rating)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{t.role} {t.product && `• ${t.product}`}</p>
                  <p className="text-sm text-gray-400 line-clamp-2">{t.text}</p>
                </div>
                <div className="flex gap-1 ml-3">
                  <button onClick={() => { setEditing(t._id); setForm({ name: t.name, location: t.location, role: t.role, rating: t.rating, text: t.text, product: t.product || "", sortOrder: t.sortOrder }); }}
                    className="p-2 text-gray-400 hover:text-cyan-400 rounded-lg hover:bg-gray-800">✏️</button>
                  <button onClick={() => remove(t._id)} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-800">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
