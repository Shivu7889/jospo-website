"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/data/products";
import { company } from "@/data/company";

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
  onCompareToggle?: (product: Product) => void;
  isComparing?: boolean;
}

export default function ProductCard({ product, index, onQuickView, onCompareToggle, isComparing }: ProductCardProps) {
  const whatsappMsg = `Hi JOSPO Team, I'm interested in the ${product.name}. Please share pricing and availability.`;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    onQuickView(product);
  };

  const airflowMax = 16000;
  const airflowPercent = (parseInt(product.airFlow.replace(/[^0-9]/g, "")) / airflowMax) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group"
      id={`product-${product.id}`}
    >
      <div
        className="premium-card overflow-hidden relative cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg tracking-wide">
            {product.badge}
          </div>
        )}

        {/* Compare checkbox */}
        {onCompareToggle && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompareToggle(product);
            }}
            onMouseMove={(e) => e.stopPropagation()}
            className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
              isComparing
                ? "bg-red-500 text-white shadow-lg hover:bg-red-600 scale-110"
                : "bg-white/80 dark:bg-white/10 text-muted hover:bg-secondary/20 hover:text-secondary"
            }`}
            title={isComparing ? "Remove from compare" : "Add to compare"}
          >
            {isComparing ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )}
          </button>
        )}

        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <Image src={product.image} alt={product.name} fill className="object-contain p-6 group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />

          {/* Quick View overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }} 
              onMouseMove={(e) => e.stopPropagation()}
              className="px-5 py-2 rounded-xl bg-white/90 text-dark text-sm font-semibold hover:bg-white transition-colors shadow-lg"
            >
              Quick View
            </button>
          </div>

          {/* Cooling area chip */}
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm" style={{ background: 'var(--bg-card)', color: 'var(--color-primary)', border: '1px solid var(--border-color)' }}>
            ❄️ {product.coolingArea}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3" style={{ color: 'var(--text-primary)' }}>
            {product.name}
          </h3>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <SpecItem label="Fan Size" value={product.fanSize} />
            <SpecItem label="Air Flow" value={product.airFlow} />
            <SpecItem label="Tank" value={product.tankCapacity} />
            <SpecItem label="Power" value={product.powerConsumption} />
          </div>

          {/* Airflow bar */}
          <div className="mb-3 px-1">
            <div className="flex items-center justify-between text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>
              <span>Airflow</span>
              <span>{product.airFlow}</span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                whileInView={{ width: `${airflowPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="text-xs mb-4 px-3 py-2 rounded-lg text-center" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
            📐 {product.dimensions}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={company.whatsapp.getLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
            className="btn-whatsapp w-full !py-2.5 !text-sm !rounded-xl"
            id={`inquiry-${product.id}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col px-3 py-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
      <span className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}
