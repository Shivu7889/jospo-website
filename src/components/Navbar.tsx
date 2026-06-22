"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/data/company";
import { useTheme } from "./ThemeProvider";

interface NavLink {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "Cooling Finder", href: "/cooling-finder" },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Why Choose Us", href: "/why-choose" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Founding Team", href: "/#team" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Testimonials", href: "/#testimonials" },
    ],
  },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "shadow-lg" : ""
        }`}
        style={{
          background: isScrolled ? "var(--glass-bg)" : "transparent",
          backdropFilter: isScrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(24px)" : "none",
          borderBottom: isScrolled ? "1px solid var(--glass-border)" : "1px solid transparent",
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group" onClick={(e) => handleLinkClick(e, "/")}>
              <Image
                src="/images/logo.png"
                alt="JOSPO Cooling Solutions"
                width={160}
                height={44}
                className={`h-9 sm:h-10 w-auto transition-all duration-300 ${
                  isScrolled ? "" : "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                }`}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.label} className="relative group/dropdown py-2">
                      <button
                        className={`nav-link flex items-center gap-1 ${
                          isScrolled ? "" : "text-white/90 hover:text-white"
                        }`}
                        style={isScrolled ? { color: "var(--text-secondary)" } : {}}
                      >
                        {link.label}
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-200 group-hover/dropdown:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-52 opacity-0 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto transition-all duration-300 transform scale-95 group-hover/dropdown:scale-100 origin-top">
                        <div
                          className="rounded-2xl border shadow-xl p-2 backdrop-blur-xl"
                          style={{
                            background: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          {link.children.map((child) => {
                            const isChildActive =
                              child.href === "/" ? pathname === "/" : pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={(e) => handleLinkClick(e, child.href)}
                                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 ${
                                  isChildActive
                                    ? "text-secondary bg-secondary/5 font-semibold"
                                    : "text-gray-400"
                                }`}
                                style={!isChildActive ? { color: "var(--text-secondary)" } : {}}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                const isActive = link.href === "/" ? pathname === "/" : pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href!}
                    onClick={(e) => handleLinkClick(e, link.href!)}
                    className={`nav-link ${
                      isScrolled ? "" : "text-white/90 hover:text-white"
                    } ${isActive ? "!text-secondary font-semibold" : ""}`}
                    style={isScrolled && !isActive ? { color: "var(--text-secondary)" } : {}}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isScrolled ? "" : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={isScrolled ? { background: "var(--bg-secondary)", color: "var(--text-muted)" } : {}}
                aria-label="Toggle theme"
                id="theme-toggle"
              >
                {theme === "dark" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              <a
                href="/jospo-catalogue-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-link flex items-center gap-1.5 ${
                  isScrolled ? "" : "text-white/90 hover:text-white"
                }`}
                style={isScrolled ? { color: "var(--text-secondary)" } : {}}
              >
                📋 Catalogue
              </a>

              <a
                href={company.whatsapp.getLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-2.5 !px-5 !text-sm !rounded-xl"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get Quote
              </a>
            </div>

            {/* Mobile buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isScrolled ? "" : "text-white"
                }`}
                style={isScrolled ? { color: "var(--text-muted)" } : {}}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`p-2 rounded-lg ${isScrolled ? "" : "text-white"}`}
                style={isScrolled ? { color: "var(--text-primary)" } : {}}
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden modal-backdrop"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-50 lg:hidden shadow-2xl"
              style={{ background: "var(--bg-primary)" }}
            >
              <div className="flex flex-col h-full">
                <div
                  className="flex items-center justify-between p-4"
                  style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                  <div className="flex items-center">
                    <Image
                      src="/images/logo.png"
                      alt="JOSPO"
                      width={130}
                      height={36}
                      className="h-8 w-auto"
                    />
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 rounded-lg"
                    style={{ color: "var(--text-muted)" }}
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <nav className="flex-1 py-4 px-4 space-y-1 overflow-y-auto">
                  {navLinks.map((link, i) => {
                    if (link.children) {
                      return (
                        <div key={link.label} className="space-y-1 py-1">
                          <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {link.label}
                          </div>
                          {link.children.map((child) => {
                            const isChildActive =
                              child.href === "/" ? pathname === "/" : pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={(e) => {
                                  setIsMobileOpen(false);
                                  handleLinkClick(e, child.href);
                                }}
                                className={`block px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                                  isChildActive ? "text-secondary" : ""
                                }`}
                                style={!isChildActive ? { color: "var(--text-secondary)" } : {}}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      );
                    }

                    const isActive = link.href === "/" ? pathname === "/" : pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href!}
                          onClick={(e) => {
                            setIsMobileOpen(false);
                            handleLinkClick(e, link.href!);
                          }}
                          className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                            isActive ? "text-secondary" : ""
                          }`}
                          style={!isActive ? { color: "var(--text-secondary)" } : {}}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
                <div
                  className="p-4 space-y-3"
                  style={{ borderTop: "1px solid var(--border-color)" }}
                >
                  <a
                    href="/jospo-catalogue-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all border border-solid w-full"
                    style={{
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                      background: "var(--bg-secondary)"
                    }}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    📋 Download Catalogue
                  </a>
                  <a
                    href={company.whatsapp.getLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full !rounded-xl"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Get Quote on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
