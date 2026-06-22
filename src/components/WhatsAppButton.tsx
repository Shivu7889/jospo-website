"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/data/company";

const quickActions = [
  { label: "Product Inquiry", icon: "📦", msg: "Hi JOSPO Team, I'd like to inquire about your air coolers." },
  { label: "Get a Quote", icon: "💰", msg: "Hi JOSPO Team, I'd like a price quote for air coolers." },
  { label: "Become a Dealer", icon: "🤝", msg: "Hi JOSPO Team, I'm interested in becoming a dealer." },
  { label: "Request Catalogue", icon: "📋", msg: "Hi JOSPO Team, please share your product catalogue." },
];

export default function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} transition={{ type: "spring", damping: 20, stiffness: 300 }} className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 max-w-[calc(100vw-2rem)]">
            <div className="rounded-2xl shadow-2xl shadow-black/20 overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              {/* Header */}
              <div className="bg-gradient-to-r from-whatsapp to-whatsapp-dark p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">JOSPO Sales</div>
                    <div className="text-white/70 text-xs">Typically replies instantly</div>
                  </div>
                </div>
                <button onClick={() => setShowPopup(false)} className="text-white/70 hover:text-white" aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Chat */}
              <div className="p-4" style={{ background: 'var(--bg-secondary)' }}>
                <div className="rounded-lg rounded-tl-none p-3 shadow-sm max-w-[85%]" style={{ background: 'var(--bg-card)' }}>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>👋 Hello! How can we help you today?</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 space-y-2" style={{ borderTop: '1px solid var(--border-color)' }}>
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>Quick Actions</p>
                {quickActions.map((action) => (
                  <a key={action.label} href={company.whatsapp.getLink(action.msg)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-whatsapp/5 transition-colors group" onClick={() => setShowPopup(false)}>
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-sm font-medium group-hover:text-whatsapp transition-colors" style={{ color: 'var(--text-secondary)' }}>{action.label}</span>
                    <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-whatsapp" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 200 }} onClick={() => setShowPopup(!showPopup)} className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center text-white shadow-xl hover:bg-whatsapp-dark transition-colors whatsapp-pulse" aria-label="Chat on WhatsApp" id="whatsapp-fab">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </motion.button>
    </>
  );
}
