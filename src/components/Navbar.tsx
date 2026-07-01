"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-amber-950/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3zM16 5v3H6V5h10zm2.5 3H18V5h.5c.83 0 1.5.67 1.5 1.5S19.33 8 18.5 8zM4 19h16v2H4z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-amber-50 tracking-tight">
              Brew<span className="text-amber-400">&amp;</span>Co.
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-amber-100/80 hover:text-amber-300 text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#menu"
              className="bg-amber-500 hover:bg-amber-400 text-amber-950 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg"
            >
              Order Now
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-amber-100 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-amber-950/98 backdrop-blur-sm border-t border-amber-800/30 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-amber-100/80 hover:text-amber-300 hover:bg-amber-900/30 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link
                href="#menu"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-amber-950 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Order Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
