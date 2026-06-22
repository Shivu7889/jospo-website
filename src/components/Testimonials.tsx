"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % testimonials.length), []);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => { const id = setInterval(next, 5000); return () => clearInterval(id); }, [next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }} ref={ref}>
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="section-label">What People Say</span>
          <h2 className="section-title mt-3">Customer <span className="gradient-text">Testimonials</span></h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="premium-card rounded-3xl p-8 sm:p-10 text-center min-h-[260px] flex flex-col items-center justify-center relative">
            {/* Quote icon */}
            <div className="text-4xl opacity-20 mb-4 gradient-text">&ldquo;</div>

            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                </div>
                <p className="text-base sm:text-lg leading-relaxed mb-6 italic" style={{ color: 'var(--text-secondary)' }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">{t.name.charAt(0)}</div>
                  <div className="text-left">
                    <div className="font-semibold text-sm font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}, {t.location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-gradient-to-r from-primary to-secondary" : ""}`} style={i !== current ? { background: 'var(--border-color)' } : {}} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
