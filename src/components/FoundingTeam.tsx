"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Mahesh Gupta",
    role: "Founder",
    image: "/images/team/mahesh-gupta.png",
    bio: "Visionary entrepreneur who founded JOSPO Cooling Solutions with a mission to deliver premium, energy-efficient air cooling solutions across India. With decades of experience in manufacturing, Mr. Gupta has built JOSPO into a trusted name in the cooling industry.",
    quote: "Our commitment is to deliver cooling solutions that combine innovation with reliability.",
  },
  {
    name: "Vijay Gupta",
    role: "Managing Director",
    image: "/images/team/vijay-gupta.png",
    bio: "A dynamic leader driving JOSPO's growth and market expansion. Under his leadership, JOSPO has expanded its dealer network across 25+ states and introduced cutting-edge product lines that set new standards in the air cooler industry.",
    quote: "Innovation and customer satisfaction are at the heart of everything we do at JOSPO.",
  },
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="premium-card rounded-3xl overflow-hidden group"
            >
              {/* Photo */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold mb-2 shadow-lg">
                    {member.role}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] tracking-tight">
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                  {member.bio}
                </p>

                {/* Quote */}
                <div className="relative pl-4" style={{ borderLeft: '3px solid var(--color-secondary)' }}>
                  <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    &ldquo;{member.quote}&rdquo;
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
