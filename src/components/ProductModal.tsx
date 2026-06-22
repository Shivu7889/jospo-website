"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import { company } from "@/data/company";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "features">("overview");
  const [showLightbox, setShowLightbox] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!product) return null;

  const whatsappMsg = `Hi JOSPO Team, I'm interested in the ${product.name}. Please share pricing and availability.`;
  const tabs = [
    { key: "overview" as const, label: "Overview" },
    { key: "specs" as const, label: "Specifications" },
    { key: "features" as const, label: "Features" },
  ];

  return (
    <AnimatePresence>
      {/* Full-screen Image Lightbox */}
      {showLightbox && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
          onClick={() => setShowLightbox(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Product name label */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <p className="text-white text-sm font-semibold text-center">{product.name}</p>
          </div>

          {/* Large Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="90vw"
              priority
            />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-[60] modal-backdrop flex items-center justify-center transition-all duration-300 ${
          isFullscreen ? "p-0" : "p-4 sm:p-6"
        }`}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`relative w-full transition-all duration-300 shadow-2xl overflow-y-auto md:overflow-hidden ${
            isFullscreen
              ? "w-screen h-screen max-w-none max-h-none rounded-none border-none"
              : "max-w-5xl h-[85vh] md:h-[75vh] max-h-[85vh] md:max-h-[700px] rounded-3xl"
          }`}
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fullscreen toggle button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-4 right-16 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 0h4v4M4 16v4h4m12 0h4v-4" />
              </svg>
            )}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:grid md:grid-cols-2 h-full gap-0">
            {/* Image — clickable for lightbox */}
            <div
              className="relative h-80 md:h-full min-h-[350px] md:min-h-0 cursor-zoom-in group/img flex items-center justify-center transition-all duration-300"
              style={{ background: 'var(--bg-secondary)' }}
              onClick={() => setShowLightbox(true)}
            >
              <div className={`relative w-full h-full transition-all duration-300 ${isFullscreen ? "p-12 md:p-20" : "p-8"}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover/img:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg">
                  {product.badge}
                </div>
              )}

              {/* Zoom hint overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/0 group-hover/img:bg-white/80 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 shadow-lg scale-75 group-hover/img:scale-100">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className={`p-6 sm:p-8 md:p-10 transition-all duration-300 md:overflow-y-auto md:h-full ${isFullscreen ? "lg:p-14" : ""}`}>
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2" style={{ color: 'var(--text-primary)' }}>
                {product.name}
              </h2>
              <p className="text-sm sm:text-base mb-6 font-medium" style={{ color: 'var(--text-muted)' }}>
                Cooling Area: {product.coolingArea}
              </p>

              {/* Tabs */}
              <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: 'var(--bg-secondary)' }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === tab.key ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md" : ""
                    }`}
                    style={activeTab !== tab.key ? { color: 'var(--text-muted)' } : {}}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[160px] md:min-h-[220px]">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      The {product.name} delivers powerful cooling performance with {product.airFlow} airflow capacity,
                      making it ideal for spaces up to {product.coolingArea}. Featuring a {product.fanSize} fan and
                      {product.tankCapacity} water tank for extended cooling.
                    </p>
                    <div className="flex items-center gap-2 text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                      <span>⚡ Power: {product.powerConsumption}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                      <span>📐 Dimensions: {product.dimensions}</span>
                    </div>
                  </div>
                )}
                {activeTab === "specs" && (
                  <div className="space-y-2">
                    {[
                      { label: "Fan Size", value: product.fanSize },
                      { label: "Air Flow", value: product.airFlow },
                      { label: "Tank Capacity", value: product.tankCapacity },
                      { label: "Power Consumption", value: product.powerConsumption },
                      { label: "Cooling Area", value: product.coolingArea },
                      { label: "Dimensions", value: product.dimensions },
                    ].map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <span className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>{spec.label}</span>
                        <span className="text-sm sm:text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "features" && (
                  <ul className="space-y-2.5">
                    {[
                      "Honeycomb cooling pads for superior cooling",
                      "Heavy-duty castor wheels for mobility",
                      "Auto-drain functionality",
                      "Anti-rust body construction",
                      "High-speed copper motor",
                      "Ice chamber for extra cooling"
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                        <span className="text-secondary mt-0.5">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* CTA */}
              <div className={`mt-8 space-y-3 ${isFullscreen ? "lg:mt-12" : ""}`}>
                <a href={company.whatsapp.getLink(whatsappMsg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Get Quote on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
