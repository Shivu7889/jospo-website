"use client";

import { useEffect, useState } from "react";

interface FAQ { _id: string; question: string; answer: string; isActive: boolean; sortOrder: number; }

export default function AdminFaqsPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "", sortOrder: 0 });

  useEffect(() => { fetch("/api/admin/faqs").then((r) => r.json()).then(setItems).catch(console.error).finally(() => setLoading(false)); }, []);

  const save = async () => {
    setSaving(true);
    try {
      const url = editing === "new" ? "/api/admin/faqs" : `/api/admin/faqs/${editing}`;
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
    if (!confirm("Delete this FAQ?")) return;
    const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    if (res.ok) setItems((p) => p.filter((i) => i._id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">FAQs</h1>
        <button onClick={() => { setEditing("new"); setForm({ question: "", answer: "", sortOrder: items.length }); }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0A4DA2] to-[#00B4D8] text-white text-sm font-semibold">+ Add FAQ</button>
      </div>

      {editing && (
        <div className="bg-[#1A2332] border border-cyan-500/20 rounded-2xl p-6 mb-6 space-y-3">
          <h2 className="text-lg font-semibold text-white">{editing === "new" ? "Add FAQ" : "Edit FAQ"}</h2>
          <input placeholder="Question *" value={form.question} onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" />
          <textarea rows={4} placeholder="Answer *" value={form.answer} onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none" />
          <input type="number" placeholder="Sort Order" value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))}
            className="w-40 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30" />
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="px-5 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 text-sm font-semibold disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
            <button onClick={() => setEditing(null)} className="px-5 py-2 rounded-xl bg-gray-800 text-gray-400 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-gray-800/50 animate-pulse" />)}</div> : (
        <div className="space-y-3">
          {items.map((faq) => (
            <div key={faq._id} className="bg-[#1A2332] border border-gray-800 rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white mb-1">{faq.question}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{faq.answer}</p>
                </div>
                <div className="flex gap-1 ml-3">
                  <button onClick={() => { setEditing(faq._id); setForm({ question: faq.question, answer: faq.answer, sortOrder: faq.sortOrder }); }}
                    className="p-2 text-gray-400 hover:text-cyan-400 rounded-lg hover:bg-gray-800">✏️</button>
                  <button onClick={() => remove(faq._id)} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-800">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
