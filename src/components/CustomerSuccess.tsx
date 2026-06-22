"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "25+", label: "States Served", icon: "🗺️" },
  { value: "50+", label: "Active Dealers", icon: "🤝" },
  { value: "6+", label: "Industries Served", icon: "🏭" },
  { value: "10K+", label: "Units Delivered", icon: "📦" },
];

const industries = [
  { icon: "🏢", title: "Warehouses", desc: "Large-scale cooling for storage facilities and distribution centers" },
  { icon: "🏭", title: "Factories", desc: "Industrial-grade cooling for manufacturing floors and workshops" },
  { icon: "🏪", title: "Shops & Showrooms", desc: "Comfortable shopping environments with efficient cooling" },
  { icon: "🍽️", title: "Restaurants & Hotels", desc: "Indoor and outdoor dining comfort for guests" },
  { icon: "🎪", title: "Outdoor Events", desc: "Powerful portable cooling for weddings, exhibitions, and gatherings" },
  { icon: "🔧", title: "Workshops & Garages", desc: "Reliable cooling for automotive and repair workshops" },
];

export default function CustomerSuccess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px]" style={{ background: 'rgba(0, 180, 216, 0.05)' }} />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label">Our Reach</span>
          <h2 className="section-title mt-3">Customer <span className="gradient-text">Success</span></h2>
          <p className="section-subtitle mt-5">Trusted by businesses across India in diverse industries.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="premium-card p-6 text-center group"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-1">{stat.value}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Industries */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="text-center mb-10">
          <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>Industries We Serve</h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
              className="premium-card p-6 flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform" style={{ background: 'var(--bg-secondary)' }}>
                {ind.icon}
              </div>
              <div>
                <h4 className="text-base font-bold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>{ind.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
