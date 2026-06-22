"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { company } from "@/data/company";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// Launch date: 45 days from now
const LAUNCH_DATE = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);

export default function ComingSoon() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);

  const countdownItems = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-28">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1B2A] to-[#023E8A]" />

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-secondary/20 animate-float" style={{
            width: `${6 + i * 4}px`, height: `${6 + i * 4}px`,
            left: `${10 + i * 11}%`, top: `${15 + (i * 9) % 70}%`,
            animationDelay: `${i * 0.7}s`, animationDuration: `${4 + i}s`,
          }} />
        ))}
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-6"
          >
            🚀 NEW PRODUCT LAUNCH
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 font-[family-name:var(--font-heading)] tracking-tight">
            Something Powerful is{" "}
            <span className="gradient-text-light">Coming</span>
          </h2>

          <p className="text-base sm:text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
            JOSPO is preparing its next generation of smart cooling solutions designed for maximum airflow, lower power consumption, and superior cooling performance.
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10">
            {countdownItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="glass-card-dark rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-white/10 animate-countdown-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                  <span className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-white/40 mt-2 uppercase tracking-wider">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a href={company.whatsapp.getLink("Hi JOSPO Team, I'd like to be notified about your new product launch!")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full sm:w-auto">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Notify Me on WhatsApp
            </a>
            <a href="#contact" className="btn-ghost w-full sm:w-auto">
              Contact Sales Team
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
