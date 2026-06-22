"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { company } from "@/data/company";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `New Inquiry from Website:%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${company.whatsapp.number}?text=${msg}`;
    // Use a hidden anchor to open in new tab instead of window.open()
    // This avoids potential overlay/black screen issues
    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSubmitted(true);
    setFormData({ name: "", phone: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactCards = [
    { icon: "📍", title: "Visit Us", lines: [company.address.line1, company.address.line2, company.address.line3], action: null },
    { icon: "📞", title: "Call Us", lines: [company.phones.primary, company.phones.secondary], action: `tel:${company.phones.primary}` },
    { icon: "✉️", title: "Email Us", lines: [company.email], action: `mailto:${company.email}` },
    { icon: "📸", title: "Follow Us", lines: ["@jospo.pvt"], action: company.instagram },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }} ref={ref}>
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title mt-3">Contact <span className="gradient-text">Us</span></h2>
          <p className="section-subtitle mt-4">Ready to cool your space? Reach out and we&apos;ll help you find the perfect solution.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Cards + Map */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {contactCards.map((card) => {
                const Tag = card.action ? "a" : "div";
                const props = card.action ? { href: card.action, target: card.action.startsWith("http") ? "_blank" as const : undefined, rel: card.action.startsWith("http") ? "noopener noreferrer" : undefined } : {};
                return (
                  <Tag key={card.title} {...props} className="premium-card p-5 group block">
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <h4 className="text-sm font-bold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>{card.title}</h4>
                    {card.lines.map((line, i) => <p key={i} className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{line}</p>)}
                  </Tag>
                );
              })}
            </div>
            <div className="premium-card rounded-2xl overflow-hidden h-52">
              <iframe src={company.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="JOSPO Location" />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }}>
            <div className="premium-card rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-1" style={{ color: 'var(--text-primary)' }}>Send us a Message</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>We&apos;ll connect with you on WhatsApp.</p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Message Sent!</h4>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Our team will reach out shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Full Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} placeholder="Your name" id="contact-name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Phone *</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setFormData({ ...formData, phone: value });
                      }} pattern="[0-9]{10}" minLength={10} maxLength={10} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} placeholder="10-digit phone number" id="contact-phone" title="Please enter a valid 10-digit phone number" />
                    </div>
                    <div>
                      <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} placeholder="your@email.com" id="contact-email" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Message *</label>
                    <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 resize-none transition-all" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} placeholder="I'm interested in..." id="contact-message" />
                  </div>
                  <button type="submit" className="btn-primary w-full !rounded-xl !py-3.5" id="contact-submit">Send via WhatsApp →</button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
