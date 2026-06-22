"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/data/products";
import { company } from "@/data/company";

interface ProductCompareProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function ProductCompare({ products, onRemove, onClear }: ProductCompareProps) {
  if (products.length < 2) return null;

  const specs = [
    { label: "Fan Size", key: "fanSize" as const },
    { label: "Air Flow", key: "airFlow" as const, bar: true, max: 16000 },
    { label: "Tank Capacity", key: "tankCapacity" as const, bar: true, max: 200 },
    { label: "Power", key: "powerConsumption" as const, bar: true, max: 450 },
    { label: "Cooling Area", key: "coolingArea" as const, bar: true, max: 266 },
    { label: "Dimensions", key: "dimensions" as const },
  ];

  const extractNumber = (val: string) => parseInt(val.replace(/[^0-9]/g, "")) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="section-container py-12"
    >
      <div className="rounded-3xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>
            Compare Products ({products.length})
          </h3>
          <button onClick={onClear} className="text-sm font-medium hover:text-secondary transition-colors" style={{ color: 'var(--text-muted)' }}>
            Clear All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            {/* Product Images & Names */}
            <thead>
              <tr>
                <th className="p-4 text-left w-36" />
                {products.map((p) => (
                  <th key={p.id} className="p-4 text-center">
                    <div className="relative">
                      <button onClick={() => onRemove(p.id)} className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition-colors">×</button>
                      <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden mb-3 relative" style={{ background: 'var(--bg-secondary)' }}>
                        <Image src={p.image} alt={p.name} fill className="object-contain p-2" sizes="100px" />
                      </div>
                      <div className="text-sm font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>{p.name}</div>
                      {p.badge && <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold">{p.badge}</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.label} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <td className="p-4 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{spec.label}</td>
                  {products.map((p) => {
                    const val = p[spec.key];
                    const numVal = extractNumber(val);
                    const maxVal = spec.max || 1;
                    const pct = spec.bar ? Math.min((numVal / maxVal) * 100, 100) : 0;
                    const isBest = spec.bar && numVal === Math.max(...products.map((pp) => extractNumber(pp[spec.key])));

                    return (
                      <td key={p.id} className="p-4 text-center">
                        <div className={`text-sm font-semibold ${isBest ? "text-secondary" : ""}`} style={!isBest ? { color: 'var(--text-primary)' } : {}}>
                          {val} {isBest && spec.bar && <span className="text-[10px]">⭐</span>}
                        </div>
                        {spec.bar && (
                          <div className="mt-2 w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                            <motion.div
                              className={`h-full rounded-full ${isBest ? "bg-gradient-to-r from-secondary to-accent" : "bg-gradient-to-r from-primary to-secondary opacity-60"}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* WhatsApp Row */}
              <tr style={{ borderTop: '1px solid var(--border-color)' }}>
                <td className="p-4" />
                {products.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <a href={company.whatsapp.getLink(`Hi, I'd like to know more about the ${p.name}`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !text-xs !px-4 !py-2 !rounded-lg">
                      Inquire
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
