"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const badges = [
  { icon: "🇮🇳", title: "Made in India", desc: "Proudly manufactured in Rajasthan" },
  { icon: "✅", title: "Quality Tested", desc: "Multi-point inspection on every unit" },
  { icon: "🏭", title: "Manufacturer Direct", desc: "Factory-to-dealer pricing" },
  { icon: "📦", title: "Bulk Orders", desc: "Special pricing for bulk requirements" },
  { icon: "🤝", title: "Dealer Opportunities", desc: "Attractive margins & support" },
  { icon: "⚡", title: "Fast Support", desc: "Responsive after-sales service" },
];

export default function TrustBadges() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-14 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="premium-card p-4 text-center group cursor-default"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{badge.icon}</div>
              <h4 className="text-xs font-bold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>{badge.title}</h4>
              <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
