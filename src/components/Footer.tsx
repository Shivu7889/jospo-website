"use client";

import { company } from "@/data/company";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "About", href: "/about" },
  { label: "Why Choose", href: "/why-choose" },
  { label: "Cooling Finder", href: "/cooling-finder" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Founding Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

const topProducts = products.slice(0, 6);

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (typeof window === "undefined") return;

    const currentPathname = window.location.pathname;
    const [targetPathname, targetHash] = href.split("#");

    const normalizedTargetPathname = targetPathname || "/";
    const normalizedCurrentPathname = currentPathname || "/";

    if (normalizedCurrentPathname === normalizedTargetPathname) {
      if (targetHash) {
        const element = document.getElementById(targetHash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
          window.dispatchEvent(new Event("hashchange"));
        }
      } else {
        e.preventDefault();
        const html = document.documentElement;
        const originalStyle = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        setTimeout(() => {
          html.style.scrollBehavior = originalStyle;
        }, 50);
        window.history.pushState(null, "", href);
        window.dispatchEvent(new Event("hashchange"));
      }
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-card)' }}>
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="section-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="mb-4">
              <Image src="/images/logo.png" alt="JOSPO Cooling Solutions" width={160} height={44} className="h-10 w-auto" />
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
              India&apos;s trusted manufacturer of high-performance air coolers for residential, commercial, and industrial applications.
            </p>
            <div className="flex items-center gap-3">
              <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }} aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href={company.whatsapp.getLink()} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-whatsapp hover:text-white" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }} aria-label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href={`mailto:${company.email}`} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-white" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }} aria-label="Email">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-5 font-[family-name:var(--font-heading)] uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}><Link href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-sm hover:text-secondary transition-colors flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <svg className="w-3 h-3 text-secondary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>{link.label}
                </Link></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-bold mb-5 font-[family-name:var(--font-heading)] uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Products</h4>
            <ul className="space-y-2.5">
              {topProducts.map((p) => (
                <li key={p.id}><Link href={`/#product-${p.id}`} onClick={(e) => handleLinkClick(e, `/#product-${p.id}`)} className="text-sm hover:text-secondary transition-colors flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <svg className="w-3 h-3 text-secondary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>{p.name}
                </Link></li>
              ))}
              <li><Link href="/#products" onClick={(e) => handleLinkClick(e, "/#products")} className="text-sm text-secondary hover:text-secondary-light font-medium">View All →</Link></li>
              <li><a href="/jospo-catalogue-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-secondary-light font-medium flex items-center gap-1">📋 Download Catalogue</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold mb-5 font-[family-name:var(--font-heading)] uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Contact</h4>
            <div className="space-y-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>📍 {company.address.full}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>📞 <a href={`tel:${company.phones.primary}`} className="hover:text-secondary transition-colors">{company.phones.primary}</a></p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>✉️ <a href={`mailto:${company.email}`} className="hover:text-secondary transition-colors">{company.email}</a></p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="section-container py-5 flex flex-col items-center gap-4">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-center sm:text-left" style={{ color: 'var(--text-muted)' }}>© 2026 JOSPO Cooling Solutions Pvt. Ltd. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs hover:text-secondary transition-colors" style={{ color: 'var(--text-muted)' }}>Privacy</a>
              <a href="#" className="text-xs hover:text-secondary transition-colors" style={{ color: 'var(--text-muted)' }}>Terms</a>
            </div>
          </div>

          {/* Creator Credit */}
          <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-center" style={{ borderTop: '1px solid var(--border-color)' }}>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Designed & Developed by{' '}
              <span className="font-semibold gradient-text">Shivam Patidar</span>
            </p>
            <span className="hidden sm:inline text-xs" style={{ color: 'var(--text-muted)' }}>•</span>
            <div className="flex items-center gap-3">
              <a href="tel:8718807889" className="text-xs hover:text-secondary transition-colors flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                📞 8718807889
              </a>
              <a href="tel:6265901734" className="text-xs hover:text-secondary transition-colors flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                📞 6265901734
              </a>
              <a href="https://neuvonsoftware.com/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-secondary transition-colors flex items-center gap-1 font-medium" style={{ color: 'var(--text-muted)' }}>
                🌐 neuvonsoftware.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
