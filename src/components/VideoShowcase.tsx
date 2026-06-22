"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const videos = [
  { id: "v1", title: "Factory Tour", category: "Factory", thumbnail: "/images/manufacturing/facility.png", duration: "4:32" },
  { id: "v2", title: "Quality Testing Process", category: "Factory", thumbnail: "/images/manufacturing/quality-control.png", duration: "3:15" },
  { id: "v3", title: "Packaging & Dispatch", category: "Factory", thumbnail: "/images/manufacturing/packaging.png", duration: "2:48" },
  { id: "v4", title: "Rolex 35L Product Demo", category: "Product Demo", thumbnail: "/images/products/rolex-35l.jpg", duration: "5:10" },
  { id: "v5", title: "Defender 135L Installation", category: "Installation", thumbnail: "/images/products/defender-135l.png", duration: "6:22" },
  { id: "v6", title: "Tent Plus 200L in Action", category: "Product Demo", thumbnail: "/images/products/tent-plus-200l.png", duration: "3:45" },
];

export default function VideoShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="section-label">Watch & Learn</span>
          <h2 className="section-title mt-3">Video <span className="gradient-text">Showcase</span></h2>
          <p className="section-subtitle mt-5">See our manufacturing process, product demos, and installations in action.</p>
        </motion.div>

        {/* Netflix-style scroll */}
        <div className="relative">
          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="flex-shrink-0 w-72 sm:w-80 snap-start group cursor-pointer"
                onClick={() => setActiveVideo(video.id)}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video" style={{ background: 'var(--bg-card)' }}>
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 border border-white/20">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-medium">{video.duration}</div>

                  {/* Category */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-secondary/20 backdrop-blur-sm text-secondary text-[10px] font-bold uppercase tracking-wider border border-secondary/20">
                    {video.category}
                  </div>
                </div>
                <h4 className="mt-3 text-sm font-semibold font-[family-name:var(--font-heading)] group-hover:text-secondary transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {video.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Placeholder modal */}
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[60] modal-backdrop flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-card)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActiveVideo(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="aspect-video flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
                <div className="text-center p-8">
                  <div className="text-5xl mb-4">🎬</div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2" style={{ color: 'var(--text-primary)' }}>
                    {videos.find((v) => v.id === activeVideo)?.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Video coming soon. Contact us for a live demo!</p>
                  <a href="https://wa.me/919602243363?text=Hi%20JOSPO%20Team%2C%20I%27d%20like%20a%20live%20product%20demo" target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4 !text-sm">
                    Request Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}