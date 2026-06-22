"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const stages = [
  {
    title: "Research & Development",
    desc: "Market analysis and engineering design for optimal cooling performance",
    details: "Our R&D team studies market trends, customer needs, and emerging cooling technologies. Every product begins with extensive research into airflow dynamics, motor efficiency, and material durability to ensure JOSPO coolers lead the market.",
    icon: "🔬",
    image: "/images/manufacturing/facility.png",
  },
  {
    title: "Precision Design",
    desc: "CAD modeling and prototype development with aerodynamic optimization",
    details: "Using advanced CAD software, our engineers create detailed 3D models optimized for maximum airflow and minimum noise. Multiple prototypes are built and tested before any design moves to production.",
    icon: "📐",
    image: null,
  },
  {
    title: "Manufacturing",
    desc: "State-of-the-art production lines with automated quality at every step",
    details: "Our modern production facility in Bhiwadi, Rajasthan features automated assembly lines, precision cutting machines, and experienced technicians who ensure every component meets JOSPO's exacting standards.",
    icon: "🏭",
    image: "/images/manufacturing/facility.png",
  },
  {
    title: "Quality Testing",
    desc: "Multi-point inspection including airflow, motor performance, and durability tests",
    details: "Each cooler undergoes rigorous testing: airflow measurement, motor endurance runs, water tank leak checks, electrical safety verification, and noise level assessment. Only units that pass all checkpoints are approved.",
    icon: "✅",
    image: "/images/manufacturing/quality-control.png",
  },
  {
    title: "Packaging",
    desc: "Secure protective packaging designed for damage-free transit",
    details: "Custom-designed packaging with multi-layer protection ensures every cooler arrives in perfect condition. Thermocol inserts, corrugated board, and stretch wrapping guard against transit damage.",
    icon: "📦",
    image: "/images/manufacturing/packaging.png",
  },
  {
    title: "Dispatch",
    desc: "Pan-India delivery network ensuring timely delivery to dealers and customers",
    details: "Our logistics network covers all Indian states with trusted transport partners. Real-time tracking and dedicated dispatch coordination ensure on-time delivery to dealers, distributors, and end customers.",
    icon: "🚛",
    image: null,
  },
];

export default function Manufacturing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="manufacturing" className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-primary)' }} ref={ref}>
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label">Our Process</span>
          <h2 className="section-title mt-3">Manufacturing <span className="gradient-text">Excellence</span></h2>
          <p className="section-subtitle mt-5">From concept to delivery — a meticulous 6-stage process ensuring every <span className="gradient-text font-semibold">JOSPO</span> cooler exceeds expectations.</p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px" style={{ background: 'var(--border-color)' }}>
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          {stages.map((stage, i) => {
            const isLeft = i % 2 === 0;
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 pl-16 sm:pl-0 ${isLeft ? "sm:flex-row sm:text-right" : "sm:flex-row-reverse sm:text-left"}`}
              >
                {/* Connector dot */}
                <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 z-10 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 shadow-lg animate-glow" style={{ borderColor: 'var(--bg-primary)' }} />

                {/* Content */}
                <div className={`flex-1 ${isLeft ? "sm:pr-12" : "sm:pl-12"}`}>
                  <div
                    className={`premium-card p-5 sm:p-6 cursor-pointer transition-all duration-300 ${isExpanded ? "ring-2 ring-secondary/50 shadow-xl" : "hover:shadow-lg"}`}
                    onClick={() => toggleExpand(i)}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? "sm:justify-end" : ""}`}>
                      <span className="text-2xl">{stage.icon}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10" style={{ color: 'var(--color-secondary)' }}>Step {i + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2" style={{ color: 'var(--text-primary)' }}>{stage.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{stage.desc}</p>

                    {/* Expand hint */}
                    <div className={`flex items-center gap-1 mt-3 text-xs font-medium transition-colors ${isLeft ? "sm:justify-end" : ""}`} style={{ color: 'var(--color-secondary)' }}>
                      <span>{isExpanded ? "Click to collapse" : "Click to learn more"}</span>
                      <svg className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{stage.details}</p>
                            {stage.image && (
                              <div className="relative h-40 rounded-xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                                <Image src={stage.image} alt={stage.title} fill className="object-cover" sizes="400px" />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden sm:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
