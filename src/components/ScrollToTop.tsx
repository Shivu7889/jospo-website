"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  // Scroll to top on page navigation
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      const handleScroll = () => {
        const html = document.documentElement;
        const originalStyle = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        setTimeout(() => {
          html.style.scrollBehavior = originalStyle;
        }, 50);
      };

      // Run instantly
      handleScroll();

      // Also run after a short delay to override any Next.js router scroll restoration
      const timer = setTimeout(handleScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-4 sm:left-6 z-50 w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
          aria-label="Scroll to top"
          id="scroll-to-top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
