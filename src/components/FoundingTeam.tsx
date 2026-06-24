"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Mahesh Gupta",
    role: "Founder",
    image: "/images/team/mahesh-gupta.jpg",
    bio: "A visionary entrepreneur who laid the foundation of JOSPO with a commitment to innovation, quality, and customer trust. Through years of dedication and industry expertise, he has transformed JOSPO into a respected and fast-growing name in India's cooling solutions industry.",
    quote: "Innovation creates products, but trust builds brands.",
  },
  {
    name: "Vijay Gupta",
    role: "Managing Director",
    image: "/images/team/vijay-gupta.png",
    bio: "Committed to innovation, excellence, and customer satisfaction, driving JOSPO's growth as a trusted name in cooling solutions.",
    quote: "Innovation and customer satisfaction are at the heart of everything we do at JOSPO.",
  },
];

function highlightJospo(text: string) {
  const parts = text.split(/(JOSPO(?:'s)?)/g);
  return parts.map((part, i) =>
    /^JOSPO/.test(part) ? (
      <strong key={i} className="font-bold" style={{ color: 'var(--color-primary)' }}>{part}</strong>
    ) : (
      part
    )
  );
}

export default function FoundingTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" ref={ref} className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[200px] opacity-30" style={{ background: 'linear-gradient(135deg, rgba(2,62,138,0.15), rgba(0,180,216,0.1))' }} />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Leadership</span>
          <h2 className="section-title mt-3">
            Founding <span className="gradient-text">Team</span>
          </h2>
          <p className="section-subtitle mt-5">
            Meet the visionaries behind JOSPO Cooling Solutions — driving innovation, quality, and growth in India&apos;s cooling industry.
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="premium-card rounded-3xl overflow-hidden group"
            >
              {/* Circular Photo */}
              <div className="flex flex-col items-center pt-8 pb-4">
                <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden ring-4 ring-secondary/30 group-hover:ring-secondary/60 transition-all duration-500 shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 128px, 208px"
                  />
                </div>
                <div className="mt-5 text-center">
                  <div className="inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold mb-2 shadow-lg">
                    {member.role}
                  </div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                  {highlightJospo(member.bio)}
                </p>

                {/* Quote */}
                <div className="relative pl-4" style={{ borderLeft: '3px solid var(--color-secondary)' }}>
                  <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    &ldquo;{highlightJospo(member.quote)}&rdquo;
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
