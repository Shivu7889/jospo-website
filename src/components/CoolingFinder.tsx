"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { products, type Product } from "@/data/products";
import { company } from "@/data/company";
import Image from "next/image";

const steps = [
  { id: 1, label: "Space Type", question: "What type of space needs cooling?", options: [{ value: "home", label: "🏠 Home", desc: "Bedroom, Living Room" }, { value: "shop", label: "🏪 Shop", desc: "Retail, Showroom" }, { value: "office", label: "🏢 Office", desc: "Workspace, Cabin" }, { value: "factory", label: "🏭 Factory", desc: "Warehouse, Industrial" }] },
  { id: 2, label: "Area Size", question: "What is the area size?", options: [{ value: "small", label: "📏 Small", desc: "Up to 200 sq. ft" }, { value: "medium", label: "📐 Medium", desc: "200–500 sq. ft" }, { value: "large", label: "📦 Large", desc: "500–1000 sq. ft" }, { value: "xlarge", label: "🏗️ Extra Large", desc: "1000+ sq. ft" }] },
  { id: 3, label: "Environment", question: "Indoor or outdoor?", options: [{ value: "indoor", label: "🏠 Indoor", desc: "Enclosed spaces" }, { value: "outdoor", label: "🌤️ Outdoor", desc: "Open/Semi-open" }] },
  { id: 4, label: "Usage Hours", question: "Daily usage hours?", options: [{ value: "light", label: "⏰ 2–4 hrs", desc: "Light use" }, { value: "moderate", label: "🕐 5–8 hrs", desc: "Moderate use" }, { value: "heavy", label: "🕛 8+ hrs", desc: "Heavy/continuous" }] },
];

function getRecommendations(answers: Record<number, string>): { best: Product; alternatives: Product[]; reason: string } {
  const { 1: space, 2: area, 3: env, 4: usage } = answers;
  let best: Product; let reason: string;

  if (space === "factory" || area === "xlarge" || env === "outdoor") {
    best = products.find(p => p.id === "tent-plus-200l") || products[products.length - 1];
    reason = "Its massive 200L tank and 16,000 m³/h airflow are designed for large industrial and outdoor spaces.";
  } else if (area === "large" || (space === "office" && usage === "heavy")) {
    best = products.find(p => p.id === "defender-135l") || products[6];
    reason = "With 135L capacity and 6,800 m³/h airflow, it handles large commercial spaces efficiently.";
  } else if (area === "medium" || space === "shop") {
    best = products.find(p => p.id === "signature-100l") || products[5];
    reason = "Its 100L tank and 4,800 m³/h airflow provide the ideal balance of power and efficiency.";
  } else if (usage === "light" && area === "small") {
    best = products.find(p => p.id === "rolex-35l") || products[0];
    reason = "Compact, energy-efficient, and perfect for personal spaces with its 35L tank.";
  } else {
    best = products.find(p => p.id === "rolex-65l") || products[1];
    reason = "A versatile 65L cooler that balances capacity and efficiency for everyday rooms.";
  }

  const alternatives = products.filter(p => p.id !== best.id && p.category === best.category).slice(0, 2);
  return { best, alternatives, reason };
}

export default function CoolingFinder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (stepId: number, value: string) => {
    const newAnswers = { ...answers, [stepId]: value };
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const reset = () => { setCurrentStep(0); setAnswers({}); setShowResult(false); };
  const result = showResult ? getRecommendations(answers) : null;

  return (
    <section id="cooling-finder" ref={ref} className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="section-label">Smart Recommendation</span>
          <h2 className="section-title mt-3">Cooling <span className="gradient-text">Finder</span></h2>
          <p className="section-subtitle mt-5">Answer 4 quick questions and we&apos;ll recommend the perfect cooler for your space.</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="premium-card p-6 sm:p-8">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {steps.map((_, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                    <div className={`h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ${i <= currentStep ? "w-full" : "w-0"}`} />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold" style={{ color: 'var(--color-secondary)' }}>Step {currentStep + 1} of {steps.length}</span>
                {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep - 1)} className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>← Back</button>}
              </div>

              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-6" style={{ color: 'var(--text-primary)' }}>{steps[currentStep].question}</h3>

              <div className="grid grid-cols-2 gap-3">
                {steps[currentStep].options.map((opt) => (
                  <button key={opt.value} onClick={() => handleAnswer(steps[currentStep].id, opt.value)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 group ${answers[steps[currentStep].id] === opt.value ? "ring-2 ring-secondary shadow-lg" : "hover:border-secondary/30"}`}
                    style={{ background: answers[steps[currentStep].id] === opt.value ? 'var(--color-secondary)' + '10' : 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                    <div className="text-lg mb-1">{opt.label}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              {/* Best Match */}
              <div className="premium-card p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-2 rounded-bl-xl bg-gradient-to-r from-secondary to-accent text-white text-xs font-bold">⭐ Best Match</div>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden relative flex-shrink-0" style={{ background: 'var(--bg-secondary)' }}>
                    <Image src={result.best.image} alt={result.best.name} fill className="object-contain p-3" sizes="128px" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2" style={{ color: 'var(--text-primary)' }}>{result.best.name}</h3>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>❄️ {result.best.coolingArea}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>💨 {result.best.airFlow}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>🔋 {result.best.tankCapacity}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>💡 <strong>Why this?</strong> {result.reason}</p>
                    <a href={company.whatsapp.getLink(`Hi, I used the Cooling Finder and I'm interested in the ${result.best.name}`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !text-sm">
                      Inquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Alternatives */}
              {result.alternatives.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>Also Consider:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.alternatives.map((alt) => (
                      <div key={alt.id} className="premium-card p-4 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0" style={{ background: 'var(--bg-secondary)' }}>
                          <Image src={alt.image} alt={alt.name} fill className="object-contain p-2" sizes="64px" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-sm font-bold font-[family-name:var(--font-heading)]" style={{ color: 'var(--text-primary)' }}>{alt.name}</h5>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{alt.coolingArea} • {alt.airFlow}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={reset} className="btn-secondary w-full !rounded-xl">Start Over</button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
