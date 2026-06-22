"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { company } from "@/data/company";

interface CTABannerProps {
  variant?: "quote" | "dealer" | "catalogue" | "expert";
}

const variants = {
  quote: {
    title: "Ready to Cool Your Space?",
    subtitle: "Get instant pricing and expert recommendations on WhatsApp",
    cta: "Get a Free Quote",
    ctaLink: company.whatsapp.getLink("Hi JOSPO Team, I'd like to get a quote for air coolers."),
    secondaryCta: "Call Us",
    secondaryLink: `tel:${company.phones.primary}`,
    gradient: "from-primary via-navy to-primary-dark",
  },
  dealer: {
    title: "Become a JOSPO Dealer",
    subtitle: "Join our growing network — attractive margins, marketing support, and premium products",
    cta: "Apply on WhatsApp",
    ctaLink: company.whatsapp.getLink("Hi JOSPO Team, I'm interested in becoming a dealer/distributor."),
    secondaryCta: "Learn More",
    secondaryLink: "#contact",
    gradient: "from-secondary-dark via-secondary to-accent",
  },
  catalogue: {
    title: "Download Our Product Catalogue",
    subtitle: "Complete specifications, pricing, and ordering information",
    cta: "Download Catalogue",
    ctaLink: "/jospo-catalogue-2026.pdf",
    secondaryCta: "View Products",
    secondaryLink: "#products",
    gradient: "from-[#0B1120] via-dark to-navy",
  },
  expert: {
    title: "Talk to a Cooling Expert",
    subtitle: "Our engineers will help you choose the perfect solution",
    cta: "Chat with Expert",
    ctaLink: company.whatsapp.getLink("Hi JOSPO Team, I'd like to speak with a cooling expert."),
    secondaryCta: "Call Now",
    secondaryLink: `tel:${company.phones.primary}`,
    gradient: "from-primary-dark via-primary to-secondary",
  },
};

export default function CTABanner({ variant = "quote" }: CTABannerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const config = variants[variant];

  return (
    <section ref={ref} className="py-4">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${config.gradient} p-8 sm:p-12`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-heading)] tracking-tight">{config.title}</h3>
              <p className="text-sm sm:text-base text-white/60 mt-2 max-w-lg">{config.subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <a href={config.ctaLink} target={config.ctaLink.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="btn-whatsapp !rounded-xl whitespace-nowrap">
                {config.cta}
              </a>
              <a href={config.secondaryLink} className="btn-ghost !rounded-xl whitespace-nowrap !text-sm">{config.secondaryCta}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
