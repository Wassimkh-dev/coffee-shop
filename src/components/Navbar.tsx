"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site-config";
import logo from "../../public/logo/the-lawn-logo.jpeg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-6">
      {/* CSS entrance (not JS-driven) so the nav is never stuck invisible
          if hydration is slow or fails on a weak connection */}
      <div
        className={`glass-panel glass-panel-strong animate-[fade-down-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both] relative z-50 flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-shadow duration-500 sm:px-4 ${
          scrolled ? "premium-shadow" : ""
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5 pl-1">
          <span className="relative h-10 w-10 overflow-hidden rounded-full bg-ivory ring-1 ring-beige sm:h-11 sm:w-11">
            <Image
              src={logo}
              alt="The Lawn Cafe logo"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-base tracking-wide text-charcoal">
              The Lawn Cafe
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-sage-dark">
              Bsatine
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-charcoal-soft transition-colors hover:bg-cream-dark/70 hover:text-olive-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-olive px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-olive-dark sm:flex"
          >
            Reserve
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream-dark/70 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[1.5px] w-5 bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 bg-charcoal/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel premium-shadow mx-4 mt-24 flex flex-col gap-1 rounded-3xl bg-ivory/95 p-4 sm:mx-6"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 font-serif text-lg text-charcoal transition-colors hover:bg-cream-dark/70"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-2xl bg-olive px-4 py-3 text-center font-medium text-ivory"
              >
                Reserve on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
