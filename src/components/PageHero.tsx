"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  label: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
}

export default function PageHero({ label, title, titleHighlight, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1B2A] to-[#023E8A]" />
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${4 + (i % 4) * 5}px`,
              height: `${4 + (i % 4) * 5}px`,
              left: `${10 + i * 10}%`,
              top: `${20 + (i * 9) % 60}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${4 + (i % 3) * 2}s`,
              background: i % 2 === 0 ? 'rgba(0, 180, 216, 0.25)' : 'rgba(72, 202, 228, 0.15)',
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-dark text-white/90 text-sm mb-6 border border-white/10">
            {label}
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5 font-[family-name:var(--font-heading)] tracking-tight"
        >
          {title} <span className="gradient-text-light">{titleHighlight}</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L48 73.3C96 66.7 192 53.3 288 46.7C384 40 480 40 576 43.3C672 46.7 768 53.3 864 56.7C960 60 1056 60 1152 56.7C1248 53.3 1344 46.7 1392 43.3L1440 40V80H0Z" style={{ fill: 'var(--bg-primary)' }} />
        </svg>
      </div>
    </section>
  );
}
