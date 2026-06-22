"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { products as staticProducts, categoryLabels, type ProductCategory, type Product } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import ProductCompare from "./ProductCompare";

const categories: ("all" | ProductCategory)[] = ["all", "personal", "medium", "large", "industrial"];

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<"all" | ProductCategory>("all");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [productsList, setProductsList] = useState<Product[]>(staticProducts);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((p: any) => ({
            id: p.slug || p._id,
            name: p.name,
            slug: p.slug,
            category: p.category,
            image: p.image,
            fanSize: p.fanSize,
            airFlow: p.airFlow,
            tankCapacity: p.tankCapacity,
            powerConsumption: p.powerConsumption,
            coolingArea: p.coolingArea,
            coolingAreaSqM: p.coolingAreaSqM,
            dimensions: p.dimensions,
            badge: p.badge || "",
            description: p.description || "",
            features: p.features || [],
          }));
          setProductsList(mapped);
        }
      })
      .catch((err) => console.error("Error loading products from database, using static fallback:", err));
  }, []);

  useEffect(() => {
    const checkHashAndOpenModal = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash && hash.startsWith("#product-")) {
          const productId = hash.replace("#product-", "");
          const product = productsList.find((p) => p.id === productId || p.slug === productId);
          if (product) {
            setModalProduct(product);
          }
        }
      }
    };

    checkHashAndOpenModal();

    window.addEventListener("hashchange", checkHashAndOpenModal);
    return () => window.removeEventListener("hashchange", checkHashAndOpenModal);
  }, [productsList]);

  const filteredProducts = activeCategory === "all" ? productsList : productsList.filter((p) => p.category === activeCategory);

  const handleCompareToggle = useCallback((product: Product) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 3) return prev;
      return [...prev, product];
    });
  }, []);

  return (
    <section id="products" className="pt-20 sm:pt-24 lg:pt-32 pb-10 sm:pb-12 relative" style={{ background: 'var(--bg-primary)' }} ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="section-label">Our Products</span>
          <h2 className="section-title mt-3">
            Product <span className="gradient-text">Catalog</span>
          </h2>
          <p className="section-subtitle mt-5">
            From compact personal coolers to heavy-duty industrial units — find the perfect cooling solution.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-wrap justify-center gap-2 mb-4">
          {categories.map((cat) => {
            const count = cat === "all" ? productsList.length : productsList.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                    : "hover:border-secondary/30"
                }`}
                style={activeCategory !== cat ? { background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : {}}
                id={`filter-${cat}`}
              >
                {cat === "all" ? "All Models" : categoryLabels[cat]}
                <span className={`ml-1.5 text-xs ${activeCategory === cat ? "text-white/70" : ""}`} style={activeCategory !== cat ? { color: 'var(--text-muted)' } : {}}>({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* Compare info */}
        <div className="text-center mb-8">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {compareList.length > 0 ? `${compareList.length}/3 selected for comparison` : "Click the compare icon on cards to compare products"}
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={setModalProduct}
              onCompareToggle={handleCompareToggle}
              isComparing={!!compareList.find((p) => p.id === product.id)}
            />
          ))}
        </div>
      </div>

      {/* Compare Section */}
      <ProductCompare products={compareList} onRemove={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))} onClear={() => setCompareList([])} />

      {/* Quick View Modal */}
      {modalProduct && <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />}
    </section>
  );
}
